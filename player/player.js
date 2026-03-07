const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2", {
  antialias: false,
  premultipliedAlpha: false,
});

// UI elements
const shaderSelect = document.getElementById("shaderSelect");
const imageSelect = document.getElementById("imageSelect");
const fileInput = document.getElementById("fileInput");
const tintEl = document.getElementById("tint");
const strengthEl = document.getElementById("strength");
const strengthVal = document.getElementById("strengthVal");
const errorsEl = document.getElementById("errors");

// UI control groups (for show/hide)
const tintGroup = document.getElementById("tintGroup");
const strengthGroup = document.getElementById("strengthGroup");
const imageSelectGroup = document.getElementById("imageSelectGroup");
const fileInputGroup = document.getElementById("fileInputGroup");

// Control label/hint elements
const strengthLabel = document.getElementById("strengthLabel");
const strengthHint = document.getElementById("strengthHint");
const tintHint = document.getElementById("tintHint");

// Shader metadata storage
let shaderMetadata = new Map(); // Maps filename -> {name, description, phase, controls, controlDescriptions}
let currentShaderFile = null;

// Image dimensions (for canvas sizing)
let imageWidth = 0;
let imageHeight = 0;

// ---- Paths (edit if your folders differ) ----
const SHADER_DIR = "../shaders/";                 // fragment shaders + manifest
const VERT_SHADER_PATH = "./shader.vert";         // single vertex shader (part of player)
const MANIFEST_URL = SHADER_DIR + "manifest.json";
const DEFAULT_IMAGE_URL = "/assets/cassowary.jpg"; // default image

// Fullscreen quad (2 triangles) in clip space
const quad = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
  -1,  1,
   1, -1,
   1,  1,
]);

function setError(msg) {
  errorsEl.textContent = msg ? String(msg) : "";
  if (msg) console.error(msg);
}

function resizeCanvasToImageSize() {
  // If we have image dimensions, use them; otherwise fall back to client size
  if (imageWidth > 0 && imageHeight > 0) {
    if (canvas.width !== imageWidth || canvas.height !== imageHeight) {
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      gl.viewport(0, 0, imageWidth, imageHeight);
    }
  } else {
    // Fallback to display size if no image loaded yet
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
}

function compileShader(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);

  // WebGL2 uses COMPILE_STATUS for shader compilation success.
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log || "Shader compile failed");
  }
  return s;
}

function createProgram(vertSrc, fragSrc) {
  const vs = compileShader(gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl.FRAGMENT_SHADER, fragSrc);
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    throw new Error(log || "Program link failed");
  }
  return p;
}

function hexToRgb01(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return [1, 1, 1];
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return [r, g, b];
}

function loadImage(urlOrBlobUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image: " + urlOrBlobUrl));
    img.src = urlOrBlobUrl;
  });
}

function createTextureFromImage(img) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    img
  );

  gl.bindTexture(gl.TEXTURE_2D, null);

  // Store image dimensions and resize canvas to fit
  imageWidth = img.width;
  imageHeight = img.height;
  resizeCanvasToImageSize();

  return tex;
}

async function fetchText(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return await res.text();
}

// Preprocess #include directives (WebGL does not support includes natively).
// Supports lines of the form: #include "common.glslinc"
async function resolveIncludes(src, baseDir, depth = 0) {
  if (depth > 8) throw new Error("Include depth exceeded");
  const includeRe = /^[ \t]*#include\s+"([^"]+)"[ \t]*$/gm;

  let out = src;

  while (true) {
    includeRe.lastIndex = 0;
    const match = includeRe.exec(out);
    if (!match) break;

    const incName = match[1];
    const incPath = baseDir + incName;
    const incText = await fetchText(incPath);

    // Resolve nested includes inside the include file.
    const resolved = await resolveIncludes(incText, baseDir, depth + 1);

    // Replace exactly this include line.
    out = out.slice(0, match.index) + resolved + out.slice(match.index + match[0].length);
  }

  return out;
}

async function fetchManifest() {
  const txt = await fetchText(MANIFEST_URL);
  return JSON.parse(txt);
}

// ---- GL resources ----
let program = null;
let vao = null;
let tex = null;
let vertSource = null;

// uniform locations
let uTextureLoc = null;
let uTintLoc = null;
let uStrengthLoc = null;
let uResolutionLoc = null;
let uTimeLoc = null;

function setupQuad() {
  vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(program, "aPos");
  if (aPos === -1) {
    throw new Error("Vertex shader must declare 'in vec2 aPos;'");
  }
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function cacheUniforms() {
  uTextureLoc = gl.getUniformLocation(program, "uTexture");
  uTintLoc = gl.getUniformLocation(program, "uTint");
  uStrengthLoc = gl.getUniformLocation(program, "uStrength");
  uResolutionLoc = gl.getUniformLocation(program, "uResolution");
  uTimeLoc = gl.getUniformLocation(program, "uTime"); // for future shaders
}

function updateControlsVisibility(shaderFile) {
  const metadata = shaderMetadata.get(shaderFile);
  if (!metadata) {
    // If no metadata, show all controls (backward compatibility)
    if (tintGroup) tintGroup.style.display = "";
    if (strengthGroup) strengthGroup.style.display = "";
    if (imageSelectGroup) imageSelectGroup.style.display = "";
    if (fileInputGroup) fileInputGroup.style.display = "";
    // Reset labels/hints to defaults
    if (strengthLabel) strengthLabel.textContent = "Strength";
    if (strengthHint) strengthHint.textContent = "";
    if (tintHint) tintHint.textContent = "";
    return;
  }

  const controls = metadata.controls || [];
  const controlDescriptions = metadata.controlDescriptions || {};

  // Parse controls: can be array (old format) or object (new format)
  let controlList = [];
  let controlDescs = {};

  if (Array.isArray(controls)) {
    // Old format: ["tint", "strength", "image"]
    controlList = controls;
    controlDescs = {};
  } else if (typeof controls === "object") {
    // New format: {"strength": "description", "tint": null, "image": null}
    controlList = Object.keys(controls);
    controlDescs = controls;
  }

  // Update visibility based on controls list
  if (tintGroup) {
    tintGroup.style.display = controlList.includes("tint") ? "" : "none";
    if (tintHint) {
      tintHint.textContent = controlDescs.tint || "";
    }
  }
  if (strengthGroup) {
    strengthGroup.style.display = controlList.includes("strength") ? "" : "none";
    // Update strength label and hint
    if (strengthLabel) {
      strengthLabel.textContent = "Strength";
    }
    if (strengthHint) {
      strengthHint.textContent = controlDescs.strength || "";
    }
  }
  if (imageSelectGroup) {
    imageSelectGroup.style.display = controlList.includes("image") ? "" : "none";
  }
  if (fileInputGroup) {
    fileInputGroup.style.display = controlList.includes("image") ? "" : "none";
  }
}

async function loadVertexShader() {
  const src = await fetchText(VERT_SHADER_PATH);
  if (!src.trim().startsWith("#version 300 es")) {
    throw new Error("Vertex shader must start with '#version 300 es'");
  }
  vertSource = src;
}

async function loadShaderAndBuild(shaderFile) {
  setError("");
  if (!vertSource) {
    throw new Error("Vertex shader source not loaded");
  }

  let fragSrc = await fetchText(SHADER_DIR + shaderFile);
  fragSrc = await resolveIncludes(fragSrc, SHADER_DIR);

  if (!fragSrc.trim().startsWith("#version 300 es")) {
    throw new Error("Fragment shader must start with '#version 300 es'");
  }

  program = createProgram(vertSource, fragSrc);
  cacheUniforms();
  setupQuad();

  // Update UI controls based on shader requirements
  currentShaderFile = shaderFile;
  updateControlsVisibility(shaderFile);
}

function renderFrame(tSec) {
  resizeCanvasToImageSize();

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (!program || !vao) {
    requestAnimationFrame((ms) => renderFrame(ms / 1000));
    return;
  }

  gl.useProgram(program);
  gl.bindVertexArray(vao);

  // texture unit 0
  if (uTextureLoc) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(uTextureLoc, 0);
  }

  if (uResolutionLoc) {
    gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
  }

  if (uTimeLoc) {
    gl.uniform1f(uTimeLoc, tSec);
  }

  // Solid Tint uniforms (harmless if the shader doesn't declare them)
  const [r, g, b] = hexToRgb01(tintEl.value);
  const strength = parseFloat(strengthEl.value);
  strengthVal.textContent = strength.toFixed(2);

  if (uTintLoc) {
    gl.uniform3f(uTintLoc, r, g, b);
  }
  if (uStrengthLoc) {
    gl.uniform1f(uStrengthLoc, strength);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  gl.bindVertexArray(null);
  gl.useProgram(null);

  requestAnimationFrame((ms) => renderFrame(ms / 1000));
}

async function main() {
  if (!gl) throw new Error("WebGL2 not available");

  // Load default image
  const img = await loadImage(DEFAULT_IMAGE_URL);
  tex = createTextureFromImage(img);

  // Load vertex shader (single file, part of player infrastructure)
  await loadVertexShader();

  // Load fragment manifest + populate dropdown
  const manifest = await fetchManifest();
  const frags = manifest.fragments || [];
  if (!frags.length) {
    throw new Error("Manifest has no 'fragments'");
  }

  // Parse manifest: support both old format (array of strings) and new format (array of objects)
  shaderSelect.innerHTML = "";
  for (const f of frags) {
    let filename, displayName, metadata;

    if (typeof f === "string") {
      // Old format: just filename
      filename = f;
      displayName = f;
      metadata = { file: f, name: f, controls: [] };
    } else {
      // New format: object with file, name, description, phase, controls
      filename = f.file;
      displayName = f.name || f.file;
      metadata = f;
    }

    // Store metadata for this shader
    shaderMetadata.set(filename, metadata);

    // Create dropdown option
    const opt = document.createElement("option");
    opt.value = filename;
    opt.textContent = displayName;
    shaderSelect.appendChild(opt);
  }

  // Load latest (last) shader by default
  shaderSelect.selectedIndex = shaderSelect.options.length - 1;
  await loadShaderAndBuild(shaderSelect.value);

  shaderSelect.addEventListener("change", async () => {
    try {
      await loadShaderAndBuild(shaderSelect.value);
    } catch (e) {
      setError(e);
    }
  });

  // Select preset image
  imageSelect.addEventListener("change", async () => {
    try {
      const url = imageSelect.value;
      const img = await loadImage(url);
      if (tex) gl.deleteTexture(tex);
      tex = createTextureFromImage(img);
    } catch (e) {
      setError(e);
    }
  });

  // Upload custom image
  fileInput.addEventListener("change", async () => {
    try {
      const file = fileInput.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const img = await loadImage(url);
      if (tex) gl.deleteTexture(tex);
      tex = createTextureFromImage(img);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e);
    }
  });

  window.addEventListener("resize", () => resizeCanvasToImageSize());

  requestAnimationFrame((ms) => renderFrame(ms / 1000));
}

main().catch((e) => {
  setError("Player failed to start:\n" + (e?.stack || e));
});

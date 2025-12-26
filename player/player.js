const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });

const shaderSelect = document.getElementById("shaderSelect");
const fileInput = document.getElementById("fileInput");
const tintEl = document.getElementById("tint");
const strengthEl = document.getElementById("strength");
const strengthVal = document.getElementById("strengthVal");
const errorsEl = document.getElementById("errors");

// ---- Paths (edit if your folders differ) ----
const SHADER_DIR = "../shaders/";            // where manifest + .frag files live
const MANIFEST_URL = SHADER_DIR + "manifest.json";
const DEFAULT_IMAGE_URL = "./test.png";      // inside /player/

// ---- Minimal vertex shader (outputs vTexCoord to match fragment expectation) ----
const VERT_SRC = `#version 300 es
in vec2 aPos;
out vec2 vTexCoord;
void main() {
  vTexCoord = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// Fullscreen quad (2 triangles)
const quad = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
  -1,  1,
   1, -1,
   1,  1
]);

function setError(msg) {
  errorsEl.textContent = msg ? String(msg) : "";
  if (msg) console.error(msg);
}

function resizeCanvasToDisplaySize() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const w = Math.floor(canvas.clientWidth * dpr);
  const h = Math.floor(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }
}

function compileShader(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
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

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

async function fetchText(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function fetchManifest() {
  const txt = await fetchText(MANIFEST_URL);
  return JSON.parse(txt);
}

// ---- GL resources ----
let program = null;
let vao = null;
let tex = null;

// uniform locations (optional if shader doesn’t declare them)
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
  uTimeLoc = gl.getUniformLocation(program, "uTime"); // for future
}

async function loadShaderAndBuild(shaderFile) {
  setError("");
  const fragSrc = await fetchText(SHADER_DIR + shaderFile);

  // Safety: ensure WebGL2 + GLSL300 fragment includes a version line
  if (!fragSrc.trim().startsWith("#version 300 es")) {
    throw new Error("Fragment shader must start with '#version 300 es'");
  }

  program = createProgram(VERT_SRC, fragSrc);
  cacheUniforms();
  setupQuad();
}

function renderFrame(tSec) {
  resizeCanvasToDisplaySize();

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.bindVertexArray(vao);

  // texture unit 0
  if (uTextureLoc) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(uTextureLoc, 0);
  }

  if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
  if (uTimeLoc) gl.uniform1f(uTimeLoc, tSec);

  // Solid Tint uniforms
  const [r, g, b] = hexToRgb01(tintEl.value);
  const strength = parseFloat(strengthEl.value);
  strengthVal.textContent = strength.toFixed(2);

  if (uTintLoc) gl.uniform3f(uTintLoc, r, g, b);
  if (uStrengthLoc) gl.uniform1f(uStrengthLoc, strength);

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

  // Load manifest + populate dropdown
  const manifest = await fetchManifest();
  const frags = manifest.fragments || [];
  if (!frags.length) throw new Error("Manifest has no 'fragments'");

  shaderSelect.innerHTML = "";
  for (const f of frags) {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    shaderSelect.appendChild(opt);
  }

  // Load first shader by default
  await loadShaderAndBuild(shaderSelect.value);

  shaderSelect.addEventListener("change", async () => {
    try {
      await loadShaderAndBuild(shaderSelect.value);
    } catch (e) {
      setError(e);
    }
  });

  // Upload replacement image
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

  window.addEventListener("resize", () => resizeCanvasToDisplaySize());

  requestAnimationFrame((ms) => renderFrame(ms / 1000));
}

main().catch((e) => {
  setError("Player failed to start:\n" + (e?.stack || e));
});

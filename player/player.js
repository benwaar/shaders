// player.js — Minimal WebGL2 Shader Player (spec-first friendly)
// Fixes:
// - Manifest path fallback (./shaders/manifest.json OR ./manifest.json)
// - Shader path fallback (./shaders/<file> OR ./<file>)
// - Robust default image loading (test.png) and upload handling
// - Friendly error reporting in the UI

const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
if (!gl) throw new Error("WebGL2 not available");

// --- UI (optional-friendly) ---
const shaderSelect = document.getElementById("shaderSelect");
const fileInput = document.getElementById("fileInput");
const imgInfo = document.getElementById("imgInfo");
const strength = document.getElementById("strength");
const strengthVal = document.getElementById("strengthVal");
const tint = document.getElementById("tint");
const tintVal = document.getElementById("tintVal");
const resetBtn = document.getElementById("reset");

function setInfo(text) {
  if (imgInfo) imgInfo.textContent = text ?? "";
}

function setError(text, err) {
  console.error(text, err || "");
  setInfo(`⚠ ${text}${err ? ` — ${String(err)}` : ""}`);
}

function resizeCanvasToDisplaySize() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const w = Math.floor(canvas.clientWidth * dpr);
  const h = Math.floor(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvasToDisplaySize);

// --- Minimal passthrough vertex shader ---
const VERT_SRC = `#version 300 es
in vec2 aPos;
out vec2 vUV;
void main() {
  vUV = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// --- Helpers ---
function compileShader(type, source) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log || "Shader compile failed");
  }
  return sh;
}

function linkProgram(vsSrc, fsSrc) {
  const vs = compileShader(gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(log || "Program link failed");
  }
  return prog;
}

function hexToRgb01(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return [1, 1, 1];
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return [r, g, b];
}

function updateUIReadouts() {
  if (strengthVal && strength) strengthVal.textContent = Number(strength.value).toFixed(2);
  if (tintVal && tint) {
    const [r, g, b] = hexToRgb01(tint.value);
    tintVal.textContent = `(${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)})`;
  }
}

function setDefaults() {
  if (strength) strength.value = "0";
  if (tint) tint.value = "#ffffff";
  updateUIReadouts();
}

resetBtn?.addEventListener("click", () => setDefaults());
strength?.addEventListener("input", updateUIReadouts);
tint?.addEventListener("input", updateUIReadouts);

// --- Fetch helpers with fallback paths ---
async function fetchTextWithFallback(paths) {
  let lastErr = null;
  for (const p of paths) {
    try {
      const res = await fetch(p, { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("Fetch failed");
}

async function fetchJsonWithFallback(paths) {
  const txt = await fetchTextWithFallback(paths);
  return JSON.parse(txt);
}

// --- WebGL setup: big triangle ---
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -1, -1,
     3, -1,
    -1,  3,
  ]),
  gl.STATIC_DRAW
);

let program = null;
let loc = null;

// --- Texture for source image ---
const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// Fill with a 1x1 pixel until real image loads
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  1,
  1,
  0,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  new Uint8Array([0, 0, 0, 255])
);

// Flip image Y so vUV matches typical image orientation
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

async function loadManifest() {
  // Try common layouts. Prefer root-relative paths so page location (/player/) doesn't break lookups.
  return await fetchJsonWithFallback([
    "/shaders/manifest.json",
    "/manifest.json",
    "./shaders/manifest.json",
    "./manifest.json",
  ]);
}

async function loadFragmentSource(filename) {
  // Try common layouts. Prefer root-relative paths first.
  return await fetchTextWithFallback([
    `/shaders/${filename}`,
    `/${filename}`,
    `./shaders/${filename}`,
    `./${filename}`,
  ]);
}

async function useShader(filename) {
  const fsSrc = await loadFragmentSource(filename);

  // Build program
  if (program) gl.deleteProgram(program);
  program = linkProgram(VERT_SRC, fsSrc);
  gl.useProgram(program);

  // Bind attribute
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Uniform locations (guarded: shader might omit some uniforms)
  loc = {
    uTexture: gl.getUniformLocation(program, "uTexture"),
    uTint: gl.getUniformLocation(program, "uTint"),
    uStrength: gl.getUniformLocation(program, "uStrength"),
  };

  // Bind sampler to texture unit 0 if present
  if (loc.uTexture) gl.uniform1i(loc.uTexture, 0);
}

async function loadImageBitmapFromUrl(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load image: ${res.status} ${res.statusText}`);
  const blob = await res.blob();
  return await createImageBitmap(blob);
}

async function loadImageBitmapFromFile(file) {
  // createImageBitmap works directly with File/Blob
  return await createImageBitmap(file);
}

async function setSourceImage(bitmap) {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
  setInfo(`${bitmap.width}×${bitmap.height}`);
}

function render() {
  resizeCanvasToDisplaySize();

  gl.clearColor(0.06, 0.06, 0.06, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (!program) {
    requestAnimationFrame(render);
    return;
  }

  gl.useProgram(program);
  gl.bindVertexArray(vao);

  // Set uniforms (only if the shader actually has them)
  if (loc?.uTint && tint) {
    const [r, g, b] = hexToRgb01(tint.value);
    gl.uniform3f(loc.uTint, r, g, b);
  }
  if (loc?.uStrength && strength) {
    gl.uniform1f(loc.uStrength, Number(strength.value));
  }

  // Bind source texture
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimationFrame(render);
}

async function main() {
  try {
    updateUIReadouts();
    setInfo("Loading…");

    // Load manifest
    const manifest = await loadManifest();
    const fragments = manifest.fragments || [];
    if (!fragments.length) throw new Error("manifest.json has no fragments[]");

    // Populate dropdown
    if (shaderSelect) {
      shaderSelect.innerHTML = "";
      for (const f of fragments) {
        const opt = document.createElement("option");
        opt.value = f;
        opt.textContent = f;
        shaderSelect.appendChild(opt);
      }

      const preferred = "solid_tint.frag";
      shaderSelect.value = fragments.includes(preferred) ? preferred : fragments[0];

      shaderSelect.addEventListener("change", async () => {
        try {
          await useShader(shaderSelect.value);
        } catch (e) {
          setError(`Failed to use shader ${shaderSelect.value}`, e);
        }
      });
    }

    // Use initial shader
    const initial = shaderSelect ? shaderSelect.value : fragments[0];
    await useShader(initial);

    // Load default test image (try common locations)
    try {
      const bmp = await loadImageBitmapFromUrl("/test.png");
      await setSourceImage(bmp);
    } catch (e1) {
      try {
        const bmp = await loadImageBitmapFromUrl("/images/test.png");
        await setSourceImage(bmp);
      } catch (e2) {
        setError("Default test image not found (expected ./test.png)", e2);
      }
    }

    // Wire upload
    if (fileInput) {
      fileInput.addEventListener("change", async (e) => {
        try {
          const file = e.target.files?.[0];
          if (!file) return;
          const bmp = await loadImageBitmapFromFile(file);
          await setSourceImage(bmp);
        } catch (err) {
          setError("Failed to load uploaded image", err);
        }
      });
    }

    render();
  } catch (err) {
    setError("Player failed to start", err);
  }
}

main();

import { useEffect, useRef, memo } from "react";

const vertSrc = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

// Math hash for 3D noise
float hash(vec3 p) {
    p = fract(p * vec3(.1031, .11369, .13787));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), u.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), u.x), u.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), u.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) {
        v += a * noise(p);
        p = p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    
    // Cosmic timing rotation
    float t = u_time * 0.03;
    
    // Generate layered noise for nebula plasma
    vec3 coord = vec3(p * 2.2, t);
    
    float q = fbm(coord + vec3(0.0));
    float r = fbm(coord + vec3(1.0, 2.0, t * 0.4) + vec3(q * 1.4));
    float f = fbm(coord + vec3(r * 1.8, q * 0.8, t));
    
    // Color mapping
    vec3 nebulaColor = vec3(0.015, 0.008, 0.035); // deep space background
    
    // Core plasma colors (deep purple / royal blue / warm magenta shifts)
    vec3 color1 = vec3(0.24, 0.08, 0.5); // Deep purple
    vec3 color2 = vec3(0.06, 0.28, 0.48); // Cyan/Deep Blue
    vec3 color3 = vec3(0.42, 0.06, 0.32); // Magenta
    
    nebulaColor = mix(nebulaColor, color1, q);
    nebulaColor = mix(nebulaColor, color2, r);
    nebulaColor = mix(nebulaColor, color3, f);
    
    // Add bright energy centers
    nebulaColor += vec3(0.7, 0.35, 0.8) * pow(f, 4.0) * 0.7;
    nebulaColor += vec3(0.15, 0.45, 0.75) * pow(r, 3.0) * 0.5;
    
    // Subtle star dust overlay
    float stars = pow(hash(vec3(gl_FragCoord.xy, 0.0)), 280.0) * 0.3;
    nebulaColor += vec3(stars);
    
    // Smooth vignette
    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
    nebulaColor *= vignette;
    
    fragColor = vec4(nebulaColor, 1.0);
}`;

export const NebulaBackground = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { 
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance"
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) || "compile error");
      }
      return sh;
    };

    const link = (vs: string, fs: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || "link error");
      }
      return p;
    };

    let prog: WebGLProgram;
    try {
      prog = link(vertSrc, fragSrc);
    } catch (e) {
      console.error("Shader failed to load:", e);
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
      const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr);
      const h = Math.floor((canvas.clientHeight || 400) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      gl.uniform1f(uTime, t);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={ref} 
      className="w-full h-full block absolute inset-0 z-0 pointer-events-none bg-[#030c16]" 
    />
  );
});

NebulaBackground.displayName = "NebulaBackground";

import { useRef, useEffect } from 'react';

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*
*	To explore strange new worlds, to seek out new life
*	and new civilizations, to boldly go where no man has
*	gone before.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	// Use MN = min(R.x, R.y) to preserve perfectly natural, unstretched circular aspect ratio.
	// The empty edges will now fade beautifully into the dark cosmic cloud background because of the clamp.
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		// KOMET PUTIH: Removed the RGB cosine shift, forcing pure white intensity.
		col+=vec3(.0025/d);
		float b=noise(i+p+bg*1.731);
		col+=vec3(.002*b/length(max(p,vec2(b*p.x*.02,p.y))));
		
		// NEBULA SLATE BLUE: Mathematically scaled from footer smokeColor #6b8ea4
		col=mix(col,vec3(bg*.16,bg*.21,bg*.25),clamp(d, 0.0, 1.0));
	}
	O=vec4(col,1);
}`;

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const rendererRef = useRef<any>(null);
  const pointersRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    class WebGLRenderer {
      canvas: HTMLCanvasElement;
      gl: WebGL2RenderingContext;
      program: WebGLProgram | null = null;
      vs: WebGLShader | null = null;
      fs: WebGLShader | null = null;
      buffer: WebGLBuffer | null = null;
      scale: number;
      shaderSource: string;
      mouseMove: [number, number] = [0, 0];
      mouseCoords: [number, number] = [0, 0];
      pointerCoords = [0, 0];
      nbrOfPointers = 0;

      vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

      vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

      constructor(canvas: HTMLCanvasElement, scale: number) {
        this.canvas = canvas;
        this.scale = scale;
        this.gl = canvas.getContext('webgl2')!;
        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
        
        // Detect mobile viewports to reduce loops in shader
        const isMobile = window.innerWidth < 768;
        this.shaderSource = isMobile 
          ? defaultShaderSource.replace("i<12.", "i<7.") 
          : defaultShaderSource;
      }

      updateShader(source: string) {
        this.reset();
        this.shaderSource = source;
        this.setup();
        this.init();
      }

      updateMove(deltas: number[]) {
        this.mouseMove = [deltas[0] || 0, deltas[1] || 0];
      }

      updateMouse(coords: number[]) {
        this.mouseCoords = [coords[0] || 0, coords[1] || 0];
      }

      updatePointerCoords(coords: number[]) {
        this.pointerCoords = coords;
      }

      updatePointerCount(nbr: number) {
        this.nbrOfPointers = nbr;
      }

      updateScale(scale: number) {
        this.scale = scale;
        this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
      }

      compile(shader: WebGLShader, source: string) {
        const gl = this.gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const error = gl.getShaderInfoLog(shader);
          console.error('Shader compilation error:', error);
        }
      }

      test(source: string) {
        let result = null;
        const gl = this.gl;
        const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          result = gl.getShaderInfoLog(shader);
        }
        gl.deleteShader(shader);
        return result;
      }

      reset() {
        const gl = this.gl;
        if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
          if (this.vs) {
            gl.detachShader(this.program, this.vs);
            gl.deleteShader(this.vs);
          }
          if (this.fs) {
            gl.detachShader(this.program, this.fs);
            gl.deleteShader(this.fs);
          }
          gl.deleteProgram(this.program);
        }
      }

      setup() {
        const gl = this.gl;
        this.vs = gl.createShader(gl.VERTEX_SHADER)!;
        this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        this.compile(this.vs, this.vertexSrc);
        this.compile(this.fs, this.shaderSource);
        this.program = gl.createProgram()!;
        gl.attachShader(this.program, this.vs);
        gl.attachShader(this.program, this.fs);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(this.program));
        }
      }

      init() {
        const gl = this.gl;
        const program = this.program!;
        
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        (program as any).resolution = gl.getUniformLocation(program, 'resolution');
        (program as any).time = gl.getUniformLocation(program, 'time');
        (program as any).move = gl.getUniformLocation(program, 'move');
        (program as any).touch = gl.getUniformLocation(program, 'touch');
        (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
        (program as any).pointers = gl.getUniformLocation(program, 'pointers');
      }

      render(now = 0) {
        const gl = this.gl;
        const program = this.program;
        
        if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        
        gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
        gl.uniform1f((program as any).time, now * 1e-3);
        gl.uniform2f((program as any).move, ...this.mouseMove);
        gl.uniform2f((program as any).touch, ...this.mouseCoords);
        gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
        gl.uniform2fv((program as any).pointers, this.pointerCoords);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    class PointerHandler {
      scale: number;
      active = false;
      pointers = new Map<number, number[]>();
      lastCoords = [0, 0];
      moves = [0, 0];

      constructor(element: HTMLCanvasElement, scale: number) {
        this.scale = scale;
        
        const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
          [x * scale, element.height - y * scale];

        element.addEventListener('pointerdown', (e) => {
          this.active = true;
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        });

        element.addEventListener('pointerup', (e) => {
          if (this.count === 1) {
            this.lastCoords = this.first;
          }
          this.pointers.delete(e.pointerId);
          this.active = this.pointers.size > 0;
        });

        element.addEventListener('pointerleave', (e) => {
          if (this.count === 1) {
            this.lastCoords = this.first;
          }
          this.pointers.delete(e.pointerId);
          this.active = this.pointers.size > 0;
        });

        element.addEventListener('pointermove', (e) => {
          if (!this.active) return;
          this.lastCoords = [e.clientX, e.clientY];
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
          this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
        });
      }

      getScale() {
        return this.scale;
      }

      updateScale(scale: number) {
        this.scale = scale;
      }

      get count() {
        return this.pointers.size;
      }

      get move() {
        return this.moves;
      }

      get coords() {
        return this.pointers.size > 0 
          ? Array.from(this.pointers.values()).flat() 
          : [0, 0];
      }

      get first() {
        return this.pointers.values().next().value || this.lastCoords;
      }
    }

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();

    const resize = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const parent = cvs.parentElement;
      if (!parent) return;
      const currentDpr = Math.max(1, 0.5 * window.devicePixelRatio);
      
      cvs.width = parent.clientWidth * currentDpr;
      cvs.height = parent.clientHeight * currentDpr;
      
      if (rendererRef.current) {
        rendererRef.current.updateScale(currentDpr);
      }
    };

    let isInView = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInView;
          isInView = entry.isIntersecting;
          if (isInView && !wasInView) {
            loop(performance.now());
          }
        });
      },
      { threshold: 0.05 }
    );

    const loop = (now: number) => {
      if (!isInView) return;
      if (!rendererRef.current || !pointersRef.current) return;
      
      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    resize();
    
    if (rendererRef.current.test(rendererRef.current.shaderSource) === null) {
      rendererRef.current.updateShader(rendererRef.current.shaderSource);
    }
    
    if (canvas) {
      observer.observe(canvas);
    }
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  return canvasRef;
};

export const NebulaFooterBackground = () => {
  const canvasRef = useShaderBackground();

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block absolute inset-0 z-0 pointer-events-none bg-[#030c16]"
    />
  );
};

const GLSLHills = () => {
  const canvasRef = useShaderBackground();

  return (
    <div className="w-full h-[200px] relative overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none"
      />
    </div>
  );
};

export default GLSLHills;

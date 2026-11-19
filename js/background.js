// Requires `sy` (scroll progress 0..1) from main.js
// ---------- Living coffee "video" background (WebGL shader) ----------
(function(){var cv=document.getElementById('bg'),gl=cv.getContext('webgl');if(!gl)return;
var vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
var fs='precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;uniform float s;'+
'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}'+
'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}'+
'void main(){vec2 uv=gl_FragCoord.xy/r.y;vec2 p=uv*1.7;float T=t*.35;'+
'vec2 d=uv-m;p+=normalize(d+.0001)*.12*exp(-dot(d,d)*6.);'+
'vec2 q=vec2(fbm(p+T*.15),fbm(p+vec2(5.2,1.3)-T*.12));'+
'vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+T*.2),fbm(p+3.*q+vec2(8.3,2.8)-T*.16));'+
'float f=fbm(p+3.*w+s*1.5);'+
'vec3 c=mix(vec3(.04,.02,.015),vec3(.32,.15,.06),clamp(f*f*3.2,0.,1.));'+
'c=mix(c,vec3(.78,.5,.26),clamp(length(q)*.7*f,0.,1.)*.75);'+
'c=mix(c,vec3(.97,.88,.74),smoothstep(.55,1.,w.x*f*2.1)*.4);'+
'c+=vec3(.9,.55,.25)*.18*exp(-dot(d,d)*5.);'+
'vec2 vv=gl_FragCoord.xy/r-.5;c*=1.-dot(vv,vv)*.9;gl_FragColor=vec4(c,1.);}';
function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;gl.useProgram(pr);
var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
var l=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);
var U=function(k){return gl.getUniformLocation(pr,k)},ur=U('r'),ut=U('t'),um=U('m'),us=U('s');
var mx=.5,my=.5,cx=.5,cy=.5,sc=.55;
function rs(){cv.width=innerWidth*sc;cv.height=innerHeight*sc;gl.viewport(0,0,cv.width,cv.height)}rs();addEventListener('resize',rs);
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth;my=1-e.clientY/innerHeight});
var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function fr(ms){cx+=(mx-cx)*.04;cy+=(my-cy)*.04;gl.uniform2f(ur,cv.width,cv.height);gl.uniform1f(ut,calm?10:ms/1000);gl.uniform2f(um,cx*cv.width/cv.height,cy);gl.uniform1f(us,sy);gl.drawArrays(gl.TRIANGLES,0,3);if(!calm)requestAnimationFrame(fr)}
requestAnimationFrame(fr)})();

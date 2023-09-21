uniform sampler2D u_metalMatCap;
varying vec2 vN;
varying vec3 vPosition;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 


void main() {

    vec4 metalTex = texture2D(u_metalMatCap, vN);
    vec4 blue = vec4(0.,0.,1., 1.);
    
    float n = snoise3(vPosition);
    n = step(n,.5);
    vec4 outCol = mix(blue, metalTex, n);
    gl_FragColor =outCol;
}
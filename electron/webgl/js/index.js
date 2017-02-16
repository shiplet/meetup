const { compileShader, createProgram } = require('./shadersAndPrograms');

init();

function init() {
    let canvas = document.createElement('canvas')
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    document.body.appendChild(canvas);

    let gl = initGL(canvas);
    let vertexShader = compileShader(gl, gl.VERTEX_SHADER, 'vertexShader');
    let fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, 'fragmentShader');
    let program = createProgram(gl, vertexShader, fragmentShader);

    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    let positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let positions = [
        -0.7, 0,
          0,  -0.5,
          0,  0.5,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);

    let size = 2,
        type = gl.FLOAT,
        normalize = false,
        stride = 0,
        offset = 0;

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    let primitiveType = gl.TRIANGLES;
    let count = 3;
    offset = 0;
    gl.drawArrays(primitiveType, offset, count);
}

function initGL(canvas) {
    let gl = canvas.getContext('webgl');
    return gl;
}
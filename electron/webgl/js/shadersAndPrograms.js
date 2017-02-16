 function compileShader(gl, type, id) {
    let shader = gl.createShader(type);
    let source = document.getElementById(id).text;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
 }

 function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
 }



 module.exports.compileShader = compileShader;
 module.exports.createProgram = createProgram;
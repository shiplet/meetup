var THREE = require('three')
var createScene = require('./createScene')
var createLights = require('./createLights')
var createSea = require('./createSea')
var createSky = require('./createSky')
var createPlane = require('./createPlane')
var loop = require('./loop')
var handleMouse = require('./handleMouse')
var updatePlane = require('./updatePlane')

const Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xf5986e,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
}

function init() {
    let { scene, camera, renderer, WIDTH, HEIGHT } = createScene()
    createLights(scene)
    let { sea } = createSea(scene, Colors)
    let { sky } = createSky(scene, Colors)
    let { airplane } = createPlane(scene, Colors)
    let mousePos = {}

    function loop() {
        sky.mesh.rotation.z += .01
        sea.moveWaves()
        airplane.pilot.updateHairs()
        updatePlane(airplane, mousePos);
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }

    loop();

    document.addEventListener('mousemove', (event)=>{
        mousePos = handleMouse(event, WIDTH, HEIGHT)
    }, false)
}

init()
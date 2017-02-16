var THREE = require('three')
var scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    HEIGHT,
    WIDTH,
    renderer,
    container

function createScene() {
    HEIGHT = window.innerHeight
    WIDTH = window.innerWidth

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

    aspectRatio = WIDTH / HEIGHT
    fieldOfView = 60
    nearPlane = 1
    farPlane = 10000
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    )

    camera.position.x = 0
    camera.position.z = 200
    camera.position.y = 100

    renderer = new THREE.WebGLRenderer({
        alpha: true,

        antialias: true
    })

    renderer.setSize(WIDTH, HEIGHT)

    renderer.shadowMap.enabled = true

    container = document.getElementById('world')
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', handleWindowResize, false)

    return {
        scene: scene,
        camera: camera,
        fieldOfView: fieldOfView,
        aspectRatio: aspectRatio,
        nearPlane: nearPlane,
        farPlane: farPlane,
        HEIGHT: HEIGHT,
        WIDTH: WIDTH,
        renderer: renderer,
        container: container
    }
}

function handleWindowResize() {
    console.log('blue');
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

module.exports = createScene
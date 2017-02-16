const THREE = require('three')
const OrbitControls = require('three-orbit-controls')

let camera, scene, group, renderer
let mouseX = 0, mouseY = 0

init()
animate()

function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position.z = 500
    scene = new THREE.Scene()
    group = new THREE.Group()
    scene.add(group)

    let loader = new THREE.TextureLoader()
    loader.load('textures/earth_lights_lrg.jpg', (texture)=>{
        let geometry = new THREE.SphereGeometry(200, 20, 20)
        let material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.5
        })
        let mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
    })

    let canvas = document.createElement( 'canvas' )
    canvas.width = 128
    canvas.height = 128

    let context = canvas.getContext( '2d' )
    let gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
    )
    gradient.addColorStop(0.1, 'rgba(210,210,210,1)')
    gradient.addColorStop(1, 'rgba(255,255,255,1)')

    context.fillStyle = gradient
    context.fillRect( 0, 0, canvas.width, canvas.height )
    let texture = new THREE.CanvasTexture( canvas )
    let geometry = new THREE.PlaneBufferGeometry( 300, 300, 3, 3 )
    let material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
    })

    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = -250
    mesh.rotation.x = -Math.PI / 2
    group.add(mesh)

    renderer = new THREE.CanvasRenderer()
    renderer.setClearColor( 0xffffff )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
}

function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (- mouseY - camera.position.y) * 0.05
    camera.lookAt(scene.position)
    group.rotation.y -= 0.005
    renderer.render(scene, camera)
}
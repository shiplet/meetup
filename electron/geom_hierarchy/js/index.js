const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

let container,
    camera,
    scene,
    renderer,
    group,
    mouseX = 0,
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false )

init()
animate()

function init() {
    container = document.createElement( 'div' )
    document.body.appendChild( container )

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 )
    camera.position.z = 6500

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog( 0xffffff, 1, 10000 )

    let geometry = new THREE.BoxGeometry( 100, 100, 100 )
    let material = new THREE.MeshNormalMaterial()

    group = new THREE.Group()

    for(let i = 0; i < 1000; ++i) {
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.random() * 4000 - 2000
        mesh.position.y = Math.random() * 4000 - 2000
        mesh.position.z = Math.random() * 4000 - 2000

        mesh.rotation.x = Math.random() * 2 * Math.PI
        mesh.rotation.y = Math.random() * 2 * Math.PI

        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()

        group.add(mesh)
    }

    scene.add(group)

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor( 0xffffff )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.sortObjects = false

    container.appendChild( renderer.domElement )

    let controls = new OrbitControls(camera)
    controls.target.set(0,1,0)
    controls.update()


    window.addEventListener( 'resize', onWindowResize, false )

}

function animate(event) {
    requestAnimationFrame(animate)
    render()
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 10;
    mouseY = (event.clientY - windowHalfY) * 10;
}

function onWindowResize(event) {
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )
}

function render() {
    let time = Date.now() * 0.001
    let rx = Math.sin( time * 0.7 ) * 0.5,
        ry = Math.sin( time * 0.3 ) * 0.5,
        rz = Math.sin( time * 0.2 ) * 0.5

    camera.position.x += ( mouseX - camera.position.x ) * 0.05
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05

    camera.lookAt( scene.position )

    group.rotation.x = rx
    group.rotation.y = ry
    group.rotation.z = rz

    renderer.render(scene, camera)
}

document.addEventListener('click', animate, false)
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
let camera, scene, renderer, mode
let group

init()
animate()

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 800)
    camera.position.set(-20, 10, 40)
    camera.lookAt( new THREE.Vector3(0, 0, 0) )

    scene = new THREE.Scene()

    let light = new THREE.HemisphereLight(0xfffbb, 0x080820, 1)
    scene.add(light)

    let clipPlanes = [
        new THREE.Plane( new THREE.Vector3( 1,  0,  0 ), 0 ),
        new THREE.Plane( new THREE.Vector3( 0, -1,  0 ), 0 ),
        new THREE.Plane( new THREE.Vector3( 0,  0, -1 ), 0 ),
    ]

    scene.add( new THREE.AmbientLight( 0x505050 ) )

    group = new THREE.Object3D()

    for( let i = 0; i < 25; ++i ) {
        let geometry = new THREE.SphereBufferGeometry( i / 2, 48, 48 )
        let material = new THREE.MeshStandardMaterial({
            color: new THREE.Color( Math.sin( i * 0.5 ) * 0.5 + 0.5, Math.cos( i * 1.5 ) * 0.5 + 0.5, Math.sin( i * 4.5 + 0 ) * 0.5 + 0.5 ),
            roughness: 0.95,
            metalness: 0.0,
            side: THREE.DoubleSide,
            clippingPlanes: clipPlanes,
            clipIntersection: true
        })
        group.add( new THREE.Mesh(geometry, material) )
    }

    scene.add(group)

    let container = document.body
    renderer = new THREE.WebGLRenderer()
    renderer.antialias = true
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor( 0x222222 )
    renderer.localClippingEnabled = true

    window.addEventListener('resize', onWindowResize, false)
    container.appendChild( renderer.domElement )

    mode = {}
    mode.clipIntersection = true
    mode.clipPosition = 0

    let controls = new OrbitControls( camera )
    controls.target.set( 0, 1, 0 )
    controls.update()
}

function animate() {
    requestAnimationFrame(animate)
    let children = group.children
    for( let i = 0; i < children.length; ++i ) {
        let current = children[i].material
        for ( let j = 0; j < current.clippingPlanes.length; ++j ) {
            let plane = current.clippingPlanes[j]
            plane.constant = (49 * plane.constant + mode.clipPosition) / 50
        }
    }

    renderer.render(scene, camera)
}


function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWith, window.innerHeight)
}
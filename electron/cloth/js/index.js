const OrbitControls = require('three-orbit-controls')(THREE)

let pinsFormation = []
pins = [ 6 ]

pinsFormation.push(pins)

pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
pinsFormation.push(pins)

pins = [ 0 ]
pinsFormation.push(pins)

pins = []
pinsFormation.push(pins)

pins = [ 0, cloth.w ]
pinsFormation.push(pins)

pins = pinsFormation[ 1 ]

let container,
    camera, scene, renderer,
    object

init()
animate()

function init() {
    scene = new THREE.Scene()
    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 )

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000 )
    camera.position.x = 1000
    camera.position.y = 50
    camera.position.z = 1500
    scene.add(camera)

    let light, materials

    scene.add( new THREE.AmbientLight( 0x666666 ) )

    light = new THREE.DirectionalLight( 0xdfebff, 1.75 )
    light.position.set( 50, 200, 100 )
    light.position.multiplyScalar( 1.3 )

    light.castShadow = true

    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024

    let d = 300

    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d

    light.shadow.camera.far = 1000

    scene.add(light)

    let loader = new THREE.TextureLoader()
    let clothTexture = loader.load( 'textures/circuit_pattern.png' )
    clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping
    clothTexture.anisotropy = 16

    let clothMaterial = new THREE.MeshPhongMaterial({
        specular: 0x030303,
        map: clothTexture,
        side: THREE.DoubleSide,
        alphaTest: 0.5
    })

    clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h )
    clothGeometry.dynamic = true

    let uniforms = { texture: { value: clothTexture } }
    let vertexShader = document.getElementById('vertexShaderDepth').text
    let fragmentShader = document.getElementById('fragmentShaderDepth').text

    object = new THREE.Mesh( clothGeometry, clothMaterial )
    object.position.set( 0, 0, 0 )
    object.castShadow = true
    scene.add( object )

    object.customDepthMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide
    })

    let ballGeo = new THREE.SphereGeometry( ballSize, 20, 20 )
    let ballMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa })

    sphere = new THREE.Mesh( ballGeo, ballMaterial )
    sphere.castShadow = true
    sphere.receiveShadow = true
    scene.add(sphere)

    let groundTexture = loader.load('textures/grasslight-big.jpg')
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping
    groundTexture.repeat.set( 25, 25 )
    groundTexture.anisotropy = 1

    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x111111,
        map: groundTexture
    })

    let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial )
    mesh.position.y = -250
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add( mesh )

    let poleGeo = new THREE.BoxGeometry( 5, 375, 5 )
    let poleMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 100 })

    mesh = new THREE.Mesh( poleGeo, poleMat )
    mesh.position.x = -125
    mesh.position.y = -62
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    mesh = new THREE.Mesh( poleGeo, poleMat )
    mesh.position.x = 127
    mesh.position.y = -62
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 255, 5, 5 ), poleMat )
    mesh.position.y = -250 + (750 / 2)
    mesh.position.x = 0
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    let gg = new THREE.BoxGeometry( 10, 10, 10 )
    mesh = new THREE.Mesh( gg, poleMat )
    mesh.position.y = -250
    mesh.position.x = 125
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    mesh = new THREE.Mesh( gg, poleMat )
    mesh.position.y = -250
    mesh.position.x = -125
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor( scene.fog.color )

    document.body.appendChild( renderer.domElement )

    renderer.gammaInput = true
    renderer.gammaOutput = true

    renderer.shadowMap.enabled = true

    let controls = new OrbitControls(camera)
    controls.maxPolarAngle = Math.PI * 0.5
    controls.minDistance = 1000
    controls.maxDistance = 7500

    sphere.visible = !true

}

function animate() {
    requestAnimationFrame(animate)

    let time = Date.now()

    windStrength = Math.cos( time / 7000 ) * 20 + 40
    windForce.set( Math.sin( time/ 2000 ), Math.cos( time / 3000 ),  Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength )

    simulate( time )
    render()
}

function render() {
    let p = cloth.particles;

    for ( let i = 0; i < p.length; ++i ) {
        clothGeometry.vertices[i].copy( p[i].position )
    }

    clothGeometry.computeFaceNormals()
    clothGeometry.computeVertexNormals()

    clothGeometry.normalsNeedUpdate = true
    clothGeometry.verticesNeedUpdate = true

    sphere.position.copy( ballPosition )

    camera.lookAt( scene.position )
    renderer.render( scene, camera )
}
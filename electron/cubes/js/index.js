const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

let scene, camera, renderer, cube, sphere, geometry, material, floatlight, texture
const multiplier = 1.428571428

let lineColor = 0xffffff,
    pointColor = 0x92a8b0,
    backgroundColor = 0x0e0f1a

let xup = true, xdown = false,
    yup = true, ydown = false,
    speed = 0.05

init()
animate()

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000)
    scene = new THREE.Scene()
    let ambientLight = new THREE.AmbientLight(lineColor, 1)
    // scene.add(ambientLight)
    camera.position.z = 50
    texture = new THREE.TextureLoader().load("textures/dirt.bmp")

    geometry = new THREE.CubeGeometry(14.15, 14.15, 14.5)
    material = new THREE.MeshBasicMaterial({
        color: lineColor,
        wireframeLinewidth: 5,
        map: texture
    })

    cube = new THREE.Mesh(geometry, material)
    // cube.rotation.z = Math.PI / 4
    scene.add(cube)

    createLights()

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor( 0x0e0f1a )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )

    document.body.appendChild( renderer.domElement )
    renderer.gammaInput = true
    renderer.gammaOuput = true

    let controls = new OrbitControls(camera)
}



function animate() {
    requestAnimationFrame(animate)

    if(floatlight.position.x >= 10)
    {
        floatlight.position.x = 10
        xup = false
        xdown = true
    }
    if(floatlight.position.y >= 10)
    {
        floatlight.position.y = 10
        yup = false
        ydown = true
    }
    if(floatlight.position.y <= -10)
    {
        floatlight.position.y = -10
        yup = true
        ydown = false
    }
    if(floatlight.position.x <= -10)
    {
        floatlight.position.x = -10
        xup = true
        xdown = false
    }

    if(xup) floatlight.position.x += speed
    if(yup) floatlight.position.y += speed
    if(xdown) floatlight.position.x -= speed
    if(ydown) floatlight.position.y -= speed

    renderer.render(scene, camera)
}

function createLights() {

    floatlight = new THREE.PointLight( 0xffffff, 35, 1, 2 )
    floatlight.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } )) )
    floatlight.position.z = -0.035
    floatlight.position.x = -10
    scene.add(floatlight)

    for(let i = 0; i < 15; ++i) {
        let light = new THREE.PointLight( pointColor, 5, 2, 1 )
        light.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: pointColor } )) )
        let x = (-multiplier * i) + 10
        let y = (multiplier * i)
        if(x < 0)
        {
            y = (-multiplier * i) + 20
        }
        light.position.set(x, y, -0.05)
        scene.add(light)
    }

    for(let i = 1; i < 14; ++i) {
        let light = new THREE.PointLight( pointColor, 5, 2, 1 )
        light.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: pointColor } )) )
        let x = (-multiplier * i) + 10
        let y = (-multiplier * i)
        if(x < 0)
        {
            y = (multiplier * i) - 20
        }
        light.position.set(x, y, -0.05)
        scene.add(light)
    }
}
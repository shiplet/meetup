var THREE = require('three')

const Cloud = function(Colors) {
    this.mesh = new THREE.Object3D()
    var geom = new THREE.BoxGeometry(20,20,20)
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.white
    })

    var nBlocks = 3+Math.floor(Math.random() * 3)
    for(let i = 0; i < nBlocks; ++i) {
        let m = new THREE.Mesh(geom, mat)

        m.position.x = i*15
        m.position.y = Math.random() * 10
        m.position.z = Math.random() * 10
        m.rotation.z = Math.random() * Math.PI*2
        m.rotation.y = Math.random() * Math.PI*2

        let s = .1 + Math.random() * .9
        m.scale.set(s,s,s)

        m.castShadow = true
        m.receiveShadow = true

        this.mesh.add(m)
    }
}

const Sky = function(Colors) {
    this.mesh = new THREE.Object3D()
    this.nClouds = 20
    let stepAngle = Math.PI*2 / this.nClouds

    for(let i = 0; i < this.nClouds; ++i) {
        let c = new Cloud(Colors)
        let a = stepAngle*i
        let h = 750 + Math.random() * 200

        c.mesh.position.y = Math.sin(a) * h
        c.mesh.position.x = Math.cos(a) * h

        c.mesh.rotation.z = a + Math.PI/2
        c.mesh.position.z = -400-Math.random()*400

        let s = 1+Math.random()*2
        c.mesh.scale.set(s,s,s)

        this.mesh.add(c.mesh)
    }
}

function createSky(scene, Colors) {
    let sky = new Sky(Colors)
    sky.mesh.position.y = -600
    scene.add(sky.mesh)
    return {
        sky: sky
    }
}

module.exports = createSky
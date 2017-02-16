var THREE = require('three')

const Sea = function(Colors) {
    var geom = new THREE.CylinderGeometry(600,600,800,40,10)
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))

    geom.mergeVertices()

    let l = geom.vertices.length
    this.waves = []

    for(let i = 0; i < l; ++i) {
        let v = geom.vertices[i]
        this.waves.push({
            y: v.y,
            x: v.x,
            z: v.z,
            ang: Math.random() * Math.PI*2,
            amp: 5 + Math.random() * 15,
            speed: 0.016 + Math.random() * 0.032
        })
    }

    var mat = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: .6,
        shading: THREE.FlatShading
    })

    this.mesh = new THREE.Mesh(geom, mat)
    this.mesh.receiveShadow = true
}

Sea.prototype.moveWaves = function() {
    let verts = this.mesh.geometry.vertices
    let l = verts.length

    for(let i = 0; i < l; ++i) {
        let v = verts[i]
        let vprops = this.waves[i]
        v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp

        vprops.ang += vprops.speed
    }

    this.mesh.geometry.verticesNeedUpdate = true
    this.mesh.rotation.z += 0.005

}

function createSea(scene, Colors) {
    let sea = new Sea(Colors)
    sea.mesh.position.y = -600
    scene.add(sea.mesh)

    return {
        sea: sea
    }
}

module.exports = createSea
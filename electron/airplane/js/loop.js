function loop(renderer, scene, camera, sea, sky, airplane) {
    airplane.propeller.rotation.x += 0.005
    sea.mesh.rotation.z += .005
    sky.mesh.rotation.z += .01

    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

module.exports = loop
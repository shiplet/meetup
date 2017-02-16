function updatePlane(airplane, mousePos) {
    let targetX = normalize(mousePos.x, -1, 1, -100, 100) || 100
    let targetY = normalize(mousePos.y, -1, 1, 25, 175) || 100

    airplane.mesh.position.x += (targetX - airplane.mesh.position.x) * 0.1
    airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1

    airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y)*0.0128
    airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY)*0.0128

    airplane.propeller.rotation.x += 0.3
    airplane.pilot.updateHairs()
}

function normalize(v,vmin,vmax,tmin,tmax) {
    let nv = Math.max(Math.min(v,vmax), vmin)
    let dv = vmax-vmin
    let pc = (nv-vmin)/dv
    let dt = tmax-tmin
    let tv = tmin + (pc*dt)

    return tv
}


module.exports = updatePlane
function handleMouse(event, WIDTH, HEIGHT) {
    let tx = -1 + (event.clientX / WIDTH) * 2
    let ty = 1 - (event.clientY / HEIGHT ) * 2
    return {
        x: tx,
        y: ty
    }
}

module.exports = handleMouse
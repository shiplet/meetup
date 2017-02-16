const { app, BrowserWindow, Menu } = require('electron')
const Config = require('electron-config');
const path = require ('path')
const url = require('url')

const config = new Config();
let win

function createWindow() {
    win = new BrowserWindow({
        height: config.get('height') || 600,
        width: config.get('width') || 800,
        x: config.get('x') || 0,
        y: config.get('y') || 0,
        frame: false
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file',
        slashes: true
    }))

    win.on('closed', ()=>{
        win = null
    })

    win.on('resize', ()=>{
        let [ width, height ] = win.getSize()
        config.set('width', width);
        config.set('height', height);
    })

    win.on('moved', ()=>{
        let [ x, y ] = win.getPosition()
        config.set('x', x)
        config.set('y', y)
    })

    win.webContents.on('context-menu', (event, params)=>{
        const { x, y } = params;

        Menu.buildFromTemplate([{
            label: 'Inspect element',
            click() {
              win.inspectElement(x, y);
          }
      }]).popup(win);
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin')
    {
        app.quit()
    }
})

app.on('activate', ()=>{
    if(win === null)
    {
        createWindow()
    }
})
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell

let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600})
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protcol: 'file:',
        slashes: true
    }))
    
    win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                { label: 'Ajust notification value' },
                { type: 'separator' },
                {
                    label: 'CoinMarketCap',
                    click() {
                        shell.openExternal('https://coinmarketcap.com')
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                },
            ]
        },
        { label: 'Info' }
    ])

    Menu.setApplicationMenu(menu);
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null) {
        createWindow()
    }
})
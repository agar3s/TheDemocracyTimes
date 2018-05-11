import 'phaser'
import {BootScene} from './scenes/boot'

let config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  scaleMode: 1,
  resolution: 1,
  pixelArt: true,
  canvas: document.getElementById('game'),
  backgroundColor: 0xffffee,
  scene: [
    BootScene
  ]
}

let game = new Phaser.Game(config)

document.getElementById('game').focus()
window.focus()


document.getElementById('fullScreen').onclick= () => {
  window['game'][game.device.fullscreen.request]()
}

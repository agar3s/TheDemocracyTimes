import 'phaser'

import BootScene from './scenes/boot'
import {MenuScene} from './scenes/menu'
import {MonologueScene} from './scenes/monologue'
import {OfficeScene} from './scenes/office'
import {EditScene} from './scenes/edit'
import {PublishScene} from './scenes/publish'

let config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  scaleMode: 1,
  resolution: 1,
  pixelArt: true,
  canvas: document.getElementById('game'),
  backgroundColor: 0xa37a5c,
  scene: [
    BootScene,
    MenuScene,
    MonologueScene,
    OfficeScene,
    EditScene,
    PublishScene
  ]
}

let game = new Phaser.Game(config)

document.getElementById('game').focus()
window.focus()


document.getElementById('fullScreen').onclick= () => {
  window['game'][game.device.fullscreen.request]()
}

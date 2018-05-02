import 'phaser'
import {BootScene} from './scenes/boot'

let config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  scaleMode: 1,
  pixelArt: true,
  canvas: document.getElementById('game'),
  backgroundColor: 0xffffff,
  scene: [
    BootScene
  ]
}

let game = new Phaser.Game(config)

document.getElementById('game').focus()
window.focus()
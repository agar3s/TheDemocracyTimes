
class BootScene extends Phaser.Scene {
  constructor () {
    super({key: 'bootScene'})
  }

  preload () {
    this.load.spritesheet('logo', 'assets/logo.png', { frameWidth: 770, frameHeight: 291 })

  }

  create () {
    this.add.sprite(400, 300, 'logo')
  }

  update (time, dt) {

  }

}

export {
  BootScene
}
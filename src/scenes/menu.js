import GeneralScene from './scene.js'


class MenuScene extends GeneralScene {
  constructor () {
    super({key: 'menuScene'})
  }

  create () {
    super.create()


    let background = this.add.sprite(this.screenBounds.width/2, this.screenBounds.height/2, 'back')
    background.setScale(4)

    let logo = this.add.sprite(640, 240, 'head')
    logo.setOrigin(0.5, 0.5)
    logo.setScale(4)
    logo.setTint(0x62391b)


    let start = this.createButton({
      x: 640,
      y: 450,
      font: 'na28',
      text: 'Start',
      onClick: () => {
        this.scene.start('editScene')
      },
      scale: 1.6
    })

    let language = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Language',
      onClick: () => {
      },
      scale: 1.6
    })


    this.input.on('pointerdown', (pointer, gameObject) => {
      if (gameObject.length > 0) {
        gameObject[0].getData('onClick')()
      }
    })

    this.input.on('pointerover', (pointer, gameObject) => {
      let button = gameObject[0]
      button.setTint(button.getData('colors').hover)
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let button = gameObject[0]
      button.setTint(button.getData('colors').normal)
    })

  }

  update () {

  }

}
export {
  MenuScene
}
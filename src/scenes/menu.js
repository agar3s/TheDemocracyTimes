import GeneralScene from './scene.js'

console.log(GeneralScene)

class MenuScene extends GeneralScene {
  constructor () {
    super({key: 'menuScene'})
  }

  preload () {

    // images
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    // backgrounds
    this.load.spritesheet('back3', 'assets/backgroundPaper.png', { frameWidth: 320, frameHeight: 180 })

    // HEADLINES
    this.load.bitmapFont('na28', 'assets/fonts/newsgeek28_0.png', 'assets/fonts/newsgeek28.fnt')
    this.load.bitmapFont('na22', 'assets/fonts/newsgeek22_0.png', 'assets/fonts/newsgeek22.fnt')
    this.load.bitmapFont('na18', 'assets/fonts/newsgeek18_0.png', 'assets/fonts/newsgeek18.fnt')
    this.load.bitmapFont('na16', 'assets/fonts/newsgeek16_0.png', 'assets/fonts/newsgeek16.fnt')

    // lead liners
    this.load.bitmapFont('small12', 'assets/fonts/small12_0.png', 'assets/fonts/small12.fnt')
    this.load.bitmapFont('small8', 'assets/fonts/small8_0.png', 'assets/fonts/small8.fnt')
    this.load.bitmapFont('small10', 'assets/fonts/small10_0.png', 'assets/fonts/small10.fnt')
  }

  create () {
    super.create()

    let graphics = this.add.graphics()
    graphics.fillStyle(0xe7bea0, 1)
    graphics.fillRect(
      this.screenBounds.paddingLateral,
      this.screenBounds.paddingVertical,
      this.screenBounds.width - this.screenBounds.paddingLateral*2,
      this.screenBounds.height - this.screenBounds.paddingVertical*2
    )

    let background = this.add.sprite(this.screenBounds.width/2, this.screenBounds.height/2, 'back3')
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
        console.log('click on start')
      },
      scale: 1.6
    })

    let language = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Language',
      onClick: () => {
        console.log('click on language')
      },
      scale: 1.6
    })

    let exit = this.createButton({
      x: 640,
      y: 570,
      font: 'na28',
      text: 'Exit',
      onClick: () => {
        console.log('click on exit')
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
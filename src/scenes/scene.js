import Translation from '../utils/translation'

const timeToFade = 220

export default class GeneralScene extends Phaser.Scene {
  constructor (props) {
    super(props)
  }

  create () {
    this.translations = new Translation(this.cache, 'translations')
    this.screenBounds = {
      width: 1280,
      height: 720,
      paddingLateral: 10,
      paddingVertical: 10
    }

    this.input.on('pointerdown', (pointer, gameObject) => {
      if (gameObject.length > 0) {
        let object = gameObject[0]
        if(object.getData('type') === 'button'){
          object.getData('onClick')()
        }
      }
    })
    this.input.on('pointerover', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        object.setTint(object.getData('colors').hover)
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        object.setTint(object.getData('colors').normal)
      }
    })
    this.cameras.main.fadeIn(timeToFade)
  }

  createButton (props) {
    let button = this.add.bitmapText(props.x, props.y, props.font, props.text)
    button.setTint(props.color || 0x62391b)
    button.setData('colors', {
      normal: props.color || 0x62391b,
      hover: props.hoverColor || 0xffdabd
    })
    button.setData('onClick', props.onClick)
    button.setData('type', 'button')
    button.setOrigin(0.5, 0.5)

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || 1)
    return button
  }

  changeToScene(key) {
    this.cameras.main.fadeOut(timeToFade)
    this.time.delayedCall(timeToFade, () => {
      this.scene.start(key)
    }, [], this)
  }
}

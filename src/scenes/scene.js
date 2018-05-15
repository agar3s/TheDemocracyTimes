import Translation from '../utils/translation'


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
  }

  createButton (props) {
    let button = this.add.bitmapText(props.x, props.y, props.font, props.text)
    button.setTint(props.color || 0x62391b)
    button.setData('colors', {
      normal: props.color || 0x62391b,
      hover: props.hoverColor || 0xffdabd
    })
    button.setData('onClick', props.onClick)
    button.setOrigin(0.5, 0.5)

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || 1)
    return button
  }
}

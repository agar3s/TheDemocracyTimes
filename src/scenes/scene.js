import {getTranslator} from '../utils/translation'
import {getDateManager} from '../dateManager'
import {getStatusManager} from '../statusManager'

const timeToFade = 220

export default class GeneralScene extends Phaser.Scene {
  constructor (props) {
    super(props)
    this.background = 0x3a1a01
  }

  init () {
    this.translator = getTranslator(this.cache)
    this.dateManager = getDateManager(this.cache)
    this.statusManager = getStatusManager()
    this.layouts = this.cache.json.get('layouts')
    this.screenBounds = {
      width: 1280,
      height: 720,
      paddingLateral: 10,
      paddingVertical: 10
    }

  }

  create () {
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
        object.getData('onHover')()
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        object.getData('onOut')()
      }
    })
    this.cameras.main.fadeIn(timeToFade)
    this.drawBackground()
  }

  drawBackground () {
    // check layout
    var graphics = this.add.graphics()
    graphics.fillStyle(this.background, 1)
    
    // desktop
    graphics.fillRect(
      this.screenBounds.paddingLateral,
      this.screenBounds.paddingVertical,
      this.screenBounds.width - this.screenBounds.paddingLateral*2,
      this.screenBounds.height - this.screenBounds.paddingVertical*2
    )
  }

  createButton (props) {
    let button = this.add.bitmapText(props.x, props.y, props.font, props.text)
    button.setTint(props.color || 0x62391b)
    button.setData('colors', {
      normal: props.color || 0x62391b,
      hover: props.hoverColor || 0xffdabd
    })
    button.setData('onClick', props.onClick)
    button.setData('onHover', () => {
      button.setTint(props.hoverColor || 0xffdabd)
    })
    button.setData('onOut', () => {
      button.setTint(props.color || 0x62391b)
    })
    button.setData('type', 'button')
    button.setOrigin(0.5, 0.5)
    button.setData('location',{x:props.x, y:props.y})

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || 1)
    return button
  }

  updateText(bitmapText, text) {
    bitmapText.setText(text)
    let x = bitmapText.getData('location').x + bitmapText.getTextBounds().local.width/2
    let y = bitmapText.getData('location').y + bitmapText.getTextBounds().local.height/2
    bitmapText.setX(x)
    bitmapText.setY(y)
    bitmapText.setOrigin(0.5, 0.5)
    
  }

  changeToScene(key) {
    this.cameras.main.fadeOut(timeToFade)
    this.time.delayedCall(timeToFade, () => {
      this.scene.start(key)
    }, [], this)
  }

  getText(val, params) {
    if(params){
      return this.translator.translateWithParams(val, params)
    }
    return this.translator.translate(val)
  }
}

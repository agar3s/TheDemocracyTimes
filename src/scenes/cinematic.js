import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class CinematicScene extends GeneralScene {
  constructor () {
    super({key: 'cinematicScene'})
    this.background = 0x160101
    this.introSequence = [
      {
        text: 'Hace un año que mi buen amigo Frank y yo fundamos el Democracy Times.',
        image: 'strip1'
      },
      // {
      //   text: 'Luego de 20 años de carrera, el periódico para el que trabajaba cerró, otro que como tantos quebró a consecuencia de la crisis del 29.',
      //   image: 'strip2'
      // },
      {
        text: 'After 20 years working as a journalist, the newspaper for I worked closed like many others that broke as a result of the 29\'s crisis.',
        image: 'strip2'
      },
      {
        text: 'Frank es un sujeto inteligente y tiene inversiones en diferentes negocios, él no perdio dinero.\nCuando dijo que no podria encontrar alguien mas confiable que yo para dirigir este periodico, no pude sentirme mas halagado.',
        image: 'strip3'
      },
      {
        text: 'Ha sido una gran oportunidad para informar de manera independiente la realidad que la ciudad y el país afronta, por eso es que amo venir aquí dia a dia.',
        image: 'strip3'
      },
    ]
    this.currentStripIndex = 0
  }

  create () {
    super.create()
    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Continue',
      onClick: () => {
        //this.changeToScene('officeScene')
        this.next()
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    next.setOrigin(1, 1)

    let strip = this.introSequence[this.currentStripIndex]
    this.setStrip(strip.text, strip.image)

  }

  setStrip(text, image) {
    if(this.text) {
      this.text.destroy()
      this.stripImage.destroy()
    }
    this.text = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.7,
      'vtt24',
      text,
      this.cameras.main.width*0.7
    )
    this.text.setOrigin(0.5, 0)
    this.text.setTint(0xc69d7f)

    this.stripImage = this.add.sprite(this.screenBounds.width/2, this.screenBounds.height*0.4, image)
    this.stripImage.setScale(1)
  }

  next () {
    this.currentStripIndex++
    if (this.currentStripIndex>=this.introSequence.length) {
      this.changeToScene('monologueScene')
      return
    }
    this.cameras.main.fadeOut(220)
    this.time.delayedCall(220, () => {
      this.cameras.main.fadeIn(220)
      let strip = this.introSequence[this.currentStripIndex]
      this.setStrip(strip.text, strip.image)
    }, [], this)

  }

  update () {

  }

}
export {
  CinematicScene
}
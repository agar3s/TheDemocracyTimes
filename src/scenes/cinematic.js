import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class CinematicScene extends GeneralScene {
  constructor () {
    super({key: 'cinematicScene'})
    this.background = 0x160101
    this.introSequence = [
      {
        text: 'After 20 years working as a journalist, the newspaper I used to work closed like many others that broke as a result of the 29\'s crisis.',
        image: 'strip2'
      },
      {
        text: 'My good Friend Frank come with the idea to start a newspaper. So He and me founded the "Democracy Times" in May 28th 1932.',
        image: 'strip1'
      },
      {
        text: 'Frank is a smart guy and he has diversified inversions, he didn\'t lose money.\n I was flattered and honored when he said he could not find someone better than me to manage this newspaper',
        image: 'strip3'
      },
      {
        text: 'It has been a great opportunity to independently inform the reality that the city and the country is facing, that\'s why I love coming here day by day.',
        image: 'strip4'
      },
    ]
    this.currentStripIndex = 0
  }

  create () {
    super.create()
    this.currentStripIndex = 0
    this.nextButton = this.createButton({
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
    this.nextButton.setOrigin(1, 1)
    this.nextButton.setAlpha(0)

    let strip = this.introSequence[this.currentStripIndex]
    this.setStrip(strip.text, strip.image)
    setTimeout(()=>{
      this.nextButton.setAlpha(1)
    }, 300)
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
    this.nextButton.setAlpha(0)
    this.cameras.main.fadeOut(220)
    this.time.delayedCall(220, () => {
      this.cameras.main.fadeIn(220)
      let strip = this.introSequence[this.currentStripIndex]
      this.setStrip(strip.text, strip.image)
      this.nextButton.setAlpha(1)
    }, [], this)

  }

  update () {

  }

}
export {
  CinematicScene
}
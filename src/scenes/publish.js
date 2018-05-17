import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class PublishScene extends GeneralScene {
  constructor () {
    super({key: 'publishScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Continue',
      onClick: () => {
        this.dateManager.nextDay(this.statusManager)
        this.changeToScene('monologueScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })

    next.setOrigin(1, 1)


    let title = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.1,
      'na28',
      'Sale Results',
      this.cameras.main.width
    )

    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.4)


    // this should display the newspaper sold in the last day...
    let results = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width - 100,
      this.cameras.main.height/4 + 320,
      'vtt24',
      `Last newspaper sold 1032 units`,
      this.cameras.main.width - 200
    )

    results.setOrigin(1, 0.5)
    results.setTint(0xc69d7f)
  }

  update () {

  }

}
export {
  PublishScene
}
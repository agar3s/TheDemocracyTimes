import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class EndingScene extends GeneralScene {
  constructor () {
    super({key: 'endingScene'})
    this.background = 0x160101
  }

  create () {
    super.create()
    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Continue',
      onClick: () => {
        this.changeToScene('menuScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    next.setOrigin(1, 1)

    console.log(this.dateManager.data)
    let title = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height/4,
      'na28',
      this.dateManager.data.title,
      this.cameras.main.width
    )
    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.6)

    let text = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.4,
      'vtt24',
      this.dateManager.data.conclusion,
      this.cameras.main.width*0.7
    )
    text.setOrigin(0.5, 0)
    text.setTint(0xc69d7f)

    let number = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.8,
      'vtt24',
      this.dateManager.data.number,
      this.cameras.main.width*0.8
    )
    number.setOrigin(0.5, 0.5)
    number.setTint(0xc69d7f)
    
  }


  update () {

  }

}
export {
  EndingScene
}
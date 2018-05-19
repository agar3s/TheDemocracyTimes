import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class MonologueScene extends GeneralScene {
  constructor () {
    super({key: 'monologueScene'})
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
        this.changeToScene('officeScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    next.setOrigin(1, 1)
    
    let title = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height/4,
      'na28',
      this.dateManager.getDate(),
      this.cameras.main.width
    )

    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.6)

    let content = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height/4 + 80,
      'vtt24',
      this.dateManager.getMonologue(),
      this.cameras.main.width - 200
    )
    content.setOrigin(0.5, 0)
    content.setTint(0xc69d7f)

  }

  update () {

  }

}
export {
  MonologueScene
}
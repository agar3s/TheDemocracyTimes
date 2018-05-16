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
      'May 23th 1932',
      this.cameras.main.width
    )

    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.6)

    let content = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height/4 + 120,
      'vtt24',
      this.translations.translate('23-05-32-monologue'),
      this.cameras.main.width - 200
    )
    content.setOrigin(0.5, 0.5)
    content.setTint(0xc69d7f)


    // this should display the newspaper sold in the last day...
    let results = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width - 100,
      this.cameras.main.height/4 + 320,
      'vtt24',
`The last newspaper sold 1032 units...
                           that\'s ok.`,
      this.cameras.main.width - 200
    )

    results.setOrigin(1, 0.5)
    results.setTint(0xc69d7f)

  }

  update () {

  }

  destroy() {
    console.log('destroy this scene')
  }
  shutdown () {
    console.log('shutdown this scene')
  }

}
export {
  MonologueScene
}
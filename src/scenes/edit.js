import GeneralScene from './scene'
import Translation from '../utils/translation'
import Frontpage from '../sprites/frontpage'
import NewsItem from '../sprites/newsitem'

class EditScene extends GeneralScene {
  constructor () {
    super({key: 'editScene'})
  }

  preload () {


  }

  create () {
    super.create()

    this.frontpage = new Frontpage({
      scene: this,
      screenBounds: this.screenBounds,
      layouts: this.layouts
    })
    
    let width = 3
    let height = 4
    let header = 0.5
    let ratio = (this.screenBounds.height - this.screenBounds.paddingVertical*2)/5

    this.registerEvents(ratio)

    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Ready to Print',
      onClick: () => {
        this.changeToScene('publishScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    next.setOrigin(1, 1)

    // news to publish
    // news basic distribution
    let formats = this.cache.json.get('formats')
    let newsData = this.dateManager.getNews()

    newsData.sort(()=> Math.random()<0.5)

    for (let i = 0; i < newsData.length; i++) {
      new NewsItem({formats, scene: this, screenBounds: this.screenBounds, ratio}, newsData[i])
    }
  }

  update (time, dt) {

  }

  getText(val) {
    return this.translations.translate(val)
  }

  destroy () {
    console.log('destroy on edit called')
  }

  registerEvents(ratio) {
    this.input.on('dragstart', (pointer, gameObject) => {
      let currentIndex = this.children.list.indexOf(gameObject)
      if (currentIndex !== -1 && currentIndex < this.children.list.length - 1) {
          this.children.list.splice(currentIndex, 1)
          this.children.list.push(gameObject)
      }
    }, this)

    this.input.on('drag', (pointer, container, dragX, dragY) => {
      container.x = dragX
      container.y = dragY
      if(container.getData('type') === 'newsitem') {
        let rect = new Phaser.Geom.Rectangle(container.x, container.y, 1.5*ratio, 2*ratio)
        let inside = this.frontpage.checkItem(pointer)
        if (inside) {
          container.setAlpha(0.6)
        } else {
          container.setAlpha(1)
        }
      }
    })

    this.input.on('dragend', (pointer, container) => {
      if(container.getData('type') === 'newsitem') {
        this.frontpage.attachItem(container.getData('item'))
        container.setAlpha(1)
      }
    }, this)
  }


}

export {
  EditScene
}
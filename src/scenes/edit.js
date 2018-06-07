import GeneralScene from './scene'
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

    let width = 3
    let height = 4
    let header = 0.5
    let ratio = (this.screenBounds.height - this.screenBounds.paddingVertical*2)/5
    
    this.next = this.createButton({
      x: this.screenBounds.width - this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na28',
      text: this.getText('nextPrint'),
      onClick: () => {
        this.saveFrontPage()
        this.changeToScene('resultsScene')
      },
      scale: 1,
      color: 0xc69d7f
    })
    this.next.setOrigin(1, 1)
    this.next.setAlpha(0)

    this.frontpage = new Frontpage({
      scene: this,
      screenBounds: this.screenBounds,
      layouts: this.layouts,
      availableLayouts: this.dateManager.getLayouts()
    })
    

    this.registerEvents(ratio)


    // news to publish
    // news basic distribution
    let formats = this.cache.json.get('formats')
    let newsData = this.dateManager.getNews()

    newsData.sort(()=> Math.random()<0.5)
    this.newsItems = []

    for (let i = 0; i < newsData.length; i++) {
      this.newsItems.push(new NewsItem({formats, scene: this, screenBounds: this.screenBounds, ratio}, newsData[i]))
    }
    this.paperSound = this.sound.add('grabPaperDesktopSound')
    this.paperSound.allowMultiple = true
    this.paperSound.addMarker({name:'0',duration:0.486, start:0})
    this.paperSound.addMarker({name:'1',duration:(0.786-0.595), start:0.595})
    this.paperSound.addMarker({name:'2',duration:(1.322-1.136), start:1.136})
    this.paperSound.addMarker({name:'3',duration:(2.053-1.846), start:1.846}) // me gusta para continue
    this.paperSound.addMarker({name:'4',duration:(2.791-2.660), start:2.660})
    this.paperSound.addMarker({name:'5',duration:(3.091-2.834), start:2.834})
    this.paperSound.addMarker({name:'6',duration:(3.424-3.233), start:3.233})
  }

  saveFrontPage() {
    let news = {}
    this.newsItems.forEach((newsItemContainer)=>{
      news[newsItemContainer.id] = {score: newsItemContainer.score}
    })
    this.statusManager.setPublication(news, this.frontpage.calculateStats())
  }

  update (time, dt) {

  }

  registerEvents(ratio) {
    this.input.on('dragstart', (pointer, gameObject) => {
      let number = ~~(Math.random()*7)
      this.paperSound.play(`${number}`)
      let currentIndex = this.children.list.indexOf(gameObject)
      if (currentIndex !== -1 && currentIndex < this.children.list.length - 1) {
          this.children.list.splice(currentIndex, 1)
          this.children.list.push(gameObject)
      }
      gameObject.x -= 10
      gameObject.y -= 10
      gameObject.drawShadow(0.4)
    }, this)

    this.input.on('drag', (pointer, container, dragX, dragY) => {
      container.x = dragX - 10
      container.y = dragY - 10
      if(container.getData('type') === 'newsitem') {
        let rect = new Phaser.Geom.Rectangle(container.x, container.y, 1.5*ratio, 2*ratio)
        let inside = this.frontpage.checkItem(pointer)
        if (inside) {
          container.setAlpha(0.8)
          container.drawShadow(0.3)
        } else {
          container.setAlpha(1)
          container.drawShadow(0.4)
        }
        
      }
    })

    this.input.on('dragend', (pointer, container) => {
      if(container.getData('type') === 'newsitem') {
        container.drawShadow(0)
        container.x += 10
        container.y += 10
        this.frontpage.attachItem(container.getData('item'))
        container.setAlpha(1)
      }
    }, this)
  }


}

export {
  EditScene
}
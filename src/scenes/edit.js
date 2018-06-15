import GeneralScene from './scene'
import Frontpage from '../sprites/frontpage'
import NewsItem from '../sprites/newsitem'

class EditScene extends GeneralScene {
  constructor () {
    super({key: 'editScene'})
  }

  preload () {
  }

  init() {
    super.init()
    this.baseBounds = {
      width: 1280,
      height: 720,
      paddingLateral: 10,
      paddingVertical: 10
    }
    this.screenBounds = {
      width: this.baseBounds.width*1.6,
      height: this.baseBounds.height,
      paddingLateral: 10,
      paddingVertical: 10
    }
  }

  create () {
    super.create()

    let zone = this.add.zone(0,0,this.screenBounds.width, this.screenBounds.height).setInteractive().setOrigin(0)
    this.input.setDraggable(zone)

    let width = 3
    let height = 4
    let header = 0.5
    let ratio = (this.baseBounds.height - this.baseBounds.paddingVertical*2)/5
    
    this.next = this.createButton({
      x: this.baseBounds.width - this.baseBounds.paddingVertical*2,
      y: this.baseBounds.height - this.baseBounds.paddingVertical*2,
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
      screenBounds: this.baseBounds,
      layouts: this.layouts,
      availableLayouts: this.dateManager.getLayouts(),
      x: this.screenBounds.width*0.5,
      y: this.screenBounds.height*0.05
    })
    

    this.registerEvents(ratio)


    // news to publish
    // news basic distribution
    let formats = this.cache.json.get('formats')
    let newsData = this.dateManager.getNews()

    newsData.sort(()=> Math.random()<0.5)
    this.newsItems = []

    for (let i = 0; i < newsData.length; i++) {
      this.newsItems.push(new NewsItem({
        formats,
        scene: this,
        screenBounds: {
          x: this.screenBounds.width*0.5,
          y: this.screenBounds.paddingVertical,
          width: this.baseBounds.width*0.5,
          height: this.screenBounds.height - this.screenBounds.paddingVertical*2
        },
        ratio
      },
      newsData[i]
      ))
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




    var cursors = this.input.keyboard.createCursorKeys()
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.05,
        drag: 0.0008,
        maxSpeed: 0.5
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
    this.cameras.main.setScroll(this.baseBounds.width*0.3, 0)


    var graphics = this.add.graphics()
    graphics.lineStyle(1, 0xff00ff, 1)
    graphics.fillStyle(0,0x0, 0)
    
    // desktop
    graphics.strokeRect(
      this.baseBounds.width*0.3 + 15, 15,
      this.baseBounds.width - 30, this.baseBounds.height - 30
    )
    graphics.strokeRect(
      this.baseBounds.width*0.3, 15,
      this.baseBounds.width*0.5, this.baseBounds.height - 30
    )

    graphics.lineStyle(1, 0x00ffff, 1)
    graphics.strokeRect(
      this.screenBounds.width*0.5,
      this.screenBounds.paddingVertical,
      this.baseBounds.width*0.5,
      this.screenBounds.height - this.screenBounds.paddingVertical*2
    )
  }

  saveFrontPage() {
    let news = {}
    this.newsItems.forEach((newsItemContainer)=>{
      news[newsItemContainer.id] = {score: newsItemContainer.score}
    })
    this.statusManager.setPublication(news, this.frontpage.calculateStats())
  }

  update (time, dt) {
    this.controls.update(dt)
  }

  registerEvents(ratio) {
    let mainCamera = this.cameras.main

    let dragOrigin = {x: mainCamera.scrollX,y: mainCamera.scrollY}

    this.input.on('dragstart', (pointer, container) => {
      if(container.getData('type') === 'newsitem') {
        let number = ~~(Math.random()*7)
        this.paperSound.play(`${number}`)
        let currentIndex = this.children.list.indexOf(container)
        if (currentIndex !== -1 && currentIndex < this.children.list.length - 1) {
            this.children.list.splice(currentIndex, 1)
            this.children.list.push(container)
        }
        container.x -= 10
        container.y -= 10
        container.drawShadow(0.4)
      }else {
        dragOrigin = {x: mainCamera.scrollX,y: mainCamera.scrollY}
      }
    }, this)

    this.input.on('drag', (pointer, container, dragX, dragY) => {
      if(container.getData('type') === 'newsitem') {
        container.x = dragX - 10
        container.y = dragY - 10
        let inside = this.frontpage.checkItem({
          x: pointer.x + mainCamera.scrollX,
          y: pointer.y + mainCamera.scrollY
        })
        if (inside) {
          container.setAlpha(0.8)
          container.drawShadow(0.3)
        } else {
          container.setAlpha(1)
          container.drawShadow(0.4)
        }
      } else {
        dragX = dragOrigin.x - dragX
        if(dragX<0) dragX = 0
        if(dragX>this.screenBounds.width-this.baseBounds.width) dragX = this.screenBounds.width-this.baseBounds.width
        mainCamera.setScroll(dragX, 0)
        console.log(dragX)
      }
    }, this)

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
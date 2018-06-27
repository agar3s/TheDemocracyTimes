import GeneralScene from './scene'
import Frontpage from '../sprites/frontpage'
import NewsItem from '../sprites/newsitem'
import PocketWatch from '../sprites/pocketWatch'
import Folder from '../sprites/folder'

import {getSalesManager} from '../salesManager'

class EditScene extends GeneralScene {
  constructor () {
    super({key: 'editScene'})
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

    this.salesManager = getSalesManager()
    //this.salesManager.calculateSales()
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
      y: this.screenBounds.height*0.05,
      width: 3 * ratio + 20,
      height: 4.4 * ratio + 20,
      type: 'frontpage'
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
        ratio,
        width: ratio*formats['clip'].width,
        height: ratio*formats['clip'].height,
        type: 'newsitem'
      },
      newsData[i]
      ))
    }

    // watch
    this.pocketWatch = new PocketWatch({
      x: 410,
      y: 540,
      scene: this,
      type: 'clock',
      width: 144,
      height: 151
    })

    // folders
    this.folderHandle = this.folderHandle.bind(this)
    this.folder1 = new Folder({
      x: 120,
      y: 100,
      scene: this,
      type: 'folder',
      width: 191*1.8,
      height: 259*1.8
    })
    this.folder1.addInteractionListener(this.folderHandle)

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

  }

  saveFrontPage() {
    let news = {}
    this.newsItems.forEach((newsItemContainer) => {
      news[newsItemContainer.id] = {score: newsItemContainer.score}
    })
    //this.statusManager.setPublication(news, this.frontpage.calculateStats())
  }


  update (time, dt) {
    this.controls.update(dt)

    this.pocketWatch.update(dt)
  }

  registerEvents(ratio) {
    let mainCamera = this.cameras.main

    let dragOrigin = {x: mainCamera.scrollX,y: mainCamera.scrollY}

    this.input.on('dragstart', (pointer, container) => {
      if(container.getData('draggable')){
        let item = container.getData('item')
        item.onDragStart(pointer)
      }else {
        dragOrigin = {x: mainCamera.scrollX, y: mainCamera.scrollY}
      }
    }, this)

    this.input.on('drag', (pointer, container, dragX, dragY) => {
      if(container.getData('draggable')){
        let item = container.getData('item')
        item.onDrag(pointer, dragX, dragY)
      } else {
        dragX = dragOrigin.x - dragX
        if(dragX<0) dragX = 0
        if(dragX>this.screenBounds.width-this.baseBounds.width) dragX = this.screenBounds.width-this.baseBounds.width
        mainCamera.setScroll(dragX, 0)
      }
    }, this)

    this.input.on('dragend', (pointer, container) => {
      if(container.getData('draggable')){
        let item = container.getData('item')
        item.onDragEnd(pointer)
      }
    }, this)
  }

  folderHandle (event) {
    switch(event.type) {
      case 'changeLayout':
        this.frontpage.loadLayout(event.layout)
      break
    }
  }
}

export {
  EditScene
}
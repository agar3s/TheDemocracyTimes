import DraggableSprite from './draggableSprite'
import NewsBody from './newsBody'

export default class NewsItem extends DraggableSprite {
  constructor (config, newsData) {
    super(config)

    this.ratio = config.ratio

    let screenBounds = config.screenBounds
    // formats saved local? no me gust
    this.formats = config.formats
    let format = this.formats['clip']

    this.id = newsData.id
    this.headline = newsData.headline
    this.lead = newsData.lead
    this.exclusivity = newsData.exclusivity
    this.popularity = newsData.popularity
    this.relevancy = newsData.relevancy
    this.score = 0

    this.clipDimensions = {
      width: format.width * this.ratio,
      height: format.height * this.ratio,
      headlineFont: format.headlineFont,
      leadFont: format.leadFont,
      columns: format.columns,
      pics: format.pics
    }

    this.getRandomCoords = () => {
      return {
        x: screenBounds.x + (screenBounds.width - format.width * this.ratio)*Math.random(),
        y: screenBounds.y + (screenBounds.height - format.height * this.ratio)*Math.random()
      }
    }

    this.container.x = this.getRandomCoords().x
    this.container.y = this.getRandomCoords().y

    this.body = new NewsBody({
      graphics: this.scene.add.graphics(),
      headline: this.headline
    })
    this.container.add(this.body.graphics)

    this.listeners = []

    this.paperSound = this.scene.sound.add('grabPaperDesktopSound')
    this.paperSound.allowMultiple = true
    this.paperSound.addMarker({name:'0',duration:0.486, start:0})
    this.paperSound.addMarker({name:'1',duration:(0.786-0.595), start:0.595})
    this.paperSound.addMarker({name:'2',duration:(1.322-1.136), start:1.136})
    this.paperSound.addMarker({name:'3',duration:(2.053-1.846), start:1.846}) // me gusta para continue
    this.paperSound.addMarker({name:'4',duration:(2.791-2.660), start:2.660})
    this.paperSound.addMarker({name:'5',duration:(3.091-2.834), start:2.834})
    this.paperSound.addMarker({name:'6',duration:(3.424-3.233), start:3.233})
    this.draw()
  }


  draw () {
    super.draw()
    if(!this.body) return

    this.graphics.clear()

    this.graphics.lineStyle(1, 0xc69d7f, 1)
    this.graphics.fillStyle(0xffe1cb, 1)
    //this.graphics.fillStyle(0xe7d1a8, 1)
    let paddingNews = {x: 0.02, y: 0.01}
    this.graphics.fillRect(0, 0, this.clipDimensions.width, this.clipDimensions.height)
    this.graphics.strokeRect(
      0,
      0,
      this.clipDimensions.width,
      this.clipDimensions.height
    )

    this.headlineBitmap = NewsItem.WrapBitmapText(
      this.scene,
      this.clipDimensions.width / 2,
      this.ratio*0.05,
      this.clipDimensions.headlineFont,
      this.headline,
      this.clipDimensions.width - this.ratio*paddingNews.x*3
    )
    this.headlineBitmap.setOrigin(0.5, 0)
    this.headlineBitmap.setTint(0x3a1a01)

    this.leadBitmap = NewsItem.WrapBitmapText(
      this.scene,
      this.clipDimensions.width / 2,
      this.ratio*0.1 + this.headlineBitmap.height,
      this.clipDimensions.leadFont,
      this.lead,
      this.clipDimensions.width - this.ratio*paddingNews.x*3
    )
    this.leadBitmap.setOrigin(0.5, 0)
    this.leadBitmap.setTint(0x502709)

    this.container.add(this.headlineBitmap)
    this.container.add(this.leadBitmap)

    this.body.setupBounds({
      y: this.headlineBitmap.height + this.leadBitmap.height + this.ratio*0.15,
      width: this.clipDimensions.width,
      height: this.clipDimensions.height,
      pics: this.clipDimensions.pics
    })
    this.body.draw(this.clipDimensions.columns)
  }


  resetPosition() {
    this.fitTo()
    let coords = this.getRandomCoords()
    this.container.x = coords.x
    this.container.y = coords.y
  }

  fitTo (space, i) {
    if(this.layoutIndex === i) return 
    let format = {}
    let rectangle = {}
    if (!space) {
      rectangle = {}
      rectangle.x = this.container.x
      rectangle.y = this.container.y
      format = this.formats['clip']
      this.score = 0
    } else {
      format = this.formats[space.format]
      rectangle = space.rect
      this.score = space.score
    }
    this.notifyRemoved()
    this.layoutIndex = i
    this.container.input.hitArea = new Phaser.Geom.Rectangle(0, 0, format.width * this.ratio, format.height * this.ratio)
    this.container.x = rectangle.x
    this.container.y = rectangle.y
    this.clipDimensions.width = format.width * this.ratio
    this.clipDimensions.height = format.height * this.ratio
    this.clipDimensions.headlineFont = format.headlineFont
    this.clipDimensions.leadFont = format.leadFont
    this.clipDimensions.columns = format.columns
    this.clipDimensions.pics = format.pics
    this.width = this.clipDimensions.width
    this.height = this.clipDimensions.height
    this.headlineBitmap.destroy()
    this.leadBitmap.destroy()
    this.draw()
  }


  /**
  * when a newsItem is removed from layout
  */
  addOnRemove (listener) {
    this.listeners.push(listener)
  }

  /**
  adds and remove listener
  */
  notifyRemoved() {
    for (var i = this.listeners.length - 1; i >=0 ; i--) {
      this.listeners.splice(i, 1)[0]()
    }
  }

  onDragStart(pointer) {
    super.onDragStart(pointer)
    let number = ~~(Math.random()*7)
    this.paperSound.play(`${number}`)
  }

  onDrag(pointer, dragX, dragY) {
    super.onDrag(pointer, dragX, dragY)
    let mainCamera = this.scene.cameras.main
    let inside = this.scene.frontpage.checkItem({
      x: pointer.x + mainCamera.scrollX,
      y: pointer.y + mainCamera.scrollY
    })
    if (inside) {
      this.container.setAlpha(0.8)
      this.container.drawShadow(0.3)
    } else {
      this.container.setAlpha(1)
      this.container.drawShadow(0.4)
    }
  }

  onDragEnd (pointer) {
    super.onDragEnd(pointer)
    this.scene.frontpage.attachItem(this)
    this.container.setAlpha(1)
  }
  
  static WrapBitmapText (scene, x, y, font, text, maxWidth) {
    let words = text.split(' ')
    let finalText = ''
    let textBitmap = scene.add.bitmapText(x, y, font, '')
    for (var i = 0; i < words.length; i++) {
      let temp = finalText + words[i]
      textBitmap.setText(temp)
      if (textBitmap.width > maxWidth) {
        temp = finalText.trim() + '\n' + words[i]
      }
      if (i< words.length-1) {
        temp += ' '
      }
      finalText = temp
    }
    textBitmap.setText(finalText)
    return textBitmap
  }
}


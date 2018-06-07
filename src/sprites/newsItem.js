
import NewsBody from './newsBody'

export default class NewsItem {
  constructor (config, newsData) {
    this.scene = config.scene
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
        x: screenBounds.paddingLateral + screenBounds.width/2 + ~~((screenBounds.width/2 -screenBounds.paddingLateral - this.clipDimensions.width)*Math.random()),
        y: screenBounds.paddingVertical + ~~((screenBounds.height - this.clipDimensions.height)*Math.random())
      }
    }
    this.geometry = new Phaser.Geom.Rectangle(
      this.getRandomCoords().x, this.getRandomCoords().y,
      format.width * this.ratio,
      format.height * this.ratio
    )

    this.container = this.scene.add.container(this.geometry.width, this.geometry.height)
    this.container.setData('type', 'newsitem')
    this.container.setData('item', this)
    this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.geometry.width, this.geometry.height), Phaser.Geom.Rectangle.Contains)
    this.scene.input.setDraggable(this.container)

    this.shadow = this.scene.add.graphics()
    this.shadow.setAlpha(0)
    this.graphics = this.scene.add.graphics()
    this.container.add(this.shadow)
    this.container.add(this.graphics)
    this.container.x = this.geometry.x
    this.container.y = this.geometry.y

    this.body = new NewsBody({
      graphics: this.scene.add.graphics(),
      headline: this.headline
    })
    this.container.add(this.body.graphics)

    this.listeners = []

    this.drawClip()

    this.container.drawShadow = (alpha) => {
      this.shadow.setAlpha(alpha)
    }
  }


  drawClip () {
    this.shadow.clear()
    this.shadow.fillStyle(0x0, 1)
    this.shadow.fillRect(10, 10, this.clipDimensions.width, this.clipDimensions.height)
    
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

  update() {

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
    this.geometry = rectangle
    this.container.input.hitArea = new Phaser.Geom.Rectangle(0, 0, format.width * this.ratio, format.height * this.ratio)
    this.container.x = rectangle.x
    this.container.y = rectangle.y
    this.clipDimensions.width = format.width * this.ratio
    this.clipDimensions.height = format.height * this.ratio
    this.clipDimensions.headlineFont = format.headlineFont
    this.clipDimensions.leadFont = format.leadFont
    this.clipDimensions.columns = format.columns
    this.clipDimensions.pics = format.pics
    this.headlineBitmap.destroy()
    this.leadBitmap.destroy()
    this.drawClip()
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


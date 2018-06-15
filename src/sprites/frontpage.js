
export default class Frontpage {
  constructor (config) {
    this.scene = config.scene
    this.x = config.x
    this.y = config.y
    let screenBounds = config.screenBounds
    this.layouts = config.layouts
    // check layout
    var graphics = this.scene.add.graphics()
    graphics.lineStyle(1, 0xc69d7f, 1)
    graphics.fillStyle(0x111111, 1)
    
    let width = 3
    let height = 4
    this.header = 0.4
    this.ratio = (screenBounds.height - screenBounds.paddingVertical*2)/5

    this.x -= width * this.ratio + 20

    // front page
    graphics.fillStyle(0xffe1cb, 1)
    //graphics.fillStyle(0xe7d1a8, 1)
    graphics.fillRect(this.x-10, this.y-10, width * this.ratio + 20, (height + this.header) * this.ratio + 20)
    graphics.strokeRect(this.x, this.y, width * this.ratio, (height + this.header) * this.ratio)
    
    // this.header
    let logo = this.scene.add.sprite(this.x+width*this.ratio*0.5, this.y + 5, 'head')
    logo.setOrigin(0.5, 0)
    let widthScale = ((width*0.6)*this.ratio)/255
    logo.setScale(widthScale)
    logo.setTint(0x5f3618)
    graphics.beginPath()
    graphics.moveTo(this.x, this.y+this.header*this.ratio - this.ratio/14)
    graphics.lineTo(width*this.ratio + this.x, this.y+this.header*this.ratio - this.ratio/14)
    graphics.moveTo(this.x, this.y+this.header*this.ratio - this.ratio/35)
    graphics.lineTo(width*this.ratio + this.x, this.y+this.header*this.ratio - this.ratio/35)
    graphics.strokePath()


    // grid layout
    this.newsAttached = 0
    graphics.lineStyle(0.5, 0x226622, 0.08)
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 6; i++) {
        graphics.strokeRect(this.x + i*this.ratio*0.5, this.y + (j+this.header*2)*this.ratio*0.5, this.ratio*0.5, this.ratio*0.5)
      }
    }

    // specific layout
    this.newspaces = []
    this.layoutGraphics = this.scene.add.graphics()

    let layoutOptions = config.availableLayouts
    this.setLayoutOptions(layoutOptions)
    this.loadLayout(layoutOptions[0])

  }

  setLayoutOptions (options) {
    this.layoutButtons = []
    for (var i = 0; i < options.length; i++) {
      let key = options[i]
      let button = this.scene.add.sprite(70, 100 + i*120, `layout${key}`)
      button.setScale(0.8)
      button.setAlpha(0.6)
      button.setInteractive()
      button.setData('type', 'button')
      button.setData('selected', false)
      button.setData('onHover', ()=>{
        if (button.getData('selected')) return
        button.setAlpha(0.8).setScale(0.85)
      })
      button.setData('onOut', () => {
        if (button.getData('selected')) return
        button.setAlpha(0.6).setScale(0.8)
      })
      button.setData('onClick', () => {
        if (button.getData('selected')) return
        this.scene.sound.add('turnPaper').play()
        this.loadLayout(key, i)
        for (var i = 0; i < this.layoutButtons.length; i++) {
          let otherButton = this.layoutButtons[i]
          otherButton.setAlpha(0.6).setScale(0.8)
          otherButton.setData('selected', false)
        }
        button.setScale(0.9).setAlpha(1)
        button.setData('selected', true)
      })
      this.layoutButtons.push(button)
    }
  }


  loadLayout(key) {
    this.layout = this.layouts[key]
    this.layoutButtons.forEach((button) => {
      if(button.texture.key!==`layout${key}`) return
      button.setScale(0.9).setAlpha(1).setData('selected', true)
    })

    // if newspaces is not empty save the newsItemContainer
    let oldNews = this.newspaces.map((space) => {
      let newsItemContainer = space.filled
      if(!newsItemContainer) return
      newsItemContainer.resetPosition()
      return newsItemContainer
    })

    this.newspaces = []
    for (var i = 0; i < this.layout.length; i++) {
      let clip = this.layout[i]
      let space = {
        rect: new Phaser.Geom.Rectangle(
          this.x + clip.i*this.ratio,
          this.y + (clip.j+this.header)*this.ratio,
          clip.w*this.ratio,
          clip.h*this.ratio
        ),
        hover: false,
        filled: undefined,
        format: `${clip.w}x${clip.h}`,
        relevancy: clip.rel,
        exclusivity: clip.exc,
        popularity: clip.pop,
        score: clip.score
      }
      this.newspaces.push(space)
    }
    this.drawLayout()

    // fit the old news if possible into new layout
    oldNews = oldNews.filter((element)=>!!element)
    for (var i = 0; i < this.newspaces.length && i<oldNews.length; i++) {
      let newsItemContainer = oldNews[i]
      let space = this.newspaces[i]
      newsItemContainer.fitTo(space, i)
      newsItemContainer.addOnRemove(() => {
        this.setNewsAttached(this.newsAttached - 1)
        delete space.filled
      })
      space.filled = newsItemContainer
    }
    this.setNewsAttached(i)
  }

  checkItem (point) {
    let inside = false
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      space.hover = false

      if (space.rect.contains(point.x, point.y)) {
        space.hover = true
        inside = true
      }
    }
    this.drawLayout()
    return inside
  }

  drawLayout () {
    this.layoutGraphics.clear()
    let drawOnTop = {x:0, y:0, width:0, height:0}
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      let rect = space.rect
      if (space.hover) {
        drawOnTop = rect
      }
      this.layoutGraphics.lineStyle(1, 0x502709, 1)
      this.layoutGraphics.strokeRect(rect.x, rect.y, rect.width, rect.height)
    }
    this.layoutGraphics.lineStyle(2, 0xffffff, 1)
    this.layoutGraphics.strokeRect(drawOnTop.x+2, drawOnTop.y+2, drawOnTop.width-4, drawOnTop.height-4)
  }

  attachItem (newsItemContainer) {
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      if (space.hover && !space.filled) {
        newsItemContainer.fitTo(space, i)
        newsItemContainer.addOnRemove(() => {
          this.setNewsAttached(this.newsAttached - 1)
          delete space.filled
        })
        space.filled = newsItemContainer
        this.setNewsAttached(this.newsAttached + 1)
        return
      }
    }
    newsItemContainer.fitTo()
  }

  setNewsAttached(value) {
    this.newsAttached = value
    if (this.newsAttached === this.newspaces.length) {
      this.scene.next.setAlpha(1)
      this.calculateStats()
    } else {
      this.scene.next.setAlpha(0)
    }
  }

  calculateStats() {
    let total = 0
    let exc = 0
    let pop = 0
    let rel = 0
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      if (space.filled) {
        exc += space.filled.exclusivity * space.exclusivity
        pop += space.filled.popularity * space.popularity
        rel += space.filled.relevancy * space.relevancy
      }
    }
    total = exc + rel + pop
    return {
      exclusivity: exc,
      relevancy: rel,
      popularity: pop
    }
  }


  update () {

  }
}
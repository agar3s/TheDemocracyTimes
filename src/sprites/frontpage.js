import DraggableSprite from './draggableSprite'

export default class Frontpage extends DraggableSprite {
  constructor (config) {
    super(config)

    let screenBounds = config.screenBounds
    this.layouts = config.layouts
    
    // check layout
    //var graphics = this.scene.add.graphics()
    this.graphics.lineStyle(1, 0xc69d7f, 1)
    //graphics.fillStyle(0x111111, 1)
    
    let width = 3
    let height = 4
    this.header = 0.4
    this.ratio = (screenBounds.height - screenBounds.paddingVertical*2)/5

    this.x -= width * this.ratio + 20

    // front page
    this.graphics.fillStyle(0xffe1cb, 1)
    //graphics.fillStyle(0xe7d1a8, 1)
    this.graphics.fillRect(0, 0, width * this.ratio + 20, (height + this.header) * this.ratio + 20)
    this.graphics.strokeRect(10, 10, width * this.ratio, (height + this.header) * this.ratio)
    
    // this.header
    let logo = this.scene.add.sprite(10+width*this.ratio*0.5, 15, 'head')
    logo.setOrigin(0.5, 0)
    let widthScale = ((width*0.6)*this.ratio)/255
    logo.setScale(widthScale)
    logo.setTint(0x5f3618)
    this.container.add(logo)

    this.graphics.beginPath()
    this.graphics.moveTo(10, 10+this.header*this.ratio - this.ratio/14)
    this.graphics.lineTo(width*this.ratio + 10, 10+this.header*this.ratio - this.ratio/14)
    this.graphics.moveTo(10, 10+this.header*this.ratio - this.ratio/35)
    this.graphics.lineTo(width*this.ratio + 10, 10+this.header*this.ratio - this.ratio/35)
    this.graphics.strokePath()


    // grid layout
    this.newsAttached = 0
    this.graphics.lineStyle(0.5, 0x226622, 0.08)
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 6; i++) {
        this.graphics.strokeRect(10 + i*this.ratio*0.5, 10 + (j+this.header*2)*this.ratio*0.5, this.ratio*0.5, this.ratio*0.5)
      }
    }

    // specific layout
    this.newspaces = []
    this.layoutGraphics = this.scene.add.graphics()

    let layoutOptions = config.availableLayouts
    this.currentLayout = ''
    this.loadLayout(layoutOptions[0])

    this.container.add(this.layoutGraphics)
  }


  loadLayout(key) {
    if(key == this.currentLayout) return
    this.currentLayout = key
    this.layout = this.layouts[this.currentLayout]

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
          this.container.x + clip.i*this.ratio+10,
          this.container.y + (clip.j+this.header)*this.ratio+10,
          clip.w*this.ratio,
          clip.h*this.ratio
        ),
        relativeCoords: {
          x: clip.i*this.ratio+10,
          y: (clip.j+this.header)*this.ratio+10,
        },
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

  onDragStart (pointer) {
    super.onDragStart(pointer)
    this.newspaces.forEach((space) => {
      let newsItemContainer = space.filled
      if(!newsItemContainer) return
      newsItemContainer.container.x -=2
      newsItemContainer.container.y -=2
      this.scene.children.bringToTop(newsItemContainer.container)
    })
  }

  onDrag(pointer, dragX, dragY) {
    super.onDrag(pointer, dragX, dragY)
    this.newspaces.forEach((space) => {
      let newsItemContainer = space.filled
      if(!newsItemContainer) return
      
      newsItemContainer.container.x = this.container.x+space.relativeCoords.x
      newsItemContainer.container.y = this.container.y+space.relativeCoords.y
    })
  }

  onDragEnd(pointer) {
    super.onDragEnd(pointer)
    for (var i = 0; i < this.layout.length; i++) {
      let space = this.newspaces[i]
      let clip = this.layout[i]
      space.rect.x = this.container.x + clip.i*this.ratio + 10
      space.rect.y = this.container.y + (clip.j+this.header)*this.ratio + 10
      let newsItemContainer = space.filled
      if(!newsItemContainer) continue
      newsItemContainer.container.x +=2
      newsItemContainer.container.y +=2 
    }
    this.drawLayout()
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
      this.layoutGraphics.strokeRect(rect.x-this.container.x, rect.y-this.container.y, rect.width, rect.height)
    }
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

export default class Frontpage {
  constructor (config) {
    this.scene = config.scene
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

    this.paddingTop = ((screenBounds.height - screenBounds.paddingVertical*2) - (height + this.header) * this.ratio)/2 + screenBounds.paddingVertical
    this.paddingLeft = (screenBounds.width - screenBounds.paddingLateral)/2 - (width * this.ratio)
    this.paddingTop = ~~this.paddingTop
    this.paddingLeft = ~~this.paddingLeft

    // front page
    graphics.fillStyle(0xffe1cb, 1)
    //graphics.fillStyle(0xe7d1a8, 1)
    graphics.fillRect(this.paddingLeft-10, this.paddingTop-10, width * this.ratio + 20, (height + this.header) * this.ratio + 20)
    graphics.strokeRect(this.paddingLeft, this.paddingTop, width * this.ratio, (height + this.header) * this.ratio)
    
    // this.header
    let logo = this.scene.add.sprite(this.paddingLeft+width*this.ratio*0.5, this.paddingTop + 5, 'head')
    logo.setOrigin(0.5, 0)
    let widthScale = ((width*0.6)*this.ratio)/255
    logo.setScale(widthScale)
    logo.setTint(0x5f3618)
    graphics.beginPath()
    graphics.moveTo(this.paddingLeft, this.paddingTop+this.header*this.ratio - this.ratio/14)
    graphics.lineTo(width*this.ratio + this.paddingLeft, this.paddingTop+this.header*this.ratio - this.ratio/14)
    graphics.moveTo(this.paddingLeft, this.paddingTop+this.header*this.ratio - this.ratio/35)
    graphics.lineTo(width*this.ratio + this.paddingLeft, this.paddingTop+this.header*this.ratio - this.ratio/35)
    graphics.strokePath()


    // grid layout
    graphics.lineStyle(0.5, 0x226622, 0.08)
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 6; i++) {
        graphics.strokeRect(this.paddingLeft + i*this.ratio*0.5, this.paddingTop + (j+this.header*2)*this.ratio*0.5, this.ratio*0.5, this.ratio*0.5)
      }
    }

    // specific layout
    this.newspaces = []
    this.layoutGraphics = this.scene.add.graphics()

    let layoutOptions = ['01', '02', '03', '04', '05']
    this.setLayoutOptions(layoutOptions)
    this.loadLayout('02')

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
          this.paddingLeft + clip.i*this.ratio,
          this.paddingTop + (clip.j+this.header)*this.ratio,
          clip.w*this.ratio,
          clip.h*this.ratio
        ),
        hover: false,
        filled: undefined,
        format: `${clip.w}x${clip.h}`
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
        delete space.filled
      })
      space.filled = newsItemContainer
    }

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
          delete space.filled
        })
        space.filled = newsItemContainer
        return
      }
    }
    newsItemContainer.fitTo()
  }




  update () {

  }
}

export default class Frontpage {
  constructor (config) {
    let scene = config.scene
    let screenBounds = config.screenBounds
    // check layout
    var graphics = scene.add.graphics()
    graphics.lineStyle(1, 0xc69d7f, 1)
    graphics.fillStyle(0x111111, 1)
    
    let width = 3
    let height = 4
    let header = 0.4
    let ratio = (screenBounds.height - screenBounds.paddingVertical*2)/5

    let paddingTop = ((screenBounds.height - screenBounds.paddingVertical*2) - (height + header) * ratio)/2 + screenBounds.paddingVertical
    let paddingLeft = (screenBounds.width - screenBounds.paddingLateral)/2 - (width * ratio)
    paddingTop = ~~paddingTop
    paddingLeft = ~~paddingLeft

    // front page
    graphics.fillStyle(0xffe1cb, 1)
    //graphics.fillStyle(0xe7d1a8, 1)
    graphics.fillRect(paddingLeft-10, paddingTop-10, width * ratio + 20, (height + header) * ratio + 20)
    graphics.strokeRect(paddingLeft, paddingTop, width * ratio, (height + header) * ratio)
    
    // header
    let logo = scene.add.sprite(paddingLeft+width*ratio*0.5, paddingTop + 5, 'head')
    logo.setOrigin(0.5, 0)
    let widthScale = ((width*0.6)*ratio)/255
    logo.setScale(widthScale)
    logo.setTint(0x5f3618)
    graphics.beginPath()
    graphics.moveTo(paddingLeft, paddingTop+header*ratio - ratio/14)
    graphics.lineTo(width*ratio + paddingLeft, paddingTop+header*ratio - ratio/14)
    graphics.moveTo(paddingLeft, paddingTop+header*ratio - ratio/35)
    graphics.lineTo(width*ratio + paddingLeft, paddingTop+header*ratio - ratio/35)
    graphics.strokePath()


    // grid layout
    graphics.lineStyle(0.5, 0x226622, 0.05)
    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 6; i++) {
        graphics.strokeRect(paddingLeft + i*ratio*0.5, paddingTop + (j+header*2)*ratio*0.5, ratio*0.5, ratio*0.5)
      }
    }

    // specific layout
    this.layout = [
      {i: 0, j: 0, w: 2, h: 2.5},
      {i: 2, j: 0, w: 1, h: 2.5},
      {i: 0, j: 2.5, w: 2, h: 1.5},
      {i: 2, j: 2.5, w: 1, h: 1.5}
    ]
    this.newspaces = []
    this.layoutGraphics = scene.add.graphics()
    for (var i = 0; i < this.layout.length; i++) {
      let clip = this.layout[i]
      let space = {
        rect: new Phaser.Geom.Rectangle(
          paddingLeft + clip.i*ratio,
          paddingTop + (clip.j+header)*ratio,
          clip.w*ratio,
          clip.h*ratio
        ),
        hover: false,
        filled: false,
        format: `${clip.w}x${clip.h}`
      }
      this.newspaces.push(space)
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
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      if (space.hover) {
        this.layoutGraphics.lineStyle(2, 0xffffff, 1)
      } else {
        this.layoutGraphics.lineStyle(1, 0xebc2a4, 0.4)
      }
      let rect = space.rect
      this.layoutGraphics.strokeRect(rect.x, rect.y, rect.width, rect.height)
    }
  }

  attachItem (newsItemContainer) {
    for (var i = 0; i < this.newspaces.length; i++) {
      let space = this.newspaces[i]
      if (space.hover && !space.filled) {
        newsItemContainer.fitTo(space, i)
        newsItemContainer.addOnRemove(() => {
          space.filled = false
        })
        space.filled = true
        return
      }
    }
    newsItemContainer.fitTo()
  }


  update () {

  }
}
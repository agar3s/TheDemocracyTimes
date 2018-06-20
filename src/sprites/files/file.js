import NewsItem from '../newsitem'

export default class File {
  constructor (config) {
    this.scene = config.scene
    this.x = config.x + ~~(Math.random()*10)
    this.y = config.y + ~~(Math.random()*10)
    this.index = config.index

    this.width = config.width
    this.height = config.height
    this.graphics = this.scene.add.graphics()
    this.container = this.scene.add.container(this.width, this.height)
    this.container.x = this.x
    this.container.y = this.y
    this.container.add(this.graphics)

    this.parent = config.parent
    this.parent.container.add(this.container)
    this.draw()
  }

  draw() {
    this.graphics.clear()
    this.graphics.lineStyle(2, 0xc69d7f, 1)
    this.graphics.fillStyle(0xffe1cb, 1)
    this.graphics.fillRect(0, 0, this.width-30, this.height-30)
    this.graphics.strokeRect(0, 0, this.width-30, this.height-30)

    this.graphics.beginPath()
    this.graphics.moveTo(this.width-30, this.height-60)
    this.graphics.lineTo(this.width-60, this.height-30)
    this.graphics.lineTo(this.width-60, this.height-60)
    this.graphics.lineTo(this.width-30, this.height-60)
    this.graphics.closePath()
    this.graphics.strokePath()
  }

  addInteractiveObject(gameObject, onClickData) {
    gameObject.setInteractive(new Phaser.Geom.Rectangle(0, 0, gameObject.width, gameObject.height), Phaser.Geom.Rectangle.Contains)

    gameObject.setData('type', 'button')
    gameObject.setData('onClick', () => {
      this.parent.notifyEvent(onClickData)
    })
    gameObject.setData('onHover', () => {})
    gameObject.setData('onOut', () => {})

    // debug
    this.graphics.fillStyle(0xc69d7f,0.4)
    this.graphics.fillRect(gameObject.x-gameObject.width/2-this.x, gameObject.y-this.y, gameObject.width, gameObject.height)
    // end debug

    this.parent.addToInteractiveLayer(this.index, gameObject)
  }
}
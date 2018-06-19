import NewsItem from '../sprites/newsitem'

export default class File {
  constructor (config) {
    this.scene = config.scene
    this.x = config.x
    this.y = config.y

    this.width = config.width
    this.height = config.height
    this.graphics = this.scene.add.graphics()
    this.container = this.scene.add.container(this.width, this.height)
    this.container.x = this.x + ~~(Math.random()*10)
    this.container.y = this.y + ~~(Math.random()*10)
    this.container.angle += (Math.random()-Math.random())*1
    this.container.add(this.graphics)

    this.parent = config.parent
    this.parent.add(this.container)
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

  addNextPage() {
    let pageButton = this.scene.add.container(30, 30)
    pageButton.x = this.width-60
    pageButton.y = this.height-60
    pageButton.setInteractive(new Phaser.Geom.Rectangle(this.x,this.y,30,30), Phaser.Geom.Rectangle.Contains)
    pageButton.setData('type', 'button')
    pageButton.setData('onClick', ()=>{
      console.log('onClick')
    })
    pageButton.setData('onHover', ()=>{})
    pageButton.setData('onOut', ()=>{})

    let debug = this.scene.add.graphics()
    debug.fillStyle(0,1)
    debug.fillRect(this.x,this.y,30,30)
    pageButton.add(debug)
    this.parent.add(pageButton)
  }
}
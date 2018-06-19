
export default class DraggableSprite {
  constructor (config) {
    this.scene = config.scene
    this.x = config.x
    this.y = config.y

    this.width = config.width
    this.height = config.height
    this.type = config.type

    this.container = this.scene.add.container(this.width, this.height)
    this.container.x = this.x
    this.container.y = this.y
    this.container.setData('item', this)
    this.container.setData('type', this.type)
    this.container.setData('draggable', true)
    this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains)
    this.scene.input.setDraggable(this.container)
    
    this.shadow = this.scene.add.graphics()
    this.shadow.setAlpha(0)
    this.graphics = this.scene.add.graphics()
    this.container.add(this.shadow)
    this.container.add(this.graphics)

    this.container.drawShadow = (alpha) => {
      this.shadow.setAlpha(alpha)
    }
    this.draw()
  }

  update (dt) {}

  drawShadow () {
    this.shadow.clear()
    this.shadow.fillStyle(0x0, 1)
    this.shadow.fillRect(10, 10, this.width, this.height)
  }

  draw () {
    this.drawShadow()
  }

  onDragStart (pointer) {
    this.scene.children.bringToTop(this.container)
    this.container.x -= 2
    this.container.y -= 2
    this.container.drawShadow(0.4)
  }

  onDrag (pointer, dragX, dragY) {
    this.container.x = dragX - 2
    this.container.y = dragY - 2
  }

  onDragEnd (pointer) {
    this.container.drawShadow(0)
    this.container.x += 2
    this.container.y += 2
  }
}
import DraggableSprite from './draggableSprite'
import File from './file'

export default class Folder extends DraggableSprite {
  constructor (config) {
    super(config)
    let image = this.scene.add.sprite(0, 0, 'folder1').setOrigin(0).setScale(1.8)
    //this.graphics.fillRect(0, 0, this.width, this.height)
    this.container.add(image)
    this.container.setData('onClick', this.onClick)

    // add file
    this.files = []
    this.addFile({})
    this.addFile({})
    this.addFile({})
    this.addFile({})
    this.addFile({})
    this.fileIndex = 0
    
    this.addNextPage()
    this.moveToFile(0)

  }

  onClick() {
    console.log('click me!')
  }

  addFile (props) {
    let file = new File({
      scene: this.scene,
      x: 10,
      y: 10,
      width: this.width,
      height: this.height,
      parent: this.container,
      index: this.files.length,
      props: props
    })
    this.files.push(file)
    console.log(this.container)
  }

  addNextPage() {
    this.nextPageButton = this.scene.add.container(30, 30)
    this.nextPageButton.x = this.width-60
    this.nextPageButton.y = this.height-60
    this.nextPageButton.setInteractive(new Phaser.Geom.Rectangle(10,10,30,30), Phaser.Geom.Rectangle.Contains)
    this.nextPageButton.setData('type', 'button')
    this.nextPageButton.setData('onClick', ()=>{
      if((++this.fileIndex)>=this.files.length) {
        this.fileIndex = 0
      }
      this.moveToFile(this.fileIndex)
    })
    this.nextPageButton.setData('onHover', ()=>{})
    this.nextPageButton.setData('onOut', ()=>{})

    this.container.add(this.nextPageButton)
  }

  moveToFile(index) {
    this.container.bringToTop(this.files[index].container)
    this.container.bringToTop(this.nextPageButton)
  }
}

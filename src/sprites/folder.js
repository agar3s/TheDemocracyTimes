import DraggableSprite from './draggableSprite'
import File from './files/file'
import LayoutFile from './files/layoutFile'

export default class Folder extends DraggableSprite {
  constructor (config) {
    super(config)
    let image = this.scene.add.sprite(0, 0, 'folder1').setOrigin(0).setScale(1.8)
    this.container.add(image)
    this.listeners = []

    this.interactiveObjects = {'always': []}
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

  addFile (props) {
    let pageIndex = this.files.length
    this.interactiveObjects[`${pageIndex}`] = []

    let file = new LayoutFile({
      scene: this.scene,
      x: 10,
      y: 10,
      width: this.width,
      height: this.height,
      parent: this,
      index: pageIndex,
      props: props
    })
    this.files.push(file)
  }

  addNextPage() {
    this.nextPageButton = this.scene.add.container(30, 30)
    this.nextPageButton.x = this.width-60
    this.nextPageButton.y = this.height-60
    this.nextPageButton.setInteractive(new Phaser.Geom.Rectangle(10,10,30,30), Phaser.Geom.Rectangle.Contains)
    this.nextPageButton.setData('type', 'button')
    this.nextPageButton.setData('onClick', ()=>{
      this.hideFile(this.fileIndex)
      if((++this.fileIndex)>=this.files.length) {
        this.fileIndex = 0
      }
      this.moveToFile(this.fileIndex)
    })
    this.nextPageButton.setData('onHover', ()=>{})
    this.nextPageButton.setData('onOut', ()=>{})
    this.addToInteractiveLayer('always', this.nextPageButton)
  }

  moveToFile(index) {
    this.container.bringToTop(this.files[index].container)

    this.interactiveObjects[`${index}`].forEach((gameObject) => {
      gameObject.setAlpha(1)
      this.container.bringToTop(gameObject)
    })
    this.interactiveObjects['always'].forEach((gameObject) => {
      this.container.bringToTop(gameObject)
    })
  }

  hideFile(index) {
    this.interactiveObjects[`${index}`].forEach((gameObject) => {
      gameObject.setAlpha(0)
    })
  }

  addToInteractiveLayer(pageIndex, gameObject) {
    if(pageIndex!='always'){
      gameObject.setAlpha(0)
    }
    this.interactiveObjects[`${pageIndex}`].push(gameObject)
    this.container.add(gameObject)
  }

  addInteractionListener(listener) {
    this.listeners.push(listener)
  }

  notifyEvent (data) {
    this.listeners.forEach((listener)=>{
      listener(data)
    })
  }
}

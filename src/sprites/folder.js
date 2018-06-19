import DraggableSprite from './draggableSprite'

export default class Folder extends DraggableSprite {
  constructor (config) {
    super(config)
    let image = this.scene.add.sprite(0, 0, 'folder1').setOrigin(0)

    this.container.add(image)
  }
}
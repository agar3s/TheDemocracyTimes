import NewsItem from '../newsitem'
import File from './file'

export default class LayoutFile extends File {
  constructor (config) {
    super(config)


    // title
    let title = NewsItem.WrapBitmapText(
      this.scene,
      this.width/2,
      10,
      'na22',
      `Frontpage template\n      Layout ${'ABCDEF'[config.index]}`,
      this.width-20
    )
    title.setOrigin(0.5, 0)
    title.setTint(0x3a1a01)
    // image
    let image = this.scene.add.sprite(20, 70, `layout0${config.index + 1}`).setOrigin(0)

    // text

    // button
    let setLayout = NewsItem.WrapBitmapText(
      this.scene,
      this.width/2 + this.x,
      this.height - 30 - 50 + this.y,
      'na18',
      'apply template: ' + config.index,
      this.width-20
    )
    setLayout.setOrigin(0.5, 0)
    setLayout.setTint(0x3a1a01)

    this.container.add(title)
    this.container.add(image)

    this.addInteractiveObject(setLayout, {
      type: 'changeLayout',
      layout: `0${this.index + 1}`
    })
  }
}
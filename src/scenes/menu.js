import GeneralScene from './scene.js'


class MenuScene extends GeneralScene {
  constructor () {
    super({key: 'menuScene'})
    this.background = 0xffe1cb
  }

  create () {
    super.create()


    let logo = this.add.sprite(640, 240, 'head')
    logo.setOrigin(0.5, 0.5)
    logo.setScale(4)
    logo.setTint(0x62391b)


    let start = this.createButton({
      x: 640,
      y: 450,
      font: 'na28',
      text: 'Start',
      onClick: () => {
        this.changeToScene('cinematicScene')
      },
      hoverColor: 0xc69d7f,
      scale: 1.6
    })

    let language = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Language',
      onClick: () => {
      },
      hoverColor: 0xc69d7f,
      scale: 1.6
    })

  }

  update () {

  }

}
export {
  MenuScene
}
import GeneralScene from './scene.js'

class PublishScene extends GeneralScene {
  constructor () {
    super({key: 'publishScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Continue',
      onClick: () => {
        this.changeToScene('monologueScene')
      },
      scale: 1.4
    })
  }

  update () {

  }

}
export {
  PublishScene
}
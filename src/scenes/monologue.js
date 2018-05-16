import GeneralScene from './scene.js'

class MonologueScene extends GeneralScene {
  constructor () {
    super({key: 'monologueScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Continue',
      onClick: () => {
        this.changeToScene('officeScene')
      },
      scale: 1.4
    })
    console.log(this.cameras.main)

    this.cameras.main.fadeIn(350)
  }

  update () {

  }

  destroy() {
    console.log('destroy this scene')
  }
  shutdown () {
    console.log('shutdown this scene')
  }

}
export {
  MonologueScene
}
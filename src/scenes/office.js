import GeneralScene from './scene.js'

class OfficeScene extends GeneralScene {
  constructor () {
    super({key: 'officeScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: 'Continue',
      onClick: () => {
        this.changeToScene('editScene')
      },
      scale: 1.4
    })
  }

  update () {

  }

}
export {
  OfficeScene
}
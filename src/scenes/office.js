import GeneralScene from './scene.js'

import DialogueDisplay from '../sprites/dialogueDisplay'

class OfficeScene extends GeneralScene {
  constructor () {
    super({key: 'officeScene'})
  }

  create () {
    super.create()

    let background = this.add.sprite(this.screenBounds.width/2, this.screenBounds.height/2, 'office')
    background.setScale(4)

    this.next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Continue to edit',
      onClick: () => {
        this.changeToScene('editScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    this.next.setOrigin(1, 1)
    this.next.setAlpha(0)

    let reporter1 = this.add.sprite(86*4, 67*4, 'reporter1')
    reporter1.setScale(4)
    reporter1.setOrigin(0, 0)
    reporter1.setAlpha(0)

    let frank = this.add.sprite(153*4, 28*4, 'frank')
    frank.setScale(4)
    frank.setOrigin(0, 0)
    frank.setAlpha(1)

    let desktop = this.add.sprite(0, this.screenBounds.height, 'desktop')
    desktop.setScale(4)
    desktop.setOrigin(0, 1)


    // dialogue basic system
    this.dialogueData = this.dateManager.getDialogue()
    this.dialogueDisplay = new DialogueDisplay({
      scene: this,
      screenBounds: this.screenBounds,
      dialogueData: this.dialogueData,
      endListener: (key) => {
        console.log(key)
        this.children.bringToTop(this.next)
        this.next.setAlpha(1)
      }
    })

  }


  update () {

  }

  enterCharacter () {
    
  }

}
export {
  OfficeScene
}
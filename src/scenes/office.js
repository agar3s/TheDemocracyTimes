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

    let jhonathan = this.add.sprite(86*4, 67*4, 'jhonatan')
    jhonathan.setScale(4)
    jhonathan.setOrigin(0, 0)
    jhonathan.setAlpha(0)

    let frank = this.add.sprite(153*4, 28*4, 'frank')
    frank.setScale(4)
    frank.setOrigin(0, 0)
    frank.setAlpha(0)

    let charlie = this.add.sprite(153*4, 28*4, 'charlie')
    charlie.setScale(4)
    charlie.setOrigin(0, 0)
    charlie.setAlpha(0)

    let evans = this.add.sprite(140*4, 28*4, 'evans')
    evans.setScale(4)
    evans.setOrigin(0, 0)
    evans.setAlpha(0)

    let desktop = this.add.sprite(0, this.screenBounds.height, 'desktop')
    desktop.setScale(4)
    desktop.setOrigin(0, 1)

    let people = {
      "Frank": frank,
      "Jhon": jhonathan,
      "Jhonatan": jhonathan,
      "Charlie": charlie,
      "Evans": evans
    }
    
    let displayCharacter = undefined

    // dialogue basic system
    this.dialogueData = this.dateManager.getDialogue()
    this.dialogueDisplay = new DialogueDisplay({
      scene: this,
      screenBounds: this.screenBounds,
      dialogueData: this.dialogueData,
      endListener: (key) => {
        this.children.bringToTop(this.next)
        this.statusManager.setEndDialogue(key)
        this.next.setAlpha(1)
      },
      updateCharacter: (character) => {
        if(displayCharacter) displayCharacter.setAlpha(0)
        displayCharacter = people[character]
        if(displayCharacter) displayCharacter.setAlpha(1)
      }
    })

    this.next = this.createButton({
      x: this.screenBounds.width - this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na28',
      text: this.getText('nextEdit'),
      onClick: () => {
        this.changeToScene('editScene')
      },
      color: 0xc69d7f
    })
    this.next.setOrigin(1, 1)
    this.next.setAlpha(0)

  }


  update () {

  }

  enterCharacter () {
    
  }

}
export {
  OfficeScene
}
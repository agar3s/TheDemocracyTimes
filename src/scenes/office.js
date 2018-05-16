import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

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
    this.dialogueBox = this.add.graphics()
    this.dialogueBox.fillStyle(0x4d2406, 0.9)
    this.dialogueBox.fillRect(
      this.screenBounds.paddingLateral*6,
      this.cameras.main.height*0.7,
      this.screenBounds.width - this.screenBounds.paddingLateral*12,
      150
    )
    this.dialogueLineY = 0
    this.dialogue = this.dateManager.getDialogue()
    this.setDialogue('start')
    
    //

  }

  setDialogue(key) {
    if(!key) {
      this.children.bringToTop(this.next)
      this.next.setAlpha(1)
      return
    }
    this.keyDialogue = key
    this.loadDialogue(`${this.dialogue.character}: ${this.dialogue[this.keyDialogue].text}`)
    this.dialogueLineY = this.dialogueBitmap.y + this.dialogueBitmap.height + 10

    this.answers = this.dialogue[this.keyDialogue].options
    this.answerOptions = []
    this.time.delayedCall(1000, () => {
      this.loadOptions()
    }, [], this)
  }

  loadOptions() {
    for (let i = 0; i < this.answers.length; i++) {
      let answerBox = NewsItem.WrapBitmapText(
        this,
        this.screenBounds.paddingLateral*8,
        this.dialogueLineY,
        'vtt24',
        `> ${this.answers[i].text}`,
        this.screenBounds.width - this.screenBounds.paddingLateral*16
      )
      answerBox.setOrigin(0, 0)
      answerBox.setTint(0xc69d7f)
      answerBox.setData('onClick', () => {
        this.selectOption(this.answers[i])
      })
      answerBox.setData('type', 'button')
      answerBox.setInteractive(new Phaser.Geom.Rectangle(0, 0, answerBox.width, answerBox.height), Phaser.Geom.Rectangle.Contains)
      answerBox.setData('colors', {
        normal: 0xc69d7f,
        hover: 0xffdabd
      })

      this.dialogueLineY += answerBox.height*0.75

      this.answerOptions.push(answerBox)
    }
  }

  selectOption(answerObject) {
    console.log('answer, ', answerObject)
    for (var i = this.answerOptions.length-1; i >= 0; i--) {
      this.answerOptions[i].destroy()
      this.answerOptions.splice(i, 1)
    }
    this.loadDialogue(`${this.dialogue.character}: ${this.dialogue[this.keyDialogue].text}\nBen: ${answerObject.text}`)

    // load a new dialogue if is neccesary
    this.setDialogue(answerObject.then)
  }

  loadDialogue (text) {
    if(this.dialogueBitmap) {
      this.dialogueBitmap.destroy()
    }
    this.dialogueBitmap = NewsItem.WrapBitmapText(
      this,
      this.screenBounds.paddingLateral*8,
      this.cameras.main.height*0.7 + this.screenBounds.paddingLateral,
      'vtt24',
      text,
      this.screenBounds.width - this.screenBounds.paddingLateral*16
    )
    this.dialogueBitmap.setTint(0xc69d7f)
    this.dialogueBitmap.setTint(0xc69d7f)
  }

  update () {

  }

  enterCharacter () {
    
  }

}
export {
  OfficeScene
}
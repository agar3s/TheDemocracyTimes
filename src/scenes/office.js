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

    let next = this.createButton({
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
    next.setOrigin(1, 1)

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

    this.loadDialogue(`Frank: Hi Ben, how is your day?`)

    this.answers = [
      'Not bad, but this story with Mr Mallone is turning complicated.',
      'Ok',
      'Fantastic'
    ]
    this.answerOptions = []
    this.time.delayedCall(1000, () => {
      this.loadOptions()
    }, [], this)
    //

    this.children.bringToTop(next)
  }

  loadOptions() {
    for (let i = 0; i < this.answers.length; i++) {
      let answerBox = NewsItem.WrapBitmapText(
        this,
        this.screenBounds.paddingLateral*8,
        this.cameras.main.height*0.7 + (this.screenBounds.paddingLateral+10) * (i+1) + 25,
        'vtt24',
        `> ${this.answers[i]}`,
        this.cameras.main.width
      )
      answerBox.setOrigin(0, 0)
      answerBox.setTint(0xc69d7f)
      answerBox.setData('onClick', () => {
        this.selectOption(i)
      })
      answerBox.setData('type', 'button')
      answerBox.setInteractive(new Phaser.Geom.Rectangle(0, 0, answerBox.width, answerBox.height), Phaser.Geom.Rectangle.Contains)
      answerBox.setData('colors', {
        normal: 0xc69d7f,
        hover: 0xffdabd
      })

      this.answerOptions.push(answerBox)
    }
  }

  selectOption(optionIndex) {
    console.log('index, ', optionIndex)
    for (var i = this.answerOptions.length-1; i >= 0; i--) {
      this.answerOptions[i].destroy()
      this.answerOptions.splice(i, 1)
    }
    this.loadDialogue(`Frank: Hi Ben, how is your day?\nBen: ${this.answers[optionIndex]}`)
    this.time.delayedCall(2000, () => {
      this.loadDialogue('Frank: I\'m going to the point, the newspaper is not selling well.')
    }, [], this)
  }

  loadDialogue (text) {
    if(this.dialogue) {
      this.dialogue.destroy()
    }
    this.dialogue = NewsItem.WrapBitmapText(
      this,
      this.screenBounds.paddingLateral*8,
      this.cameras.main.height*0.7 + this.screenBounds.paddingLateral,
      'vtt24',
      text,
      this.cameras.main.width
    )
    this.dialogue.setTint(0xc69d7f)
    this.dialogue.setTint(0xc69d7f)
  }

  update () {

  }

  enterCharacter () {
    
  }

}
export {
  OfficeScene
}
import NewsItem from '../sprites/newsItem'

export default class DialogueDisplay {
  constructor (config) {
    this.scene = config.scene
    this.screenBounds = config.screenBounds
    this.dialogueData = config.dialogueData
    this.endListener = config.endListener

    this.graphics = this.scene.add.graphics()
    this.graphics.fillStyle(0x4d2406, 0.9)
    this.graphics.fillRect(
      this.screenBounds.paddingLateral*6,
      this.scene.cameras.main.height*0.7,
      this.screenBounds.width - this.screenBounds.paddingLateral*12,
      150
    )
    this.dialogueLineY = 0

    this.setDialogue('start')
  }

  setDialogue(key) {
    if(!key) {
      this.endListener(this.keyDialogue)
      return
    }

    this.keyDialogue = key
    this.loadDialogue(`${this.dialogueData.character}: ${this.dialogueData[this.keyDialogue].text}`)
    this.dialogueLineY = this.dialogueBitmap.y + this.dialogueBitmap.height + 10

    this.answers = this.dialogueData[this.keyDialogue].options
    this.answerOptions = []
    this.scene.time.delayedCall(1000, () => {
      this.loadOptions()
    }, [], this)
  }

  loadOptions() {
    for (let i = 0; i < this.answers.length; i++) {
      let answerBox = NewsItem.WrapBitmapText(
        this.scene,
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
    for (var i = this.answerOptions.length-1; i >= 0; i--) {
      this.answerOptions[i].destroy()
      this.answerOptions.splice(i, 1)
    }
    this.loadDialogue(`${this.dialogueData.character}: ${this.dialogueData[this.keyDialogue].text}\nBen: ${answerObject.text}`)

    // load a new dialogue if is neccesary
    this.setDialogue(answerObject.then)
  }

  loadDialogue (text) {
    if(this.dialogueBitmap) {
      this.dialogueBitmap.destroy()
    }
    this.dialogueBitmap = NewsItem.WrapBitmapText(
      this.scene,
      this.screenBounds.paddingLateral*8,
      this.scene.cameras.main.height*0.7 + this.screenBounds.paddingLateral,
      'vtt24',
      text,
      this.screenBounds.width - this.screenBounds.paddingLateral*16
    )
    this.dialogueBitmap.setTint(0xc69d7f)
    this.dialogueBitmap.setTint(0xc69d7f)
  }
}
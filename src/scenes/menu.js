import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

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
    try {
      this.backgroundMusic = this.sound.add('amazingBackgroundMusic')
      if(this.backgroundMusic) {

        this.backgroundMusic.play()
        this.backgroundMusic.volume = 0.2
      }
    }catch(exception){
        console.error(exception)
    }

    this.start = this.createButton({
      x: 640,
      y: 450,
      font: 'na28',
      text: this.getText('newgame'),
      onClick: () => {
        this.dateManager.setLanguage(this.translator.languageCode)
        this.startNewGame()
        this.changeToScene('cinematicScene')
      },
      hoverColor: 0xc69d7f,
      scale: 1.6
    })

    let previousState = JSON.parse(localStorage.getItem('democracyTimes-ADVJ18'))
    if (previousState) {
      this.continueG = this.createButton({
        x: 640,
        y: 560,
        font: 'na22',
        text: this.getText('continue', [this.dateManager.getDateStringFor(previousState.date)]),
        onClick: () => {
          this.dateManager.setDate(previousState.date)
          this.dateManager.setLanguage(this.translator.languageCode)
          this.statusManager.setCompanyStats(previousState.companyStats)
          this.changeToScene('monologueScene')
        },
        hoverColor: 0xc69d7f,
        scale: 1.6
      })
      this.continueG.setAlpha(1)
      this.continueG.setData('date', previousState.date)
    }
    let endingState = JSON.parse(localStorage.getItem('democracyTimes-endings-ADVJ18'))
    if(endingState) {
      let total = 0
      Object.keys(endingState).forEach((key)=>{
        if(endingState[key]) total++
      })
      this.summary = NewsItem.WrapBitmapText(
        this,
        this.cameras.main.width/2,
        620,
        'na22',
        this.getText('endings', [total]),
        this.cameras.main.width
      )
      this.summary.setData('endings', total)
      this.summary.setOrigin(0.5, 0.5)
      this.summary.setTint(0x62391b)
    }

    this.language = this.createButton({
      x: 640,
      y: 510,
      font: 'na28',
      text: this.getText('language'),
      onClick: () => {
        this.translator.changeLanguage()
        this.refreshTexts()
      },
      hoverColor: 0xc69d7f,
      scale: 1.6
    })

    let subtitle = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.48,
      'na22',
      'Adventure Game Jam 2018 Version',
      this.cameras.main.width
    )
    subtitle.setOrigin(0.5, 0.5)
    subtitle.setTint(0x62391b)

    this.info = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.9,
      'na16',
      this.getText('autosave'),
      this.cameras.main.width
    )
    this.info.setOrigin(0.5, 1)
    this.info.setTint(0x62391b)

    this.agar3s = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.95,
      'na16',
      this.getText('credits'),
      this.cameras.main.width
    )
    this.agar3s.setOrigin(0.5, 1)
    this.agar3s.setTint(0x62391b)

  }

  update () {

  }

  startNewGame() {
    this.dateManager.setDate('06-02-1933')
    this.statusManager.resetStats()
  }

  refreshTexts() {
    this.dateManager.setLanguage(this.translator.languageCode)
    
    this.updateText(this.start, this.getText('newgame'))
    this.updateText(this.language, this.getText('language'))
    this.agar3s.setText(this.getText('credits'))
    this.info.setText(this.getText('autosave'))

    if (this.summary) {
      this.summary.setText(this.getText('endings', [this.summary.getData('endings')]))
    }

    if (this.continueG) {
      let date = this.dateManager.getDateStringFor(this.continueG.getData('date'))
      this.updateText(this.continueG, this.getText('continue', [date]))
    }
  }

}
export {
  MenuScene
}
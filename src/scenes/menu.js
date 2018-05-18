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
    this.backgroundMusic = this.sound.add('amazingBackgroundMusic')
    this.backgroundMusic.volume = 0.2
    this.backgroundMusic.play()

    let start = this.createButton({
      x: 640,
      y: 450,
      font: 'na28',
      text: 'Start',
      onClick: () => {
        console.log(game, game.sound, game.sound.usingWebAudio)
        this.startNewGame()
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
    language.setAlpha(0)

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

    let agar3s = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.95,
      'na16',
      'Made by Agar3s',
      this.cameras.main.width
    )
    agar3s.setOrigin(0.5, 1)
    agar3s.setTint(0x62391b)

  }

  update () {

  }

  startNewGame() {
    this.dateManager.setDate('16-02-1933')
    this.statusManager.resetStats()
  }

}
export {
  MenuScene
}
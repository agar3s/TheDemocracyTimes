
let awsPrefix = 'https://s3.amazonaws.com/agar3s-assets/democracyTimes/'
const env = 'PRODUCTION'
//const env = 'DEV'

export default class BootScene extends Phaser.Scene {
  constructor (props) {
    super({key: 'bootScene'})
  }

  preload() {
    var progressBox = this.add.graphics()
    var progressBar = this.add.graphics()

    var width = this.cameras.main.width
    var height = this.cameras.main.height
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 30,
      text: 'Printing...',
      style: {
        font: '30px monospace',
        fill: '#ffdabd'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 25,
      text: '0%',
      style: {
          font: '20px monospace',
          fill: '#ffdabd'
      }
    });
    percentText.setOrigin(0.5, 0.5)

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 65,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffdabd'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    progressBox.fillStyle(0x62391b, 1)
    progressBox.fillRect(width/2 - 160, height/2, 320, 50)


    this.load.on('progress', (value) => {
      progressBar.clear()
      progressBar.fillStyle(0x906749, 1)
      progressBar.fillRect(width/2 + 10 - 160, height/2 + 10, 300 * value, 30)
      percentText.setText(parseInt(value * 100) + '%')
    })
                
    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key + ' ready')
    })
     
    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
      
      this.cache.bitmapFont.entries.get('vtt24').data.lineHeight = 22


      this.scene.start('menuScene')



    })

    let urlBase = ''
    if(env=='PRODUCTION') {
      urlBase = awsPrefix
    }

    // images
    this.load.spritesheet('head', urlBase+'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    // backgrounds
    this.load.spritesheet('back', urlBase+'assets/backgroundPaper.png', { frameWidth: 320, frameHeight: 180 })
    this.load.spritesheet('office', urlBase+'assets/office.png', { frameWidth: 320, frameHeight: 180 })

    // HEADLINES
    this.load.bitmapFont('na28', urlBase+'assets/fonts/newsgeek28_0.png', urlBase+'assets/fonts/newsgeek28.fnt')
    this.load.bitmapFont('na22', urlBase+'assets/fonts/newsgeek22_0.png', urlBase+'assets/fonts/newsgeek22.fnt')
    this.load.bitmapFont('na18', urlBase+'assets/fonts/newsgeek18_0.png', urlBase+'assets/fonts/newsgeek18.fnt')
    this.load.bitmapFont('na16', urlBase+'assets/fonts/newsgeek16_0.png', urlBase+'assets/fonts/newsgeek16.fnt')

    // lead liners
    this.load.bitmapFont('small12', urlBase+'assets/fonts/small12_0.png', urlBase+'assets/fonts/small12.fnt')
    this.load.bitmapFont('small8', urlBase+'assets/fonts/small8_0.png', urlBase+'assets/fonts/small8.fnt')
    this.load.bitmapFont('small10', urlBase+'assets/fonts/small10_0.png', urlBase+'assets/fonts/small10.fnt')
    
    this.load.bitmapFont('small24', urlBase+'assets/fonts/small24_0.png', urlBase+'assets/fonts/small24.fnt')
    this.load.bitmapFont('vtt24', urlBase+'assets/fonts/vtt24_0.png', urlBase+'assets/fonts/vtt24.fnt')

    // graphics
    this.load.spritesheet('head', urlBase+'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    this.load.spritesheet('jhonatan', urlBase+'assets/jhonatan.png', { frameWidth: 40, frameHeight: 87 })
    this.load.spritesheet('frank', urlBase+'assets/frank.png', { frameWidth: 54, frameHeight: 104 })
    this.load.spritesheet('evans', urlBase+'assets/evans.png', { frameWidth: 55, frameHeight: 104 })
    this.load.spritesheet('charlie', urlBase+'assets/charlie.png', { frameWidth: 63, frameHeight: 100 })
    this.load.spritesheet('desktop', urlBase+'assets/desktop.png', { frameWidth: 320, frameHeight: 51 })

    // mini layouts
    this.load.spritesheet('layout01', urlBase+'assets/layouts/01.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout02', urlBase+'assets/layouts/02.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout03', urlBase+'assets/layouts/03.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout04', urlBase+'assets/layouts/04.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout05', urlBase+'assets/layouts/05.png', { frameWidth: 88, frameHeight: 127 })

    // audio
    this.load.audio('amazingBackgroundMusic', urlBase+'assets/sounds/WalkingAlong.ogg')


    // comic strips
    this.load.spritesheet('strip1', urlBase+'assets/strip/strip1_sepia2.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip2', urlBase+'assets/strip/strip2_sepia1.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip3', urlBase+'assets/strip/strip3_sepia.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip4', urlBase+'assets/strip/strip4_sepia.png', { frameWidth: 446, frameHeight: 360 })

    // json
    this.load.json('translations', urlBase+'assets/text.json')
    this.load.json('formats', urlBase+'assets/formats.json')
    this.load.json('layouts', urlBase+'assets/layouts.json')
    this.load.json('dates', urlBase+'assets/dates.json')
    this.load.json('dates_es', urlBase+'assets/dates_es.json')
    this.load.json('news', urlBase+'assets/news.json')
    this.load.json('news_es', urlBase+'assets/news_es.json')
    this.load.json('dialogues', urlBase+'assets/dialogues.json')
    this.load.json('dialogues_es', urlBase+'assets/dialogues_es.json')
    this.load.json('cinematic', urlBase+'assets/cinematic.json')
    this.load.json('cinematic_es', urlBase+'assets/cinematic_es.json')

  }
}
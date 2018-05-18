
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

    // images
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    // backgrounds
    this.load.spritesheet('back', 'assets/backgroundPaper.png', { frameWidth: 320, frameHeight: 180 })
    this.load.spritesheet('office', 'assets/office.png', { frameWidth: 320, frameHeight: 180 })

    // HEADLINES
    this.load.bitmapFont('na28', 'assets/fonts/newsgeek28_0.png', 'assets/fonts/newsgeek28.fnt')
    this.load.bitmapFont('na22', 'assets/fonts/newsgeek22_0.png', 'assets/fonts/newsgeek22.fnt')
    this.load.bitmapFont('na18', 'assets/fonts/newsgeek18_0.png', 'assets/fonts/newsgeek18.fnt')
    this.load.bitmapFont('na16', 'assets/fonts/newsgeek16_0.png', 'assets/fonts/newsgeek16.fnt')

    // lead liners
    this.load.bitmapFont('small12', 'assets/fonts/small12_0.png', 'assets/fonts/small12.fnt')
    this.load.bitmapFont('small8', 'assets/fonts/small8_0.png', 'assets/fonts/small8.fnt')
    this.load.bitmapFont('small10', 'assets/fonts/small10_0.png', 'assets/fonts/small10.fnt')
    
    this.load.bitmapFont('small24', 'assets/fonts/small24_0.png', 'assets/fonts/small24.fnt')
    this.load.bitmapFont('vtt24', 'assets/fonts/vtt24_0.png', 'assets/fonts/vtt24.fnt')

    // graphics
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    this.load.spritesheet('reporter1', 'assets/reporter1.png', { frameWidth: 40, frameHeight: 87 })
    this.load.spritesheet('frank', 'assets/frank.png', { frameWidth: 53, frameHeight: 101 })
    this.load.spritesheet('desktop', 'assets/desktop.png', { frameWidth: 320, frameHeight: 51 })

    // mini layouts
    this.load.spritesheet('layout01', 'assets/layouts/01.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout02', 'assets/layouts/02.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout03', 'assets/layouts/03.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout04', 'assets/layouts/04.png', { frameWidth: 88, frameHeight: 127 })
    this.load.spritesheet('layout05', 'assets/layouts/05.png', { frameWidth: 88, frameHeight: 127 })


    // comic strips
    this.load.spritesheet('strip1', 'assets/strip/strip1_sepia2.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip2', 'assets/strip/strip2_sepia1.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip3', 'assets/strip/strip3_sepia.png', { frameWidth: 446, frameHeight: 360 })
    this.load.spritesheet('strip4', 'assets/strip/strip4_sepia.png', { frameWidth: 446, frameHeight: 360 })

    // json
    this.load.json('translations', 'assets/text.json')
    this.load.json('formats', 'assets/formats.json')
    this.load.json('dates', 'assets/dates.json')
    this.load.json('layouts', 'assets/layouts.json')
    this.load.json('news', 'assets/news.json')
    this.load.json('dialogues', 'assets/dialogues.json')

    // audio
    this.load.audio('amazingBackgroundMusic', '../assets/sounds/WalkingAlong.ogg')

  }
}
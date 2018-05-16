
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




      this.scene.start('monologueScene')



    })

    // images
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    // backgrounds
    this.load.spritesheet('back', 'assets/backgroundPaper.png', { frameWidth: 320, frameHeight: 180 })

    // HEADLINES
    this.load.bitmapFont('na28', 'assets/fonts/newsgeek28_0.png', 'assets/fonts/newsgeek28.fnt')
    this.load.bitmapFont('na22', 'assets/fonts/newsgeek22_0.png', 'assets/fonts/newsgeek22.fnt')
    this.load.bitmapFont('na18', 'assets/fonts/newsgeek18_0.png', 'assets/fonts/newsgeek18.fnt')
    this.load.bitmapFont('na16', 'assets/fonts/newsgeek16_0.png', 'assets/fonts/newsgeek16.fnt')

    // lead liners
    this.load.bitmapFont('small12', 'assets/fonts/small12_0.png', 'assets/fonts/small12.fnt')
    this.load.bitmapFont('small8', 'assets/fonts/small8_0.png', 'assets/fonts/small8.fnt')
    this.load.bitmapFont('small10', 'assets/fonts/small10_0.png', 'assets/fonts/small10.fnt')

    // graphics
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    this.load.spritesheet('square', 'assets/square.png', { frameWidth: 10, frameHeight: 10 })
    this.load.json('translations', 'assets/text.json')
    this.load.json('formats', 'assets/formats.json')

  }
}
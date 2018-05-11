import Translation from '../utils/translation'
import Frontpage from '../sprites/frontpage'
import NewsItem from '../sprites/newsitem'

class BootScene extends Phaser.Scene {
  constructor () {
    super({key: 'bootScene'})
  }

  preload () {
    this.load.spritesheet('logo', 'assets/logo.png', { frameWidth: 770, frameHeight: 291 })
    this.load.spritesheet('head', 'assets/democrayTimes.png', { frameWidth: 255, frameHeight: 65 })
    this.load.spritesheet('square', 'assets/square.png', { frameWidth: 10, frameHeight: 10 })
    this.load.json('translations', 'assets/text.json')
    this.load.json('formats', 'assets/formats.json')

    // fonts

    // HEADLINES
    this.load.bitmapFont('na28', 'assets/fonts/newsgeek28_0.png', 'assets/fonts/newsgeek28.fnt')
    this.load.bitmapFont('na22', 'assets/fonts/newsgeek22_0.png', 'assets/fonts/newsgeek22.fnt')
    this.load.bitmapFont('na18', 'assets/fonts/newsgeek18_0.png', 'assets/fonts/newsgeek18.fnt')
    this.load.bitmapFont('na16', 'assets/fonts/newsgeek16_0.png', 'assets/fonts/newsgeek16.fnt')

    // lead liners
    this.load.bitmapFont('small12', 'assets/fonts/small12_0.png', 'assets/fonts/small12.fnt')
    this.load.bitmapFont('small8', 'assets/fonts/small8_0.png', 'assets/fonts/small8.fnt')
    this.load.bitmapFont('small10', 'assets/fonts/small10_0.png', 'assets/fonts/small10.fnt')


  }

  create () {
    this.translations = new Translation(this.cache, 'translations')

    let screenBounds = {
      width: 1280,
      height: 720,
      paddingLateral: 10,
      paddingVertical: 10
    }
    
    // check layout
    var graphics = this.add.graphics()
    graphics.lineStyle(1, 0x666666, 1)
    graphics.fillStyle(0x111111, 1)
    
    // desktop
    graphics.fillRect(
      screenBounds.paddingLateral,
      screenBounds.paddingVertical,
      screenBounds.width - screenBounds.paddingLateral*2,
      screenBounds.height - screenBounds.paddingVertical*2
    )

    this.frontpage = new Frontpage({scene: this, screenBounds})
    
    let width = 3
    let height = 4
    let header = 0.5
    let ratio = (screenBounds.height - screenBounds.paddingVertical*2)/5

    // news basic distribution
    let formats = this.cache.json.get('formats')

    // news to publish
    let preloadedStyles = ['main-a', 'small-a', 'small-a', 'main-b']
    let newsData = [
      {
        headline: 'Banquetes para todos',
        lead: 'El popular millonario Andy Montana ofrece banquetes de caridad en las zonas mas pobres de la ciudad.',
        tags: ['Social', 'Andy Montana', 'Mafia', 'Caridad'],
        by: 'Jhonatan Ross'
      },
      {
        headline: 'Continua la huelga en Soups & Pastas',
        lead: 'Tercer dia de huelga, se estiman perdidas por 1000 dolares.',
        tags: ['Actualidad', 'Soups & Pastas', 'Partido laborista', 'Huelgas'],
        by: 'Lloyd Moore'
      },
      {
        headline: 'Annette Gray cantará en el South Hall',
        lead: 'La famosa cantante se presentará este 5 de Mayo con la banda Underground Boys.',
        tags: ['Cultura y arte', 'Annette Gray', 'Underground Boys'],
        by: 'Victor Griffin'
      },
      {
        headline: '5a carrera Ernest Jones por los veteranos',
        lead: 'La ciudad se prepara para el evento que reunira fondos para los veteranos de la gran guerra.',
        tags: ['Deportes', 'Ernest Jones', 'ciudad'],
        by: 'Victor Griffin'
      },
    ]
    newsData.sort(()=>{
      return Math.random()<0.5
    })
    for (let i = 0; i < 4; i++) {
      new NewsItem({formats, scene: this, screenBounds, ratio}, newsData[i])
    }

    this.input.on('dragstart', (pointer, gameObject) => {
      let currentIndex = this.children.list.indexOf(gameObject)
      if (currentIndex !== -1 && currentIndex < this.children.list.length - 1) {
          this.children.list.splice(currentIndex, 1)
          this.children.list.push(gameObject)
      }
    }, this)

    this.input.on('drag', (pointer, container, dragX, dragY) => {
      container.x = dragX
      container.y = dragY
      if(container.getData('type') === 'newsitem') {
        let rect = new Phaser.Geom.Rectangle(container.x, container.y, 1.5*ratio, 2*ratio)
        let inside = this.frontpage.checkItem(pointer)
        if (inside) {
          container.setAlpha(0.6)
        } else {
          container.setAlpha(1)
        }
      }
    })

    this.input.on('dragend', (pointer, container) => {
      if(container.getData('type') === 'newsitem') {
        this.frontpage.attachItem(container.getData('item'))
        container.setAlpha(1)
      }
    }, this)

  }

  update (time, dt) {

  }

  getText(val) {
    return this.translations.translate(val)
  }



}

export {
  BootScene
}
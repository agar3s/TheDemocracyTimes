import GeneralScene from './scene'
import Translation from '../utils/translation'
import Frontpage from '../sprites/frontpage'
import NewsItem from '../sprites/newsitem'

class EditScene extends GeneralScene {
  constructor () {
    super({key: 'editScene'})
  }

  preload () {


  }

  create () {
    super.create()

    this.frontpage = new Frontpage({scene: this, screenBounds: this.screenBounds})
    
    let width = 3
    let height = 4
    let header = 0.5
    let ratio = (this.screenBounds.height - this.screenBounds.paddingVertical*2)/5

    // news basic distribution
    let formats = this.cache.json.get('formats')

    // news to publish
    let preloadedStyles = ['main-a', 'small-a', 'small-a', 'main-b']
    let newsData = [
      {
        headline: 'Banquetes para todos',
        lead: 'El popular millonario Andy Montana ofrece banquetes de caridad en las zonas mas pobres de la ciudad.',
        tags: ['Social', 'Andy Montana', 'Mafia', 'Caridad'],
        by: 'Jhonatan Ross',
        pics: ['1']
      },
      {
        headline: 'Continua la huelga en Soups & Pastas',
        lead: 'Tercer dia de huelga, se estiman perdidas por 1000 dolares.',
        tags: ['Actualidad', 'Soups & Pastas', 'Partido laborista', 'Huelgas'],
        by: 'Lloyd Moore',
        pics: []
      },
      {
        headline: 'Annette Gray cantará en el South Hall',
        lead: 'La famosa cantante se presentará este 5 de Mayo con la banda Underground Boys.',
        tags: ['Cultura y arte', 'Annette Gray', 'Underground Boys'],
        by: 'Victor Griffin',
        pics: []
      },
      {
        headline: '5a carrera Ernest Jones por los veteranos',
        lead: 'La ciudad se prepara para el evento que reunira fondos para los veteranos de la gran guerra.',
        tags: ['Deportes', 'Ernest Jones', 'ciudad'],
        by: 'Victor Griffin',
        pics: []
      },
    ]
    newsData.sort(()=>{
      return Math.random()<0.5
    })
    for (let i = 0; i < 4; i++) {
      new NewsItem({formats, scene: this, screenBounds: this.screenBounds, ratio}, newsData[i])
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



    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Ready to Print',
      onClick: () => {
        this.changeToScene('publishScene')
      },
      scale: 1.4,
      color: 0xc69d7f
    })
    next.setOrigin(1, 1)
  }

  update (time, dt) {

  }

  getText(val) {
    return this.translations.translate(val)
  }

  destroy () {
    console.log('destroy on edit called')
  }



}

export {
  EditScene
}
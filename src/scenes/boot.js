import Translation from '../utils/translation'

class BootScene extends Phaser.Scene {
  constructor () {
    super({key: 'bootScene'})
  }

  preload () {
    this.load.spritesheet('logo', 'assets/logo.png', { frameWidth: 770, frameHeight: 291 })
    this.load.json('translations', 'assets/text.json')
  }

  create () {
    this.translations = new Translation(this.cache, 'translations')

    let logo = this.add.sprite(400, 300, 'logo')
    let playText = this.add.text(0, 0, this.getText('play'), {fontFamily: 'newsgeek', fontSize: 64, color: '#333'})
    /*
    this.add.text(20, 400, 'VOL 76   THURSDAY, MAY 24, 1934   5 CENTS', {fontFamily: 'newsgeekPixel', fontSize: 25, color: '#333'})
    this.add.text(20, 450, 'VOL 76   THURSDAY, MAY 24, 1934   5 CENTS', {fontFamily: 'newsgeek', fontSize: 25, color: '#333'})
    let texto = 'Aunque las razones de su muerte aun son desconocidas, algunas fuentes informan que esto se debio a una guerra entre las bandas'
    
    this.add.text(20, 500, texto, {fontFamily: 'newsgeekPixel', fontSize: 18, color: '#333'})
    this.add.text(20, 550, texto, {fontFamily: 'newsgeek', fontSize: 18, color: '#333'})

    this.add.text(20, 100, 'CAPONE FOUND DEAD', {fontFamily: 'newsgeekPixel', fontSize: 40, color: '#333'})
    this.add.text(20, 150, 'CAPONE FOUND DEAD', {fontFamily: 'newsgeek', fontSize: 40, color: '#333'})
    */
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
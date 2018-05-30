import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class ResultsScene extends GeneralScene {
  constructor () {
    super({key: 'resultsScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: this.screenBounds.width - this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na28',
      text: this.getText('next'),
      onClick: () => {
        this.dateManager.nextDay()
        if(this.dateManager.isGameOver()) {
          this.changeToScene('endingScene')
        } else {
          this.changeToScene('monologueScene')
        }
      },
      scale: 1,
      color: 0xc69d7f
    })

    next.setOrigin(1, 1)
    next.setAlpha(0)


    let title = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.1,
      'na28',
      this.getText('saleResult'),
      this.cameras.main.width
    )

    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.4)
    let report = this.statusManager.getSalesReport()

    this.displayStats(this.getText('Rprinted'), `${report.printed.toFixed(0)}`, this.cameras.main.height*0.2, 0.8)
    this.displayStats(this.getText('Rsold'), `${report.sold.toFixed(0)}`, this.cameras.main.height*0.2+25, 1.2)

    this.displayStats(this.getText('Rincome'),'', this.cameras.main.height*0.2+75, 1.6)
    this.displayStats(this.getText('Rsales'), `${report.sales.toFixed(2)} usd`, this.cameras.main.height*0.2+100, 1.6)
    this.displayStats(this.getText('Radvertising'), `${report.advertising.toFixed(2)} usd`, this.cameras.main.height*0.2+125, 2.0)
    this.displayStats(this.getText('Rtotal'), `${report.total.toFixed(2)} usd`, this.cameras.main.height*0.2+150, 2.4)
    
    this.displayStats(this.getText('Rcosts'), '', this.cameras.main.height*0.2+200, 2.8)
    this.displayStats(this.getText('Remployees'), `${report.employees.toFixed(2)} usd`, this.cameras.main.height*0.2+225, 2.8)
    this.displayStats(this.getText('Rprinting'), `${report.printing.toFixed(2)} usd`, this.cameras.main.height*0.2+250, 3.2)
    this.displayStats(this.getText('Roffice'), `${report.office.toFixed(2)} usd`, this.cameras.main.height*0.2+275, 3.6)
    this.displayStats(this.getText('Rcoststotal'), `${report.costs.toFixed(2)} usd`, this.cameras.main.height*0.2+300, 4)

    this.displayStats(this.getText('Rcapital'), `${report.capital.toFixed(2)} usd`, this.cameras.main.height*0.2+350, 4.4)
    this.displayStats(this.getText('Rrevenue'), `${report.revenue.toFixed(2)} usd`, this.cameras.main.height*0.2+375, 4.8)
    this.displayStats(this.getText('RnewCapital'), `${report.newCapital.toFixed(2)} usd`, this.cameras.main.height*0.2+400, 5.2)


    this.time.delayedCall(5800, () => {
      next.setAlpha(1)
    })
  }

  update () {

  }

  displayStats(labelText, valueText, y, time) {
    let label = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2 - 150,
      y,
      'vtt24',
      labelText,
      this.cameras.main.width
    )
    label.setOrigin(0, 0)
    label.setTint(0xc69d7f)
    label.setAlpha(time?0:1)

    let value = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2 + 150,
      y,
      'vtt24',
      valueText,
      this.cameras.main.width
    )
    value.setOrigin(1, 0)
    value.setTint(0xc69d7f)
    value.setAlpha(time?0:1)

    this.time.delayedCall(time*1000, () => {
      label.setAlpha(1)
      value.setAlpha(1)
    }, [], this)
  }

}
export {
  ResultsScene
}
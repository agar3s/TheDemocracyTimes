import GeneralScene from './scene.js'
import NewsItem from '../sprites/newsItem'

class ResultsScene extends GeneralScene {
  constructor () {
    super({key: 'resultsScene'})
  }

  create () {
    super.create()
    let next = this.createButton({
      x: this.screenBounds.width + this.screenBounds.paddingVertical*2,
      y: this.screenBounds.height - this.screenBounds.paddingVertical*2,
      font: 'na22',
      text: 'Continue',
      onClick: () => {
        this.dateManager.nextDay()
        if(this.dateManager.isGameOver()) {
          this.changeToScene('endingScene')
        } else {
          this.changeToScene('monologueScene')
        }
      },
      scale: 1.4,
      color: 0xc69d7f
    })

    next.setOrigin(1, 1)


    let title = NewsItem.WrapBitmapText(
      this,
      this.cameras.main.width/2,
      this.cameras.main.height*0.1,
      'na28',
      'Sales Result',
      this.cameras.main.width
    )

    title.setOrigin(0.5, 0.5)
    title.setTint(0xc69d7f)
    title.setScale(1.4)
    let report = this.statusManager.getSalesReport()

    this.displayStats('Newspapers printed:', `${report.printed.toFixed(0)}`, this.cameras.main.height*0.2, 1)
    this.displayStats('Newspapers sold:', `${report.sold.toFixed(0)}`, this.cameras.main.height*0.2+25, 2)

    this.displayStats('Income =====================', '', this.cameras.main.height*0.2+75, 3)
    this.displayStats('Sales', `${report.sales.toFixed(2)} usd`, this.cameras.main.height*0.2+100, 3)
    this.displayStats('Advertising', `${report.advertising.toFixed(2)} usd`, this.cameras.main.height*0.2+125, 4)
    this.displayStats('Total', `${report.total.toFixed(2)} usd`, this.cameras.main.height*0.2+150, 5)
    
    this.displayStats('Costs ======================', '', this.cameras.main.height*0.2+200, 6)
    this.displayStats('Employees', `${report.employees.toFixed(2)} usd`, this.cameras.main.height*0.2+225, 6)
    this.displayStats('Printing', `${report.printing.toFixed(2)} usd`, this.cameras.main.height*0.2+250, 7)
    this.displayStats('Office', `${report.office.toFixed(2)} usd`, this.cameras.main.height*0.2+275, 8)
    this.displayStats('Costs', `${report.costs.toFixed(2)} usd`, this.cameras.main.height*0.2+300, 9)

    this.displayStats('Capital', `${report.capital.toFixed(2)} usd`, this.cameras.main.height*0.2+350, 10)
    this.displayStats('Revenue', `${report.revenue.toFixed(2)} usd`, this.cameras.main.height*0.2+375, 11)
    this.displayStats('New Capital', `${report.newCapital.toFixed(2)} usd`, this.cameras.main.height*0.2+400, 12)


    
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
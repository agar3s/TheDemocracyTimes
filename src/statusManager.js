
class StatusManager {
  constructor (previousStatus = {}) {
    this.resetStats()
    this.news = previousStatus.news || this.news
    this.endDialogue = previousStatus.endDialogue || this.endDialogue
    this.lastPublicationStats = previousStatus || this.lastPublicationStats
    this.companyStats = previousStatus.companyStats || this.companyStats
  }

  resetStats () {
    this.companyStats = {
      capital: 225,
      printing: 4000,
      advertising: 35 
    }
    this.news = {}
    this.endDialogue = ''
    this.lastPublicationStats = {}
  }

  setPublication (frontPageData, frontPageStats) {
    Object.keys(frontPageData).forEach((key)=>{
      this.news[key] = frontPageData[key]
    })
    this.lastPublicationStats = frontPageStats
  }

  setEndDialogue (key) {
    this.endDialogue = key
  }

  getSalesReport () {
    let score = this.lastPublicationStats.exclusivity +this.lastPublicationStats.relevancy +this.lastPublicationStats.popularity
    console.log(this.lastPublicationStats.exclusivity, this.lastPublicationStats.relevancy, this.lastPublicationStats.popularity)
    let sold = (score||0) * 1450
    let overSold = sold > this.companyStats.printing 
    if (overSold) {
      sold = ~~(this.companyStats.printing*0.9999)
    }
    let sales = sold*0.05
    let total = sales + this.companyStats.advertising
    
    let impresionCosts = -this.companyStats.printing*0.01 
    let employees = -(4*30 + 1*20)
    let office = -50
    let costs = employees+impresionCosts+office
    let results = {
      printed: this.companyStats.printing,  // based on previous sold
      sold: sold,
      sales: sales,
      advertising: this.companyStats.advertising, // based on total of previous sold
      total: total,
      employees: employees,
      printing: impresionCosts, // based on how many there are intervals
      office: office, //fixed
      costs: costs,
      capital: this.companyStats.capital, // previous
      revenue: total + costs,
      newCapital: this.companyStats.capital + total + costs
    }
    this.companyStats.capital += total + costs

    this.companyStats.advertising = parseFloat((sold*1.2/100).toFixed(2))

    if (overSold) {
      this.companyStats.advertising += 10
      this.companyStats.printing += 500
    } else if(sold +800 < this.companyStats.printing){
      this.companyStats.printing -= 500
    }

    return results
  }


}

let statusManager

let getStatusManager = (cache) => {
  if(!statusManager) {
    statusManager = new StatusManager(cache)
  }
  return statusManager
}
export {
  getStatusManager
}
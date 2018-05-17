
class StatusManager {
  constructor (previousStatus = {}) {
    this.news = previousStatus.news || {}
    this.endDialogue = previousStatus.endDialogue || ''
    this.lastPublicationStats = {}

    this.companyStats = {
      capital: 500
    }
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
    let total = this.lastPublicationStats.exclusivity +this.lastPublicationStats.relevancy +this.lastPublicationStats.popularity
    console.log(total)
    let sold = (total||0) * 1800
    return {
      printed: 2500,  // based on previous sold
      sold: sold,
      sales: sold*0.05,
      advertising: 40, // based on total of previous sold
      total: sold*0.05 + 40,
      employees: -(4*30 + 1*20),
      printing: -(2500*0.01), // based on how many there are intervals
      office: -50, //fixed
      costs: -(4*30 + 1*20 + 2500*0.01 + 50),
      capital: this.companyStats.capital, // previous
      revenue: (sold*0.05 + 40)-(4*30 + 1*20 + 2500*0.01 + 50),
      newCapital: this.companyStats.capital + (sold*0.05 + 40)-(4*30 + 1*20 + 2500*0.01 + 50)
    }
    this.companyStats.capital += (sold*0.05 + 40)-(4*30 + 1*20 + 2500*0.01 + 50)
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
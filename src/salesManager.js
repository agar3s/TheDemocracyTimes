/**
* should compare the population interests and match with the current 
* newspaper issue to check the sales
*/
class SalesManager {
  constructor () {
    this.capital = 225
    this.printing = 3000000
    this.advertising = 35
    this.employees = 5
    this.issuePrice = 0.02
    this.printingCost = 0.001
    this.officeCost = 50

    // both are a kind of level of the newspaper

    // newspaper reach thanks to its yellow journalism?
    this.sensacionalism = 1

    // newspaper reputation as an relevant medium
    this.reputation = 1

    // a number related coverage and reputation
    // its a base that can grow or decrease depending on the new publications
    this.clients = 3500
  }

  getTotalSales(issue) {

  }
  resetStats () {
    this.reputation = 0.9
    this.sensacionalism = 0.9
  }

  calculateSales(articles, layout = [1.5, 1.2, 1, 0.6, 0.4]) {
    articles.forEach((article, index) => {
      return this.salesByArticle(article, layout[index])
    })
    let sales = this.checkRedundancy(articles,layout)

    this.updateReputation(articles, layout)
    this.updateSensacionalism(articles, layout)
    if(sales > this.printing) {
      sales = this.printing
    }
    return sales
  }

  updateReputation (articles, layout) {
    // should increase as a very opened exponential equation
    let total = articles.reduce((acc, article, index) => {
      return acc + (article.relevance * layout[index])
    }, 0)
    let newsInLayout = this.getLayoutLength(layout)
    this.reputation += (total/([0,0,0,3,3.5,4][newsInLayout]) - ([0,0,0,0.95,0.9,0.85][newsInLayout]))*0.15
  }

  updateSensacionalism (articles, layout) {
    // should increase as logaritmh equation
    let total = articles.reduce((acc, article, index) => {
      return acc + (article.sensacionalism * layout[index])
    }, 0)
    let newsInLayout = this.getLayoutLength(layout)
    this.sensacionalism += (total/([0,0,0,3,3.5,4][newsInLayout]) - ([0,0,0,1.25,1,0.75][newsInLayout]))*0.1
  }

  getLayoutLength(layout) {
    for (var i = 0; i < layout.length; i++) {
      if(layout[i]==0) return i
    }
    return layout.length
  }


  salesByArticle(article, layoutFactor) {
    let market = article.market * layoutFactor
    market *= Math.pow(this.reputation, 2)*1.1
    market *= article.relevance  // 0.5 - 2
    market *= article.sensacionalism
    market *= Math.sqrt(this.sensacionalism)*0.6    // algunos bonos por venderla en el lugar correcto?
    
    article.prospectiveMarket = (market>article.market)?article.market:market
  }

  checkRedundancy(articles, layout) {
    articles.sort((articleA, articleB) => {
      return articleB.prospectiveMarket - articleA.prospectiveMarket
    })

    let accumulatedValues = 0

    let newsInLayout = this.getLayoutLength(layout)-3
    let selectedFactors = [
      [0.5,0.4,0.3,0,0],
      [0.4, 0.35, 0.25, 0.15,0],
      [0.3, 0.25, 0.2, 0.15, 0.1]
    ][newsInLayout]
    articles.forEach((article, index) => {
      let market = article.prospectiveMarket
      accumulatedValues += market*selectedFactors[index]
    })
    return accumulatedValues
  }
}


let salesManager

let getSalesManager = () => {
  if(!salesManager) {
    salesManager = new SalesManager()
  }
  return salesManager
}
export {
  getSalesManager
}
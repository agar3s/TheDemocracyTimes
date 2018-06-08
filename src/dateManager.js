import {getStatusManager} from './statusManager'

class DateManager {
  constructor (cache) {
    this.cache = cache
    this.setLanguage('en')
    this.statusManager = getStatusManager()
    //this.setDate("06-02-1933")
    this.setDate("demo")
  }

  setLanguage (language) {
    if (language!='en'){
      language = `_${language.toLowerCase()}`
    } else {
      language = ''
    }
    this.dates = this.cache.json.get(`dates${language}`)
    this.news = this.cache.json.get(`news${language}`)
    this.dialogues = this.cache.json.get(`dialogues${language}`)
  }

  getMonologue() {
    return this.data.monologue
  }

  getDate () {
    return this.data.dateString
  }

  setDate(date) {
    this.data = this.dates[date]
    this.currentDate = this.data.date

    if(this.data.date.day===6 && this.data.date.month===2&&this.data.date.year===1933) return

    let saveStatus = {
      date: date,
      asString: this.data.dateString,
      companyStats: this.statusManager.companyStats
    }
    if (this.data.end) {
      let endings = JSON.parse(localStorage.getItem('democracyTimes-endings-ADVJ18')) || {
        '1': false,'2': false,'3': false,'4': false,'5': false,'6': false,'7': false,'8': false,'9': false
      }
      endings[this.data.key] = true
      localStorage.setItem('democracyTimes-endings-ADVJ18', JSON.stringify(endings))
      localStorage.removeItem('democracyTimes-ADVJ18')
    }else{
      localStorage.setItem('democracyTimes-ADVJ18', JSON.stringify(saveStatus))
    }
  }

  getDialogue() {
    return this.dialogues[this.data.dialogue]
  }

  getNews() {
    let status = this.statusManager
    let newsLocked = this.data.newsLocked

    let news = this.data.news.map(id=>id)
    if (newsLocked) {
      news = news.concat(newsLocked[status.endDialogue])
    }
    return news.map((id) => {
      let newsItem = this.news[id]
      newsItem.id = id
      return newsItem
    })

  }

  getLayouts() {
    return this.data.layouts
  }

  nextDay() {
    let status = this.statusManager
    let rules = this.data.nextRules
    let nextDay = rules.default


    if (rules.hasOwnProperty('news')) {
      Object.keys(rules.news).forEach((newID) => {
        let rule = rules.news[newID]
        let newsItem = status.news[newID]
        if(newsItem && rule.hasOwnProperty('scoreGt') && newsItem.score > rule.scoreGt) {
          nextDay = rule.next
        }
      })
    }
    
    if (rules.hasOwnProperty('endDialogue')) {
      let anotherDay = rules.endDialogue[status.endDialogue]
      if(anotherDay){
        nextDay = anotherDay
      }
    }

    if(status.companyStats.capital < 0) {
      nextDay = 'end00'
    }
    this.setDate(nextDay)
  }

  isGameOver() {
    return !!this.data.end
  }

  getDateStringFor(date) {
    return this.dates[date].dateString
  }
}

let dateManager

let getDateManager = (cache) => {
  if(!dateManager) {
    dateManager = new DateManager(cache)
  }
  return dateManager
}
export {
  getDateManager
}
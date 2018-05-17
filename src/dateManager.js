
class DateManager {
  constructor (cache) {
    this.dates = cache.json.get('dates')
    this.news = cache.json.get('news')
    this.dialogues = cache.json.get('dialogues')
    this.setDate("27-02-1933")
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
  }

  getDialogue() {
    return this.dialogues[this.data.dialogue]
  }

  getNews() {
    return this.data.news.map((id) => {
      let newsItem = this.news[id]
      newsItem.id = id
      return newsItem
    })
  }

  getLayouts() {
    return this.data.layouts
  }

  nextDay(status) {
    let rules = this.data.nextRules
    let nextDay = rules.default
    if (rules.hasOwnProperty('news')) {
      Object.keys(rules.news).forEach((newID) => {
        let rule = rules.news[newID]
        let newsItem = status.news[newID]
        if(rule.hasOwnProperty('scoreGt') && newsItem.score > rule.scoreGt) {
          nextDay = rule.next
        }
      })
    }
    if (rules.hasOwnProperty('endDialogue')) {
      nextDay = rules.endDialogue[status.endDialogue]
    }
    this.setDate(nextDay)
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
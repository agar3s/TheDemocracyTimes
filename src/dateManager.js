
class DateManager {
  constructor (cache) {
    this.dates = cache.json.get('dates')
    this.news = cache.json.get('news')
    this.dialogues = cache.json.get('dialogues')
    this.setDate("08-11-1932")
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
    return this.data.news.map(id => this.news[id])
  }

  getLayouts() {
    return this.data.layouts
  }

  nextDay() {
    let nextDay = this.data.next[0]
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
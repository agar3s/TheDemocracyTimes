
class DateManager {
  constructor (cache) {
    this.dates = cache.json.get('dates')
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
    return this.data.dialogue
  }

  getNews() {
    return this.data.news
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
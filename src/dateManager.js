
class DateManager {
  constructor (cache) {
    this.dates = cache.json.get('dates')
    this.setDate({day: 8, month: 11, year: 1932})
  }

  getMonologue() {
    return this.data.monologue
  }

  getDate () {
    return "November 08th 1932"
  }

  setDate(date) {
    this.currentDate = date
    this.data = this.dates[`${this.currentDate.day}-${this.currentDate.month}-${this.currentDate.year}`]
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
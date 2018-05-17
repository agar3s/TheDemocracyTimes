
class StatusManager {
  constructor () {
    this.news = {}
    this.endDialogue = ''
  }

  setPublication (frontPageData) {
    Object.keys(frontPageData).forEach((key)=>{
      this.news[key] = frontPageData[key]
    })
  }

  setEndDialogue (key) {
    this.endDialogue = key
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
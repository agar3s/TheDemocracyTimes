
const lineHeight = 8
const paddingX = 9

export default class NewsBody {
  constructor (config) {
    this.graphics = config.graphics
    this.width = 0
    this.height = 0
    this.x = 0
    this.y = 0
    this.seed = Math.random().toString()
  }

  setupBounds(props) {
    this.width = props.width
    this.y = props.y
    this.height = props.height - props.y
  }

  draw () { 
    this.graphics.clear()

    this.graphics.fillStyle(0xcfceac, 1)

    let max = false
    let x = paddingX
    let y = this.y

    let cont = 0

    while (!max) {
      let width = this.nextRandom(this.width*0.8)
      if (x + width + lineHeight*1 > this.width) {
        this.graphics.fillRect(x, y, this.width - x - paddingX, lineHeight)
        x = paddingX
        y += lineHeight*1.5
        if(y + lineHeight*3.2 > this.height + this.y ) {
          max = true
        }
      }
      
      this.graphics.fillRect(x, y, width, lineHeight)
      x += width + lineHeight*1
    }
  }

  nextRandom (max) {
    return ~~(Math.random()*max) + lineHeight*2
  }
}
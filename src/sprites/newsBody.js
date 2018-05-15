
const lineHeight = 8
const paddingX = 5

export default class NewsBody {
  constructor (config) {
    this.graphics = config.graphics
    this.width = 0
    this.height = 0
    this.x = 0
    this.y = 0
    this.seed = Math.random().toString()
    this.pics = false
  }

  setupBounds(props) {
    this.width = props.width
    this.y = props.y
    this.height = props.height - props.y
    this.pics = props.pics
    console.log(props)
  }

  draw (cols) {
    this.graphics.clear()

    this.graphics.fillStyle(0xe0b799, 1)

    let localWidth = ((this.width-paddingX*2)/cols)
    let baseX = paddingX
    let pics = false || !this.pics
    for (var i = 0; i < cols; i++) {
      let base = i*localWidth
      let max = false
      let x = paddingX
      let y = this.y
      if (!pics) {
        pics = true
        let picSize = localWidth - paddingX*2
        this.graphics.fillRect(x + base + baseX, y, picSize, picSize)
        y = this.y + picSize + lineHeight*1.5
      }
      while (!max) {
        let width = this.nextRandom(localWidth*0.8)
        if (x + width + lineHeight*1 + paddingX> localWidth) {
          this.graphics.fillRect(x + base + baseX, y, localWidth - x - paddingX, lineHeight)
          x = paddingX
          y += lineHeight*1.5
          if(y + lineHeight*3.2 > this.height + this.y ) {
            max = true
          }
        } else {
          this.graphics.fillRect(x + base + baseX, y, width, lineHeight)
          x += width + lineHeight*1
        }
        if (max) {
          this.graphics.fillRect(x + base + baseX, y, width, lineHeight)
        }
        
      }
    }
  }

  nextRandom (max) {
    return ~~(Math.random()*max) + lineHeight*2
  }
}
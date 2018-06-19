import DraggableSprite from './draggableSprite'
// 150 / 160 clock center
// default pos 410, 540

const TIME_PER_MIN = 1 * 60 * 1000 // mins
let UPDATE_RATE = 60
let UNIT_RATE = (360 * UPDATE_RATE) / TIME_PER_MIN

export default class PocketWatch extends DraggableSprite {
  constructor (config) {
    super(config)
    this.contWatch = 0
    let scale = 0.5
    let watch = this.scene.add.sprite(0, 0,'clock').setOrigin(0).setScale(scale)
    let watchShadow = this.scene.add.sprite(5, 8,'clock').setOrigin(0).setScale(scale)
    this.hourArrow = this.scene.add.sprite(150*scale, 178*scale, 'arrows', 1).setOrigin(47/135, 0.5).setScale(scale)
    this.minuteArrow = this.scene.add.sprite(150*scale, 178*scale, 'arrows', 0).setOrigin(47/135, 0.5).setScale(scale)
    this.hourArrow.setAngle(270)
    this.minuteArrow.setAngle(270)
    
    watchShadow.setTint(0)
    watchShadow.setAlpha(0)
    this.container.add(watchShadow)
    this.container.add(watch)
    this.container.add(this.hourArrow)
    this.container.add(this.minuteArrow)
    this.container.x = this.x
    this.container.y = this.y
    this.alarm = {hour:-1, min:-1}
    this.setTime(4, 58)
    this.setAlarm(5, 0)

    this.container.drawShadow = (alpha) => {
      watchShadow.setAlpha(alpha)
    }
  }
  
  drawShadow () {}

  update (dt) {
    this.contWatch++
    if (this.contWatch === UPDATE_RATE) {
      let unit = UNIT_RATE*dt
      this.minuteArrow.angle += unit
      this.hourArrow.angle += (unit/12)
      this.contWatch = 0
      this.checkAlarm()
    }
  }

  setTime (hour, min) {
    hour = hour % 12
    min = min % 60
    this.minuteArrow.setAngle(270 + (360/60)*min)
    hour = hour + min/60
    this.hourArrow.setAngle(270 + (360/12)*hour)
  }

  setAlarm (hour, min) {
    this.alarm = {hour: hour%12, min: min%60, triggered: false}
  }

  checkAlarm () {
    if(this.alarm.triggered) return

    let hour = ~~((this.hourArrow.angle*(12/360) + 15) % 12)
    let min = ~~((this.minuteArrow.angle*(60/360) + 75) % 60)
    if (hour == this.alarm.hour && min == this.alarm.min) {
      this.alarm.triggered = true
      this.scene.sound.add('tick').play()
    }
  }
}
import dialogue from '../assets/dialogues.json'

let container = document.getElementById('container')

let main = () => {
  let keys = Object.keys(dialogue)
  keys.forEach((key) => {
    let dialogueScene = dialogue[key]

    displayDate(key, dialogueScene)
  })
}

let displayDate = (date, dialogueScene) => {
  let box = document.createElement('div')
  box.className = 'scene'
  let keys = Object.keys(dialogueScene)
  let label = document.createElement('label')
  label.innerHTML = `Date: ${date}`
  box.appendChild(label)

  keys.forEach((key) => {
    let value = dialogueScene[key]
    if(!value.text) return
    box.appendChild(displayDialogue(key, value, date))
  })



  container.appendChild(box)
}

let displayDialogue = (key, dialogueScene, date) => {
  let box = document.createElement('div')
  box.className = 'line'
  let label = document.createElement('label')
  label.innerHTML = `Dialogue: ${key}`
  let mainText = document.createElement('textarea')
  mainText.className = 'text'
  mainText.innerText = dialogueScene.text
  mainText.setAttribute('data-key', `${date}::${key}`)

  mainText.oninput = (event) => {
    let key = event.target.getAttribute('data-key').split('::')
    dialogue[key[0]][key[1]].text = event.target.value
    parseText()
  }
  let optionsText = document.createElement('label')
  optionsText.innerHTML = 'Options:'


  let options = document.createElement('ul')
  dialogueScene.options.forEach((option, index) => {
    let optionDiv = document.createElement('li')
    optionDiv.className = 'optionBox'

    let optionText = document.createElement('textarea')
    optionText.innerText = option.text
    optionText.setAttribute('data-key', `${date}::${key}::${index}`)
    optionText.oninput = (event) => {
      let key = event.target.getAttribute('data-key').split('::')
      dialogue[key[0]][key[1]].options[parseInt(key[2])] = event.target.value
      parseText()
    }

    let then = document.createElement('label')
    then.setAttribute('type', 'text')
    if (option.then) {
      then.innerHTML = `Goes to => Dialogue ${option.then}`
    } else {
      then.innerHTML = 'Ends scene.'
    }

    optionDiv.appendChild(optionText)
    optionDiv.appendChild(then)
    options.appendChild(optionDiv)
  })
  
  box.appendChild(label)
  box.appendChild(mainText)
  box.appendChild(optionsText)
  box.appendChild(options)

  return box
}

let exportedText = document.getElementById('exported')

let parseText = () => {
  let dialogueAsString = JSON.stringify(dialogue, '\n',2)
  exportedText.innerText = dialogueAsString
}

main()
parseText()
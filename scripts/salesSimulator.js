import {getSalesManager} from '../src/salesManager'

let salesManager = getSalesManager()

let articlesBase = [
  {
    market: 1000000*Math.random(),
    sensacionalism: 2 - 1.5*Math.random(),
    relevance: 1.5 - 0.75*Math.random()
  }, {
    market: 1000000*Math.random(),
    sensacionalism: 2 - 1.5*Math.random(),
    relevance: 1.5 - 0.75*Math.random()
  }, {
    market: 1000000*Math.random(),
    sensacionalism: 2 - 1.5*Math.random(),
    relevance: 1.5 - 0.75*Math.random()
  }, {
    market: 1000000*Math.random(),
    sensacionalism: 2 - 1.5*Math.random(),
    relevance: 1.5 - 0.75*Math.random()
  }, {
    market: 1000000*Math.random(),
    sensacionalism: 2 - 1.5*Math.random(),
    relevance: 1.5 - 0.75*Math.random()
  }
]

/*articlesBase = [
  {
    market: 1000000,
    sensacionalism: 2,
    relevance: 1.5
  }, {
    market: 1000000,
    sensacionalism: 2,
    relevance: 1.5
  }, {
    market: 1000000,
    sensacionalism: 2,
    relevance: 1.5
  }, {
    market: 1000000,
    sensacionalism: 2,
    relevance: 1.5
  }, {
    market: 1000000,
    sensacionalism: 2,
    relevance: 1.5
  }
]*/
let sortExp = []
let letters = 'abcde'
for (var i = 0; i < letters.length; i++) {
  for (var j = 0; j < letters.length; j++) {
    for (var k = 0; k < letters.length; k++) {
      for (var l = 0; l < letters.length; l++) {
        for (var m = 0; m < letters.length; m++) {
          if(i==j||i==k||i==l||i==m||j==k||j==l||j==m||k==l||k==m||l==m) continue
          sortExp.push(`${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}`)
        }
      }
    }
  }
}

function printResults(results) {
  return `${results.variation} t: ${~~results.total} c: ${results.coverage.toFixed(4)} r: ${results.reputation.toFixed(4)}`
}

function runSimulation(articles, layout) {
  let results = []
  sortExp.forEach(combination => {
    let sortedArticles = combination.split('').map((letter)=>{
      let index = 'abcde'.indexOf(letter)
      let article = articles[index]
      return JSON.parse(JSON.stringify(article))
    })
    salesManager.resetStats()
    let total = salesManager.calculateSales(sortedArticles, layout)
    results.push({variation: combination, total: total, coverage:salesManager.sensacionalism, reputation:salesManager.reputation})
  })

  results.sort((a, b)=> a.total - b.total)


  let average = 0
  results.forEach(result => {
    average += result.total
  })
  average = average/results.length

  for (var i = 0; i < 1; i++) {
    console.log('max', printResults(results[results.length-i-1]))
  }
  for (var i = 0; i < 1; i++) {
    console.log('min', printResults(results[i]))
  }
  console.log('avg', average,' bridge', results[results.length-1].total-results[0].total)
  return results
}

function drawResults(canvas, results) {
  let context = canvas.getContext('2d')
  let xMin = results[0].total
  let xMax = results[results.length-1].total
  let average = 0
  results.forEach(result => {
    average += result.total
  })

  average = average/results.length

  let groupInterval = 10
  let interval = canvas.width/(xMax - xMin)

  let groups = []
  for (var i = 0; i < (xMax-xMin)/groupInterval; i++) {
    groups.push(0)
  }
  groups.push(xMax)
  console.log('estol es', groups.length)
  
  let index = 1
  results.forEach(result => {
    if(result.total>=(xMin + index*groupInterval)){
      index++
    }
    groups[index]++
  })
  context.clearRect(0,0,canvas.width, canvas.height)
  context.strokeStyle='#000000'
  groups.forEach((group, index) => {
    let value = index*groupInterval*interval
    context.strokeRect(value, 600-group*10, 1,group*10)
  })
  context.strokeStyle='#FF0000'
  context.strokeRect((average-xMin)*interval, 0, 1,600)
}

try{
  //let canvas = document.getElementById('data-display')
  
  let layouts = [
    [2, 0.8, 0.2, 0, 0],
    [2, 0.5, 0.5, 0, 0],
    [1.6, 1.0, 0.6, 0.3, 0],
    [1.5, 0.8, 0.6, 0.6, 0],
    [1.2, 1.2, 0.6, 0.6, 0.4],
    [1.2, 1, 0.8, 0.5, 0.5]
  ]
  let avgScore = 0
  articlesBase = articlesBase.map((article) => {
    article.avg = ~~(article.market*article.relevance*article.sensacionalism/1000)
    avgScore+=(article.avg/5)
    return article
  })
  
  console.log(articlesBase)
  console.log('avg score', avgScore)
  layouts.forEach((layout)=>{
    console.log('layout>', layout)
    let results = runSimulation(articlesBase, layout)
  })
  //drawResults(canvas, results)

  //let mainText = document.getElementById('articles')
  
  //mainText.innerText = JSON.stringify(articlesBase, undefined,2)
  //let articlesData = articlesBase
  //let layoutData = [1.5,1.2,1,0.6,0.4]
/*
  mainText.onchange = (event) => {
    articlesData = JSON.parse(mainText.value)
    results = runSimulation(articlesData, layoutData)
    drawResults(canvas, results)
  }  
  document.body.appendChild(mainText)

  let layout = document.getElementById('layout')
  layout.value = JSON.stringify(layoutData)
  layout.onchange = (event) => {
    layoutData = JSON.parse(layout.value)
    results = runSimulation(articlesData, layoutData)
    drawResults(canvas, results)
  }
*/
}catch(error){
  console.log('not in html')
  console.error(error)
}
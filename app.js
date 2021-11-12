const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time =0
const timeEL=document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0

startBtn.addEventListener('click',(event)=>{
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener('click',event =>{
    if(event.target.classList.contains('time-btn')){
        time =parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime(){
    if(time ===0){
        finishGame()
    }else{
      let current = --time
      if(current<10){ current=`0${current}`}
      setTime(current)  
    }
    
    
}

function setTime(value){
    
    timeEL.innerHTML=`00:${value}`
}

function finishGame(){
    timeEL.parentNode.classList.add('hide')
    board.innerHTML= `<h1>Счёт: <span class='primary'>${score}</span></h1>`
}


board.addEventListener('click', event =>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})




const colors =['red', 'black', 'white', 'gray']
function getRandomeColor(){
    return colors[Math.floor(Math.random()* colors.length)]
}


function createRandomCircle(){
    const color = getRandomeColor()
    const circle = document.createElement('div')
    const size = getRandomNumber(15, 60)
    circle.classList.add('circle')
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0,width- size)
    const y = getRandomNumber(0,height- size)
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    circle.style.boxShadow= `0 0 2px ${color}, 0 0 10px ${color}`
    circle.style.background =color

    circle.style.width=`${size}px`
    circle.style.height=`${size}px`
    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)
}


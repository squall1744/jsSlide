let container = document.querySelector('.container')
let wrapper = document.querySelector('.wrapper')
let next = document.querySelector('.right')
let prev = document.querySelector('.left')
let index = 0
let animationing = false
let focused = false

cloneChild()

autoPlay()

bindEvent()

function cloneChild() {
  let fisrtChild = wrapper.firstElementChild.cloneNode()
  let lastChild = wrapper.lastElementChild.cloneNode()
  wrapper.append(fisrtChild)
  wrapper.prepend(lastChild)
}


function changeImg(step) {
  wrapper.style.transition = 'all .5s'
  let newPosition = parseInt(wrapper.style.left) - 400 * step
  wrapper.style.left = `${newPosition}px`
  index += step
}

function nextImg() {
  if(!animationing) {
    animationing = true
    changeImg(1)
  }
}

function prevImg() {
  if(!animationing) {
    animationing = true
    changeImg(-1)
  }
}

function seamless() {
  if(index > 4) {
    wrapper.style.transition = 'all 0s'
    wrapper.style.left = '-400px'
    index = 0
  }else if(index < 0) {
    wrapper.style.transition = 'all 0s'
    wrapper.style.left = '-2000px'
    index = 4    
  }
}

function autoPlay() {
  let id = setTimeout(function fn() {
    nextImg()
    if(!focused) {
      id = setTimeout(fn, 1000)
    }
  }, 1000)  
}


function bindEvent() {
  next.addEventListener('click', e => {
    nextImg()
  })

  prev.addEventListener('click', e => {
    prevImg()
  })

  wrapper.addEventListener('transitionend', e=> {
    animationing = false
    seamless()
  })

  container.addEventListener('mouseenter', e => {
    focused = true
  })

  container.addEventListener('mouseleave', e => {
    focused = false
    autoPlay()
  })
}
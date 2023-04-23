import { createFullDocumentCanvas } from "@sanjo/canvas"

const { context, canvas } = createFullDocumentCanvas()
document.body.append(canvas)

let xBefore = null
let yBefore = null

let x = 0
let y = 0

const WIDTH = 50
const HEIGHT = 50

let xOffset = WIDTH

function draw() {
  if (typeof xBefore === 'number' && typeof yBefore === 'number') {
    context.clearRect(xBefore, yBefore, WIDTH, HEIGHT)
  }

  context.beginPath()
  context.fillStyle = "blue"
  context.rect(x, y, WIDTH, HEIGHT)
  context.fill()

  xBefore = x
  yBefore = y

  x += xOffset
  if (x < 0 || x + WIDTH >= canvas.width) {
    xOffset = -xOffset
    x += xOffset
  }
}

setTimeout(function () {
  draw()
  setInterval(draw, 50)

  let x = null
  let y = null

  setInterval(function () {
    if (typeof x === 'number' && typeof y === 'number') {
      context.clearRect(x, y, WIDTH, HEIGHT)
    }

    x = randomInteger(0, canvas.width - 1 - WIDTH)
    y = randomInteger(0, canvas.height - 1 - HEIGHT)

    context.beginPath()
    context.fillStyle = "red"
    context.rect(
      x,
      y,
      WIDTH,
      HEIGHT,
    )
    context.fill()
  }, 60000 / (128 / 2))
}, 500)

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}

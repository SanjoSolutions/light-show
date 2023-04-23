import { createFullDocumentCanvas } from "@sanjo/canvas"
import { randomColor } from "./unnamed/randomColor.js"
import { animate } from '@sanjo/animate'

const { context, canvas } = createFullDocumentCanvas()
document.body.append(canvas)

const WIDTH = 50
const HEIGHT = 50

function createRowDrawing(y, color) {
  let xBefore = null
  let yBefore = null

  let x = randomInteger(0, canvas.width - WIDTH)

  const OFFSET = 1
  let xOffset = randomSign() * OFFSET

  function draw(elapsedTime) {
    if (typeof xBefore === "number" && typeof yBefore === "number") {
      context.clearRect(Math.round(xBefore), yBefore, WIDTH, HEIGHT)
    }

    if (elapsedTime) {
      x += 0.025 * elapsedTime * xOffset
      if (x < 0) {
        xOffset = OFFSET
        x += xOffset
      }
      if (x + WIDTH >= canvas.width) {
        xOffset = -OFFSET
        x += xOffset
      }
    }

    context.beginPath()
    context.fillStyle = color
    context.rect(Math.round(x), y, WIDTH, HEIGHT)
    context.fill()

    xBefore = x
    yBefore = y
  }

  return draw
}

const rows = []
for (let y = 0; y <= canvas.height - HEIGHT; y += HEIGHT) {
  const { hue, saturation, lightness } = randomColor()
  const row = createRowDrawing(
    y,
    `hsl(${ hue }deg ${ saturation * 100 }% ${ lightness * 100 }%)`,
  )
  rows.push(row)
}

animate(function (elapsedTime) {
  for (const drawRow of rows) {
    drawRow(elapsedTime)
  }
  setInterval(function () {
    for (const drawRow of rows) {
      drawRow(elapsedTime)
    }
  }, 50)

  // let x = null
  // let y = null

  // setInterval(function () {
  //   if (typeof x === "number" && typeof y === "number") {
  //     context.clearRect(x, y, WIDTH, HEIGHT)
  //   }
  //
  //   x = randomInteger(0, canvas.width - 1 - WIDTH)
  //   y = randomInteger(0, canvas.height - 1 - HEIGHT)
  //
  //   context.beginPath()
  //   context.fillStyle = "red"
  //   context.rect(
  //     x,
  //     y,
  //     WIDTH,
  //     HEIGHT,
  //   )
  //   context.fill()
  // }, 60000 / (128 / 2))
})

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}

function randomSign() {
  return randomInteger(0, 1) === 0 ? -1 : 1
}

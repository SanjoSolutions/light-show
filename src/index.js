import { createFullDocumentCanvas } from "@sanjo/canvas"

const { context, canvas } = createFullDocumentCanvas()
document.body.append(canvas)

context.fillStyle = "blue"

let x = 0
let y = 0

const WIDTH = 50
const HEIGHT = 50

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.rect(x, y, WIDTH, HEIGHT)
  context.fill()

  x += WIDTH
  if (x + WIDTH >= canvas.width) {
    y += HEIGHT
    x = 0
  }
  if (y + HEIGHT >= canvas.height) {
    y = 0
  }
}

setTimeout(function () {
  draw()
  setInterval(draw, 50)
}, 500)

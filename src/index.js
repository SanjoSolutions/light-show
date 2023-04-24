import { animate } from "@sanjo/animate"
import { createFullDocumentCanvas } from "@sanjo/canvas"
import { generateRandomFloat } from "@sanjo/random"
import { randomColor } from "./unnamed/randomColor.js"

const WIDTH = 50
const HEIGHT = 50

function createRowDrawing(canvas, context, y, color) {
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
      x += 0.10 * elapsedTime * xOffset
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

function createRowDrawing2(canvas, context, y, color) {
  let xBefore = null
  let yBefore = null

  let angle = generateRandomFloat(0, 2 * Math.PI)
  let x = randomInteger(0, canvas.width - WIDTH)

  const OFFSET = 1
  let xOffset = randomSign() * OFFSET

  const angleOffset = 2 * Math.PI / 360

  function draw(elapsedTime) {
    if (elapsedTime) {
      x += 0.10 * elapsedTime * xOffset
      if (x < 0) {
        xOffset = OFFSET
        x += xOffset
      }
      if (x + WIDTH >= canvas.width) {
        xOffset = -OFFSET
        x += xOffset
      }

      if (xOffset > 0) {
        angle += angleOffset
      } else if (xOffset < 0) {
        angle -= angleOffset
      }
    }

    context.save()

    context.translate(Math.round(x) + 0.5 * WIDTH, y + 0.5 * HEIGHT)
    context.rotate(angle)

    context.beginPath()
    context.fillStyle = color
    context.rect(-0.5 * WIDTH, -0.5 * HEIGHT, WIDTH, HEIGHT)
    context.fill()

    context.restore()

    xBefore = x
    yBefore = y
  }

  return draw
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}

function randomSign() {
  return randomInteger(0, 1) === 0 ? -1 : 1
}

function animate1(canvas, context) {
  const rows = []
  for (let y = 0; y <= canvas.height - HEIGHT; y += HEIGHT) {
    const { hue, saturation, lightness } = randomColor()
    const row = createRowDrawing(
      canvas,
      context,
      y,
      `hsl(${ hue }deg ${ saturation * 100 }% ${ lightness * 100 }%)`,
    )
    rows.push(row)
  }

  return animate(function (elapsedTime) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (const drawRow of rows) {
      drawRow(elapsedTime)
    }
  })
}

function animate2(canvas, context) {
  const rows = []
  for (let y = 0; y <= canvas.height - HEIGHT; y += HEIGHT) {
    const { hue, saturation, lightness } = randomColor()
    const row = createRowDrawing2(
      canvas,
      context,
      y,
      `hsl(${ hue }deg ${ saturation * 100 }% ${ lightness * 100 }%)`,
    )
    rows.push(row)
  }

  return animate(function (elapsedTime) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (const drawRow of rows) {
      drawRow(elapsedTime)
    }
  })
}

export function main() {
  const { context, canvas } = createFullDocumentCanvas()
  document.body.append(canvas)

  animate1(canvas, context)
}

export function main2() {
  const { context, canvas } = createFullDocumentCanvas()
  document.body.append(canvas)

  animate2(canvas, context)
}

export function main3() {
  const { context, canvas } = createFullDocumentCanvas()
  document.body.append(canvas)

  const animations = [
    animate1,
    animate2,
  ]

  let currentIndex = 0
  let stop = null

  function startCurrentAnimation() {
    stop = animations[currentIndex](canvas, context).stop
  }

  startCurrentAnimation()

  setInterval(function () {
    if (stop) {
      stop()
    }

    currentIndex = (currentIndex + 1) % animations.length
    startCurrentAnimation()
  }, 5000)
}

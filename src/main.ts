import './style.css'
import game from './game.ts'

const canvas = document.createElement('canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
document.body.appendChild(canvas)

game(canvas, { id: Math.random().toString() })

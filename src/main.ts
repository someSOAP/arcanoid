import './style.css'
import game from './game.ts'
import { debounce } from '@/utils'

const canvas = document.createElement('canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
document.body.appendChild(canvas)

let unsubscribe = game(canvas)

const rerenderGame = debounce(() => {
  unsubscribe()
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  unsubscribe = game(canvas)
}, 50)

window.addEventListener('resize', rerenderGame)

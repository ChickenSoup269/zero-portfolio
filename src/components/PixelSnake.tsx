"use client"

import React, { useRef, useEffect } from "react"
import { useAnimation } from "@/app/AnimationContext"

const PixelSnake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setIsGameOver, setGameController, setCurrentScore } = useAnimation()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // --- GAME SETTINGS ---
    const gridSize = 20
    let lastTime = 0
    let speed = 10 // moves per second
    let gameActive = false

    interface Point {
      x: number
      y: number
    }

    let snake: Point[] = []
    let direction: Point = { x: 1, y: 0 }
    let nextDirection: Point = { x: 1, y: 0 }
    let food: Point = { x: 0, y: 0 }
    let score = 0

    // --- STARS BACKGROUND ---
    interface Star {
      x: number
      y: number
      vy: number
      size: number
      alpha: number
    }
    let stars: Star[] = []
    const createStars = () => {
      stars = []
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: Math.random() * 1.5 + 0.5,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
        })
      }
    }

    const spawnFood = () => {
      const cols = Math.floor(width / gridSize)
      const rows = Math.floor(height / gridSize)
      food = {
        x: Math.floor(Math.random() * cols) * gridSize,
        y: Math.floor(Math.random() * rows) * gridSize,
      }
    }

    const handleStartGame = () => {
      setIsGameOver(false)
      gameActive = true
      score = 0
      speed = 10
      const centerX = Math.floor(width / (2 * gridSize)) * gridSize
      const centerY = Math.floor(height / (2 * gridSize)) * gridSize
      snake = [
        { x: centerX, y: centerY },
        { x: centerX - gridSize, y: centerY },
        { x: centerX - 2 * gridSize, y: centerY },
      ]
      direction = { x: 1, y: 0 }
      nextDirection = { x: 1, y: 0 }
      spawnFood()
    }

    setGameController({ startGame: handleStartGame })

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if ((key === "w" || key === "arrowup") && direction.y === 0) nextDirection = { x: 0, y: -1 }
      if ((key === "s" || key === "arrowdown") && direction.y === 0) nextDirection = { x: 0, y: 1 }
      if ((key === "a" || key === "arrowleft") && direction.x === 0) nextDirection = { x: -1, y: 0 }
      if ((key === "d" || key === "arrowright") && direction.x === 0) nextDirection = { x: 1, y: 0 }
    }

    // --- TOUCH / MOUSE CONTROLS (Swipe detection) ---
    let touchStartX = 0
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX
      const dy = e.changedTouches[0].clientY - touchStartY
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30 && direction.x === 0) nextDirection = { x: 1, y: 0 }
        else if (dx < -30 && direction.x === 0) nextDirection = { x: -1, y: 0 }
      } else {
        if (dy > 30 && direction.y === 0) nextDirection = { x: 0, y: 1 }
        else if (dy < -30 && direction.y === 0) nextDirection = { x: 0, y: -1 }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    const update = () => {
      if (!gameActive) return

      direction = nextDirection
      const head = { ...snake[0] }
      head.x += direction.x * gridSize
      head.y += direction.y * gridSize

      // Wall collision (wrap)
      if (head.x < 0) head.x = Math.floor(width / gridSize) * gridSize - gridSize
      if (head.x >= width) head.x = 0
      if (head.y < 0) head.y = Math.floor(height / gridSize) * gridSize - gridSize
      if (head.y >= height) head.y = 0

      // Self collision
      if (snake.some(p => p.x === head.x && p.y === head.y)) {
        gameActive = false
        setIsGameOver(true)
        setCurrentScore(score)
        return
      }

      snake.unshift(head)

      // Food collision
      if (Math.abs(head.x - food.x) < gridSize && Math.abs(head.y - food.y) < gridSize) {
        score += 10
        speed += 0.2
        spawnFood()
      } else {
        snake.pop()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Render Stars
      const foregroundColor = getComputedStyle(document.body).getPropertyValue("color")
      ctx.fillStyle = foregroundColor
      stars.forEach(s => {
        ctx.globalAlpha = s.alpha
        ctx.fillRect(s.x, s.y, s.size, s.size)
        s.y += s.vy
        if (s.y > height) {
          s.y = 0
          s.x = Math.random() * width
        }
      })
      ctx.globalAlpha = 1

      if (gameActive) {
        // Render Food
        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2)
        ctx.fill()

        // Render Snake
        snake.forEach((p, i) => {
          ctx.fillStyle = i === 0 ? "var(--primary)" : "#3b82f6"
          ctx.fillRect(p.x + 1, p.y + 1, gridSize - 2, gridSize - 2)
          if (i === 0) {
              // Add eyes
              ctx.fillStyle = "#fff"
              const eyeSize = 3
              if (direction.x === 1) {
                  ctx.fillRect(p.x + gridSize - 6, p.y + 4, eyeSize, eyeSize)
                  ctx.fillRect(p.x + gridSize - 6, p.y + gridSize - 7, eyeSize, eyeSize)
              } else if (direction.x === -1) {
                  ctx.fillRect(p.x + 3, p.y + 4, eyeSize, eyeSize)
                  ctx.fillRect(p.x + 3, p.y + gridSize - 7, eyeSize, eyeSize)
              } else if (direction.y === 1) {
                  ctx.fillRect(p.x + 4, p.y + gridSize - 6, eyeSize, eyeSize)
                  ctx.fillRect(p.x + gridSize - 7, p.y + gridSize - 6, eyeSize, eyeSize)
              } else {
                  ctx.fillRect(p.x + 4, p.y + 3, eyeSize, eyeSize)
                  ctx.fillRect(p.x + gridSize - 7, p.y + 3, eyeSize, eyeSize)
              }
          }
        })

        // HUD
        ctx.fillStyle = foregroundColor
        ctx.font = "20px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(`Score: ${score}`, 10, 30)
      }
    }

    let animationFrameId: number
    const animate = (time: number) => {
      if (time - lastTime > 1000 / speed) {
        update()
        lastTime = time
      }
      render()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      createStars()
      if (gameActive) handleStartGame()
    }
    window.addEventListener("resize", handleResize)

    createStars()
    handleStartGame()
    animate(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [setIsGameOver, setGameController, setCurrentScore])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
}

export default PixelSnake

"use client"

import React, { useRef, useEffect, useCallback } from "react"
import { useAnimation } from "@/app/AnimationContext"

const PixelWar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setIsBossActive, setIsGameOver, setIsVictory, setCurrentScore, setGameController } = useAnimation()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const bossImage = new Image()
    bossImage.crossOrigin = "anonymous"
    bossImage.src = "https://avatars.githubusercontent.com/u/95624468?v=4"
    let isBossImageLoaded = false
    bossImage.onload = () => {
      isBossImageLoaded = true
    }

    // --- INTERFACES ---
    interface GameObject {
      x: number
      y: number
      width: number
      height: number
      color: string
    }
    interface Player extends GameObject {
      hp: number
      maxHp: number
      shield: number // timer
    }
    interface Bullet extends GameObject {
      vy: number
      vx?: number
    }
    interface Monster extends GameObject {
      vx: number
      vy: number
    }
    interface Star {
      x: number
      y: number
      vy: number
      size: number
      alpha: number
    }
    interface Boss extends GameObject {
      hp: number
      maxHp: number
      vx: number
      type: "spiral" | "blast" | "wave" | "homing"
    }
    interface PowerUp extends GameObject {
      type: "triple" | "rapid" | "shield" | "heart" | "virus"
      vy: number
    }

    // --- GAME STATE ---
    let player: Player
    let bullets: Bullet[]
    let enemyBullets: Bullet[]
    let monsters: Monster[]
    let stars: Star[]
    let boss: Boss | null
    let level: number
    let monsterDirection: number
    let fireCooldown: number
    let keysPressed: { [key: string]: boolean }
    let isGameActive = false
    let powerUps: PowerUp[]
    let tripleShotTimer: number
    let rapidFireTimer: number
    let virusTimer: number
    let score: number
    let bestScore: number = 0
    let lastBossLevel = 0

    // Load best score
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pixelWarBestScore")
      if (saved) bestScore = parseInt(saved)
    }

    const monsterSpeed = 0.5
    const monsterRows = 4
    const monsterCols = 10
    const playerMoveSpeed = 4

    // --- GAME LIFECYCLE ---
    const handleStartGame = () => {
      setIsBossActive(false)
      setIsGameOver(false)
      setIsVictory(false)
      isGameActive = true
      score = 0
      player = {
        x: width / 2 - 25,
        y: height - 50,
        width: 50,
        height: 20,
        color: "var(--primary)",
        hp: 3,
        maxHp: 3,
        shield: 0,
      }
      bullets = []
      enemyBullets = []
      monsters = []
      boss = null
      level = 1
      lastBossLevel = 0
      monsterDirection = 1
      fireCooldown = 0
      keysPressed = {}
      powerUps = []
      tripleShotTimer = 0
      rapidFireTimer = 0
      virusTimer = 0
      createMonsters()
    }

    const createStars = () => {
      stars = []
      const starCount = 200
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: Math.random() * 1.5 + 0.5,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
        })
      }
    }

    const createMonsters = () => {
      monsters = []
      const monsterWidth = 30
      const monsterHeight = 20
      const padding = 15
      const baseMonsterColor = "var(--foreground)"

      const formations: ("grid" | "v" | "circle" | "random")[] = ["grid", "v", "circle", "random"]
      const formation = level === 1 ? "grid" : formations[Math.floor(Math.random() * formations.length)]

      if (formation === "grid") {
        const offsetX = (width - monsterCols * (monsterWidth + padding)) / 2
        for (let r = 0; r < monsterRows; r++) {
          for (let c = 0; c < monsterCols; c++) {
            monsters.push({
              x: offsetX + c * (monsterWidth + padding),
              y: 50 + r * (monsterHeight + padding),
              width: monsterWidth,
              height: monsterHeight,
              color: baseMonsterColor,
              vx: monsterSpeed * monsterDirection,
              vy: 0,
            })
          }
        }
      } else if (formation === "v") {
        const midX = width / 2
        for (let i = 0; i < 15; i++) {
          const side = i % 2 === 0 ? 1 : -1
          const factor = Math.floor(i / 2)
          monsters.push({
            x: midX + side * factor * 40 - monsterWidth / 2,
            y: 50 + factor * 30,
            width: monsterWidth,
            height: monsterHeight,
            color: baseMonsterColor,
            vx: monsterSpeed * monsterDirection,
            vy: 0,
          })
        }
      } else if (formation === "circle") {
        const centerX = width / 2, centerY = 150, radius = 120
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2
          monsters.push({
            x: centerX + Math.cos(angle) * radius - monsterWidth / 2,
            y: centerY + Math.sin(angle) * radius - monsterHeight / 2,
            width: monsterWidth,
            height: monsterHeight,
            color: baseMonsterColor,
            vx: monsterSpeed * monsterDirection,
            vy: 0,
          })
        }
      } else {
        // Random clusters
        for (let i = 0; i < 20; i++) {
          monsters.push({
            x: Math.random() * (width - 100) + 50,
            y: Math.random() * 200 + 50,
            width: monsterWidth,
            height: monsterHeight,
            color: baseMonsterColor,
            vx: monsterSpeed * monsterDirection * (Math.random() + 0.5),
            vy: 0,
          })
        }
      }
    }

    const createBoss = () => {
      setIsBossActive(true)
      const isFinalBoss = level === 20
      const types: ("spiral" | "blast" | "wave" | "homing")[] = ["spiral", "blast", "wave", "homing"]
      const type = types[Math.floor(Math.random() * types.length)]

      boss = {
        x: width / 2 - (isFinalBoss ? 150 : 100),
        y: 80,
        width: isFinalBoss ? 300 : 200,
        height: isFinalBoss ? 300 : 200,
        color: isFinalBoss ? "#ef4444" : "var(--foreground)",
        hp: level * 20,
        maxHp: level * 20,
        vx: 1.5 + level * 0.05,
        type: isFinalBoss ? "blast" : type,
      }
      lastBossLevel = level
    }

    // --- EVENT LISTENERS & CONTROLLER REGISTRATION ---
    setGameController({ startGame: handleStartGame })

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = false
    }

    const handleTouch = (e: TouchEvent) => {
      if (!isGameActive) return
      const touch = e.touches[0]
      player.x = touch.clientX - player.width / 2
      player.y = touch.clientY - player.height / 2
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isGameActive) return
      player.x = e.clientX - player.width / 2
      player.y = e.clientY - player.height / 2
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("touchstart", handleTouch, { passive: true })
    window.addEventListener("touchmove", handleTouch, { passive: true })
    window.addEventListener("mousemove", handleMouseMove)

    // --- UPDATE LOGIC ---
    const update = () => {
      if (!isGameActive) {
        // Still draw stars when game is not active
        stars.forEach((star) => {
          star.y += star.vy
          if (star.y > height) {
            star.y = 0
            star.x = Math.random() * width
          }
        })
        return
      }

      stars.forEach((star) => {
        star.y += star.vy
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }
      })

      if (keysPressed["a"]) player.x -= playerMoveSpeed
      if (keysPressed["d"]) player.x += playerMoveSpeed
      if (keysPressed["w"]) player.y -= playerMoveSpeed
      if (keysPressed["s"]) player.y += playerMoveSpeed
      player.x = Math.max(0, Math.min(width - player.width, player.x))
      player.y = Math.max(0, Math.min(height - player.height, player.y))

      if (player.shield > 0) player.shield--

      fireCooldown--
      if (fireCooldown <= 0) {
        const baseBullet = {
          x: player.x + player.width / 2 - 2.5,
          y: player.y,
          width: 5,
          height: 15,
          vy: -8,
          color: tripleShotTimer > 0 ? "#fbbf24" : "var(--primary)",
        }

        if (tripleShotTimer > 0) {
          // Straight
          bullets.push({ ...baseBullet })
          // Left
          bullets.push({ ...baseBullet, x: baseBullet.x - 5, vy: -7, vx: -2 } as Bullet)
          // Right
          bullets.push({ ...baseBullet, x: baseBullet.x + 5, vy: -7, vx: 2 } as Bullet)
        } else {
          bullets.push(baseBullet as Bullet)
        }
        fireCooldown = rapidFireTimer > 0 ? 8 : 20
      }

      bullets.forEach((b, i) => {
        b.y += b.vy
        if (b.vx) b.x += b.vx // Apply horizontal velocity for angled shots
        if (b.y < 0) bullets.splice(i, 1)
      })

      enemyBullets.forEach((eb, i) => {
        eb.y += eb.vy
        if (eb.vx) eb.x += eb.vx
        if (eb.y > height || eb.y < 0 || eb.x < 0 || eb.x > width) {
          enemyBullets.splice(i, 1)
        } else if (
          eb.x < player.x + player.width &&
          eb.x + eb.width > player.x &&
          eb.y < player.y + player.height &&
          eb.y + eb.height > player.y
        ) {
          enemyBullets.splice(i, 1)
          if (player.shield <= 0) {
            player.hp--
            if (player.hp <= 0) {
              isGameActive = false
              setIsGameOver(true)
              setCurrentScore(score)
              if (score > bestScore) {
                bestScore = score
                localStorage.setItem("pixelWarBestScore", bestScore.toString())
              }
            } else {
              player.shield = 120 // 2s i-frames
            }
          }
        }
      })

      // Update Power-ups
      powerUps.forEach((p, i) => {
        p.y += p.vy
        // Player collision
        if (
          p.x < player.x + player.width &&
          p.x + p.width > player.x &&
          p.y < player.y + player.height &&
          p.y + p.height > player.y
        ) {
          if (p.type === "triple") tripleShotTimer += 600 // 10s at 60fps (Stacking)
          else if (p.type === "rapid") rapidFireTimer += 600
          else if (p.type === "shield") player.shield += 480 // 8s
          else if (p.type === "heart") player.hp = Math.min(player.maxHp, player.hp + 1)
          else if (p.type === "virus") virusTimer += 300 // Stack 5s
          powerUps.splice(i, 1)
        } else if (p.y > height) {
          powerUps.splice(i, 1)
        }
      })

      if (tripleShotTimer > 0) tripleShotTimer--
      if (rapidFireTimer > 0) rapidFireTimer--

      // Virus Debuff logic
      if (virusTimer > 0) {
        virusTimer--
        if (virusTimer % 180 === 0 && player.shield <= 0) { // Take dmg every 3s
          player.hp--
          if (player.hp <= 0) { isGameActive = false; setIsGameOver(true); return }
        }
      }

      if (boss) {
        boss.x += boss.vx
        if (boss.x <= 0 || boss.x + boss.width >= width) boss.vx *= -1

        // Boss Attack Patterns
        const time = Date.now() / 1000
        if (boss.type === "spiral" && Math.random() < 0.1) {
          const angle = time * 5
          enemyBullets.push({
            x: boss.x + boss.width / 2, y: boss.y + boss.height / 2,
            width: 8, height: 8, vy: Math.sin(angle) * 4, vx: Math.cos(angle) * 4,
            color: "#f87171"
          } as Bullet)
        } else if (boss.type === "blast" && Math.random() < 0.02) {
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
            enemyBullets.push({
              x: boss.x + boss.width / 2, y: boss.y + boss.height / 2,
              width: 10, height: 10, vy: Math.sin(a) * 5, vx: Math.cos(a) * 5,
              color: "#ef4444"
            } as Bullet)
          }
        } else if (boss.type === "wave" && Math.random() < 0.05) {
          enemyBullets.push({
            x: boss.x + boss.width / 2, y: boss.y + boss.height / 2,
            width: 6, height: 12, vy: 4, vx: Math.sin(time * 10) * 3,
            color: "#fb7185"
          } as Bullet)
        } else if (boss.type === "homing" && Math.random() < 0.015) {
          const dx = player.x - (boss.x + boss.width / 2)
          const dy = player.y - (boss.y + boss.height / 2)
          const dist = Math.sqrt(dx * dx + dy * dy)
          enemyBullets.push({
            x: boss.x + boss.width / 2, y: boss.y + boss.height / 2,
            width: 12, height: 12, vy: (dy / dist) * 3, vx: (dx / dist) * 3,
            color: "#fda4af"
          } as Bullet)
        }
        for (let i = bullets.length - 1; i >= 0; i--) {
          const b = bullets[i]
          if (
            b.x < boss.x + boss.width &&
            b.x + b.width > boss.x &&
            b.y < boss.y + boss.height &&
            b.y + b.height > boss.y
          ) {
            bullets.splice(i, 1)
            boss.hp--
            score += 10
            if (boss.hp <= 0) {
              score += level * 100
              setIsBossActive(false)
              boss = null
              level++
              if (level > 20) {
                 isGameActive = false
                 setIsVictory(true)
                 setCurrentScore(score)
                 return
              }
              createMonsters()
            }
            break
          }
        }
      } else {
        let wallHit = false
        monsters.forEach((m) => {
          m.x += m.vx
          if (m.x <= 0 || m.x + m.width >= width) wallHit = true
        })
        if (wallHit) {
          monsterDirection *= -1
          monsters.forEach((m) => {
            m.vx = monsterSpeed * monsterDirection
            m.y += 20
          })
        }
        // Monster Shooting
        if (monsters.length > 0 && Math.random() < 0.005 + level * 0.001) {
          const shooter = monsters[Math.floor(Math.random() * monsters.length)]
          enemyBullets.push({
            x: shooter.x + shooter.width / 2,
            y: shooter.y + shooter.height,
            width: 4,
            height: 8,
            vy: 4,
            color: "var(--foreground)",
          })
        }
        for (let i = bullets.length - 1; i >= 0; i--) {
          let hit = false
          for (let j = monsters.length - 1; j >= 0; j--) {
            const b = bullets[i]
            const m = monsters[j]
            if (
              b && m &&
              b.x < m.x + m.width &&
              b.x + b.width > m.x &&
              b.y < m.y + m.height &&
              b.y + b.height > m.y
            ) {
              bullets.splice(i, 1)
              monsters.splice(j, 1)
              score += 20
              // Drop Power-up (15% chance now with virus)
              if (Math.random() < 0.15) {
                const rand = Math.random()
                let type: "triple" | "rapid" | "shield" | "heart" | "virus" = "triple"
                if (rand < 0.2) type = "triple"
                else if (rand < 0.4) type = "rapid"
                else if (rand < 0.6) type = "shield"
                else if (rand < 0.8) type = "heart"
                else type = "virus"

                powerUps.push({
                  x: m.x + m.width / 2 - 10,
                  y: m.y,
                  width: 20,
                  height: 20,
                  type,
                  vy: 2,
                  color: "var(--primary)",
                })
              }
              hit = true
              break
            }
          }
          if (hit) break
        }
        if (monsters.length === 0) {
          level++
          if (level > 20) {
            isGameActive = false
            setIsVictory(true)
            setCurrentScore(score)
            return
          }
          if (level % 5 === 0) createBoss()
          else createMonsters()
        }
        if (monsters.some((m) => m.y + m.height >= player.y)) {
          if (player.shield <= 0) {
            player.hp--
            if (player.hp <= 0) {
              isGameActive = false
              setIsGameOver(true)
              setCurrentScore(score)
              return
            }
            player.shield = 120
            monsters = monsters.filter(m => m.y + m.height < player.y - 100)
          }
        }
      }
    }

    // --- RENDER LOGIC ---
    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const foregroundColor = getComputedStyle(document.body).getPropertyValue(
        "color"
      )
      ctx.fillStyle = foregroundColor
      stars.forEach((s) => {
        ctx.globalAlpha = s.alpha
        ctx.fillRect(s.x, s.y, s.size, s.size)
      })
      ctx.globalAlpha = 1

      if (isGameActive) {
        ;[player, ...bullets, ...enemyBullets].forEach((p) => {
          ctx.fillStyle = p.color
          if (p === player && player.shield > 0) {
            ctx.strokeStyle = "#60a5fa"
            ctx.lineWidth = 3
            ctx.strokeRect(p.x - 5, p.y - 5, p.width + 10, p.height + 10)
            if (Math.floor(Date.now() / 100) % 2 === 0) ctx.globalAlpha = 0.5
          }
          ctx.fillRect(p.x, p.y, p.width, p.height)
          ctx.globalAlpha = 1
        })

        // Draw Power-ups
        powerUps.forEach((p) => {
          if (p.type === "triple") ctx.fillStyle = "#fbbf24"
          else if (p.type === "rapid") ctx.fillStyle = "#22c55e"
          else if (p.type === "shield") ctx.fillStyle = "#60a5fa"
          else if (p.type === "heart") ctx.fillStyle = "#ef4444"
          else ctx.fillStyle = "#a855f7" // Purple for Virus

          ctx.beginPath()
          if (p.type === "triple") {
            ctx.moveTo(p.x + p.width / 2, p.y); ctx.lineTo(p.x, p.y + p.height); ctx.lineTo(p.x + p.width, p.y + p.height)
          } else if (p.type === "rapid") {
            ctx.moveTo(p.x + p.width / 2, p.y); ctx.lineTo(p.x + p.width, p.y + p.height / 2); ctx.lineTo(p.x + p.width / 2, p.y + p.height); ctx.lineTo(p.x, p.y + p.height / 2)
          } else if (p.type === "shield") {
            ctx.arc(p.x + p.width / 2, p.y + p.height / 2, p.width / 2, 0, Math.PI * 2)
          } else if (p.type === "heart") {
            const x = p.x + p.width / 2, y = p.y + p.height / 2, s = p.width / 2
            ctx.moveTo(x, y + s / 2)
            ctx.bezierCurveTo(x, y, x - s, y, x - s, y - s / 2)
            ctx.bezierCurveTo(x - s, y - s, x, y - s, x, y - s / 2)
            ctx.bezierCurveTo(x, y - s, x + s, y - s, x + s, y - s / 2)
            ctx.bezierCurveTo(x + s, y, x, y, x, y + s / 2)
          } else {
            // Virus: Spike ball
            const centerX = p.x + p.width / 2, centerY = p.y + p.height / 2, r = p.width / 2
            for (let i = 0; i < 8; i++) {
              const a = (i / 8) * Math.PI * 2
              ctx.lineTo(centerX + Math.cos(a) * r, centerY + Math.sin(a) * r)
              ctx.lineTo(centerX + Math.cos(a + 0.4) * (r / 2), centerY + Math.sin(a + 0.4) * (r / 2))
            }
          }
          ctx.closePath()
          ctx.fill()
        })
        if (boss) {
          ctx.fillStyle = "var(--destructive)"
          ctx.fillRect(boss.x, boss.y - 20, boss.width, 10)
          ctx.fillStyle = "var(--primary)"
          ctx.fillRect(
            boss.x,
            boss.y - 20,
            boss.width * (boss.hp / boss.maxHp),
            10
          )
          ctx.save()
          if (isBossImageLoaded) {
            ctx.beginPath()
            ctx.arc(
              boss.x + boss.width / 2,
              boss.y + boss.height / 2,
              boss.width / 2,
              0,
              Math.PI * 2
            )
            ctx.clip()
            ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height)
          } else {
            ctx.beginPath()
            ctx.arc(
              boss.x + boss.width / 2,
              boss.y + boss.height / 2,
              boss.width / 2,
              0,
              Math.PI * 2
            )
            ctx.fillStyle = boss.color
            ctx.fill()
          }
          ctx.restore()
        } else {
          monsters.forEach((m, i) => {
            ctx.fillStyle = m.color
            ctx.globalAlpha = 1 - (i % monsterRows) * 0.15
            ctx.fillRect(m.x, m.y, m.width, m.height)
          })
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = foregroundColor
        ctx.font = "20px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(`Level: ${level}`, 10, 30)
        ctx.fillText(`Score: ${score}`, 10, 55)
        ctx.font = "14px sans-serif"
        ctx.fillText(`Best: ${bestScore}`, 10, 75)

        // Draw active buff timers
        ctx.font = "14px sans-serif"
        if (tripleShotTimer > 0) {
          ctx.fillStyle = "#fbbf24"
          ctx.fillText(`TRIPLE SHOT: ${(tripleShotTimer / 60).toFixed(1)}s`, 10, 100)
        }
        if (rapidFireTimer > 0) {
          ctx.fillStyle = "#22c55e"
          ctx.fillText(`RAPID FIRE: ${(rapidFireTimer / 60).toFixed(1)}s`, 10, 120)
        }
        if (virusTimer > 0) {
          ctx.fillStyle = "#a855f7"
          ctx.fillText(`VIRUS: ${(virusTimer / 60).toFixed(1)}s`, 10, 140)
        }

        // Draw Player HP (Hearts)
        ctx.fillStyle = "#ef4444"
        const heartSize = 25
        for (let i = 0; i < player.hp; i++) {
          const x = width - (i + 1) * (heartSize + 10) - 10
          const y = 30
          ctx.beginPath()
          ctx.arc(x, y, heartSize / 4, 0, Math.PI * 2)
          ctx.arc(x + heartSize / 2, y, heartSize / 4, 0, Math.PI * 2)
          ctx.moveTo(x - heartSize / 4, y)
          ctx.lineTo(x + heartSize / 4, y + heartSize / 2)
          ctx.lineTo(x + heartSize * 0.75, y)
          ctx.fill()
        }
      }
    }

    // --- MAIN LOOP & CLEANUP ---
    let animationFrameId: number
    const gameLoop = () => {
      update()
      render()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      createStars()
      if (isGameActive) handleStartGame()
    }
    window.addEventListener("resize", handleResize)

    handleStartGame()
    createStars()
    gameLoop()

    return () => {
      setIsBossActive(false)
      setIsGameOver(false)
      setGameController(null)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("touchstart", handleTouch)
      window.removeEventListener("touchmove", handleTouch)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [setIsBossActive, setIsGameOver, setGameController])

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  )
}

export default PixelWar

//#####################################
// KAT EN MUIS
//#####################################

let time = 0
let starttime = 0

function plotCat(x: number, y: number) {
    led.plot(x, y)
}

function plotMouse(x: number, y: number) {
    led.plot(x, y)
}

function unplotCat(x: number, y: number) {
    led.unplot(x, y)
}

function unplotMouse(x: number, y: number) {
    led.unplot(x, y)
}

Game.createSprite("cat", 1, 1, plotCat, unplotCat)
Game.createSprite("mouse", 1, 1, plotMouse, unplotMouse)

gameStartHandler = () => {
    time = 0
    starttime = control.millis()
    Game.moveTo("mouse", 0, 0)
    Game.moveTo("cat", 4, 4)
}

gamePlayHandler = () => {
    if (time > control.millis()) return
    let dir = General.randomInt(0, 3)
    switch (dir) {
        case 0: Game.moveDirection("mouse", 1, SpriteDir.Up); break
        case 1: Game.moveDirection("mouse", 1, SpriteDir.Down); break
        case 2: Game.moveDirection("mouse", 1, SpriteDir.Left); break
        case 3: Game.moveDirection("mouse", 1, SpriteDir.Right); break
    }
    time = control.millis() + 100
}

function calcScore() {
    ETscore = Math.round((10000 + starttime - control.millis()) / 1000)
    if (ETscore < 0) ETscore = 0
}

ButtonPad.onButton(Pad.Up, function () {
    if (!Game.isPlaying()) return
    Game.moveDirection("cat", 1, SpriteDir.Up)
    if (Game.isCollision("cat", "mouse")) {
        calcScore()
        Game.stopGame()
        return
    }
})

ButtonPad.onButton(Pad.Down, function () {
    if (!Game.isPlaying()) return
    Game.moveDirection("cat", 1, SpriteDir.Down)
    if (Game.isCollision("cat", "mouse")) {
        calcScore()
        Game.stopGame()
        return
    }
})

ButtonPad.onButton(Pad.Left, function () {
    if (!Game.isPlaying()) return
    Game.moveDirection("cat", 1, SpriteDir.Left)
    if (Game.isCollision("cat", "mouse")) {
        calcScore()
        Game.stopGame()
        return
    }
})

ButtonPad.onButton(Pad.Right, function () {
    if (!Game.isPlaying()) return
    Game.moveDirection("cat", 1, SpriteDir.Right)
    if (Game.isCollision("cat", "mouse")) {
        calcScore()
        Game.stopGame()
        return
    }
})

ButtonPad.onButton(Pad.TopLeft, function () {
    ETscore = 0
    Game.stopGame()
})

ButtonPad.onButton(Pad.TopRight, function () {
    ETscore = 0
    Game.stopGame()
})

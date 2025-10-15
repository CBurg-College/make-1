let player_x = 2
let player_y = 0
let goal_x = 2
let dir = 1
let gameover = true
let dogame = false

let logoHandler: () => void

led.plot(player_x, player_y)
led.plot(goal_x, 4)

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (logoHandler) logoHandler()
    if (!dogame) return
    basic.clearScreen()
    player_x = 2
    player_y = 0
    goal_x = 2
    dir = 1
    led.plot(player_x, player_y)
    led.plot(goal_x, 4)
    gameover = false
})

input.onButtonPressed(Button.A, function () {
    if (gameover) return
    led.unplot(player_x, player_y)
    player_x -= 1
    if (player_x < 0) player_x = 0
    led.plot(player_x, player_y)
})

input.onButtonPressed(Button.B, function () {
    if (gameover) return
    led.unplot(player_x, player_y)
    player_x += 1
    if (player_x > 4) player_x = 4
    led.plot(player_x, player_y)
})

basic.forever(function () {
    if (gameover) return
    basic.pause(200)
    led.unplot(goal_x, 4)
    goal_x += dir * Math.random()
    if (goal_x > 4) {
        dir = -1
        goal_x = 3
    }
    if (goal_x < 0) {
        dir = 1
        goal_x = 1
    }
    led.plot(goal_x, 4)
})

basic.forever(function () {
    if (gameover) return
    basic.pause(1000)
    led.unplot(player_x, player_y)
    player_y += 1
    led.plot(player_x, player_y)
    if (player_y == 4) {
        gameover = true
        basic.pause(300)
        if (player_x == goal_x)
            basic.showIcon(IconNames.Happy)
        else
            basic.showIcon(IconNames.Sad)
    }
})


//% color="#00CC00" icon="\uf1f9"
//% block="Game"
//% block.loc.nl="Spel"
namespace Game {

    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function startGame() {
        dogame = true
    }

    //% color="#FFC000"
    //% block="when logo is pressed"
    //% block.loc.nl="wanneer op het logo wordt gedrukt"
    export function onStart(code: () => void): void {
        logoHandler = code
    }
}

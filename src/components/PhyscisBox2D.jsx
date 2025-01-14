import * as PIXI from 'pixi.js'
import * as p2 from 'p2-es'

let app, stage, container, graphics, zoom, world, boxShape, boxBody, planeBody, planeShape

init()
start()

function init() {
    // Init p2.js
    world = new p2.World()

    // Add a box
    boxShape = new p2.Box({ width: 2, height: 1 })
    boxBody = new p2.Body({
        mass: 1,
        position: [0, 2],
        angularVelocity: 1,
    })
    boxBody.addShape(boxShape)
    world.addBody(boxBody)

    // Add a plane
    planeShape = new p2.Plane()
    planeBody = new p2.Body({ position: [0, -1] })
    planeBody.addShape(planeShape)
    world.addBody(planeBody)

    // Pixi.js zoom level
    zoom = 100

    // Initialize the app
    app = new PIXI.Application({
        width: 600,
        height: 400,
        backgroundColor: 0xffffff,
        backgroundAlpha: 1,
    })

    // Add the canvas to the DOM
    document.body.appendChild(app.view)

    stage = app.stage

    // We use a container inside the stage for all our content
    // This enables us to zoom and translate the content
    container = new PIXI.Container()
    stage.addChild(container)

    // Add transform to the container
    window.container = container
    container.position.x = app.renderer.width / 2 // center at origin
    container.position.y = app.renderer.height / 2
    container.scale.x = zoom // zoom in
    container.scale.y = -zoom // Note: we flip the y axis to make "up" the physics "up"

    // Draw the box.
    graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawRect(-boxShape.width / 2, -boxShape.height / 2, boxShape.width, boxShape.height)

    // Add the box to our container
    container.addChild(graphics)
}

export default function startPhysics() {
    window.app = app
    window.world = world

    app.ticker.add((delta) => {
        // Move physics bodies forward in time
        world.step(1 / 60)

        // Transfer positions of the physics objects to Pixi.js
        graphics.position.x = boxBody.position[0]
        graphics.position.y = boxBody.position[1]
        graphics.rotation = boxBody.angle
    })
}
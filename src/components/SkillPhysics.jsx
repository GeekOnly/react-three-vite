import React, { useEffect, useRef,useState } from 'react';
import Matter from 'matter-js';
import polyDecomp from 'poly-decomp';

const SkillPhysics = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null); // Reference for the container
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });

    useEffect(() => {
        // Resize the container size when the component is mounted or resized
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        // Initial size update
        updateSize();

        // Listen for window resize events
        window.addEventListener('resize', updateSize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    useEffect(() => {
        const Engine = Matter.Engine,
              Render = Matter.Render,
              Runner = Matter.Runner,
              Composites = Matter.Composites,
              Common = Matter.Common,
              MouseConstraint = Matter.MouseConstraint,
              Mouse = Matter.Mouse,
              Composite = Matter.Composite,
              Vertices = Matter.Vertices,
              Bodies = Matter.Bodies;

        // Set up concave decomposition support library
        Common.setDecomp(polyDecomp);

        // Create engine
        const engine = Engine.create();
        const world = engine.world;

        // ตรวจสอบ containerRef เพื่อสร้าง render
        if (!containerRef.current) return;

        const render = Render.create({
            element: canvasRef.current,
            engine: engine,
            options: {
                width: containerSize.width*1.1,
                height: containerSize.height,
            }
        });

        Render.run(render);


        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Add walls
        Composite.add(world, [
            Bodies.rectangle(500, 0, 1000, 50, { isStatic: true, render: { visible: true } }), // Top
            Bodies.rectangle(500, 950, 1000, 50, { isStatic: true, render: { visible: true } }),//Right
            Bodies.rectangle(950, 500, 50, 1000, { isStatic: true, render: { visible: true } }),//Left
            Bodies.rectangle(0, 500, 50, 1000, { isStatic: true, render: { visible: true } }) // Down
        ]);

        const arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50');
        const chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0');
        const star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38');
        const horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');

        const stack = Composites.stack(50, 50, 6, 4, 10, 10, (x, y) => {
            const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
            return Bodies.fromVertices(x, y, Common.choose([arrow, chevron, star, horseShoe]), {
                render: {
                    fillStyle: color,
                    strokeStyle: color,
                    lineWidth: 1
                }
            }, true);
        });

        Composite.add(world, stack);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: containerSize.width*2, y: containerSize.height *2}
        });

        // Cleanup on unmount
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        };
    }, []);

    return (
        <div ref={containerRef} className="skill-physics-container">
            <div ref={canvasRef} className="Physicscanvas"/>
        </div>
    );
};

export default SkillPhysics;

import React, { useRef, useEffect, useState } from 'react'
import arkanoid from "./game";


const App = () => {

    // const [currentGameParams, setCurrentGameParams] = useState({id: undefined})
    const [documentSize, setDocumentSize] = useState<[number, number]>([0, 0]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const onResize = () => {
            const { clientHeight, clientWidth } = document.documentElement;
            setDocumentSize([clientWidth - 2, clientHeight - 2]);
        }
        window.onresize = onResize
        onResize();
    }, [])

    useEffect(() => {
        const [width, height] = documentSize
        const canvas: HTMLCanvasElement = canvasRef.current

        canvas.width = width
        canvas.height = height

        arkanoid(canvasRef.current)
    }, documentSize)


    return (
        <canvas ref={canvasRef}/>
    )
}

export default App;
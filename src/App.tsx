import React, { useRef, useEffect, useState } from 'react'
import arkanoid from "./game";
import { v4 as uuidv4 } from 'uuid';
import { GameParams } from "@/types/types";

const App: React.FC = () => {

    const [documentSize, setDocumentSize] = useState<[number, number]>([0, 0]);
    const gameParams = useRef<GameParams>({id: ''})
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
        gameParams.current.id = uuidv4()
        arkanoid(canvasRef.current, gameParams.current)
    }, documentSize)


    return (
        <canvas ref={canvasRef}/>
    )
}

export default App;
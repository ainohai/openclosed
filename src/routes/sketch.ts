import type { Line } from "./types";
import type { Sketch } from 'p5-svelte/types';
import type * as p5 from 'p5/index'

type coordinate = {
    x: number,
    y: number,
}

/**
 * Creates polygon centered to origo.
 * @param numOfCorners 
 */
const createPolygonDots = (numOfCorners: number, radius: number ) => {
    const angleOfRotation = 2 * Math.PI / numOfCorners;

    //first point is in y = 0, x = r
    const points = [{x: radius, y:-10}]

    for (let i = 1; i < numOfCorners; i++){
        const p0 = points[i-1]
        const x1 = p0.x * Math.cos(angleOfRotation) + p0.y * Math.sin(angleOfRotation);
        const y1 = -p0.x * Math.sin(angleOfRotation) + p0.y * Math.cos(angleOfRotation);


        points.push({x: x1, y: y1});
    }


console.log(points)
    return points;
}

/**
 * 
 * @param line coordinates of two points
 * @param stretch stretch factor. From 0 to 1
 * @param stretchFromMid From 0 to 1. How big percentage of the stretch is in the start side of the mid point.
 * @param p5 
 */
const stretchAndDrawLine = (line: [coordinate, coordinate], stretch: number, stretchFromMid: number, p5: p5) => {

    console.log(line);
    const [start, end] = line;
    ////y - y1 = (y2 - y1)/(x2 - x1)*(x - x1)
    //y = ((y2 - y1)/(x2 - x1)*(x - x1)) + y1
    //y=((end.y - start.y)/(end.x-start.x)* x) - ((end.y - start.y)/(end.x-start.x)*start.x) + y1
    //ax + by + c = 0 => by = -ax - c => y = (-a/b)x - c/b 
    //=> -a/b = (end.y - start.y)/(end.x-start.x)
    const slope = (end.y - start.y)/(end.x-start.x)

    let angle = Math.atan(slope);
    
    const origLength = Math.sqrt(Math.pow(end.y - start.y, 2) + Math.pow(end.x - start.x, 2))
    const stretchLength = (origLength * stretch) - origLength;
    const stretchToStart = stretchLength * stretchFromMid;
    
    p5.push()
    
    //Line middle point at origo
    p5.translate((end.x + start.x) * 0.5, (end.y + start.y) * 0.5)

    //x-axis perpendicular to line. 
    p5.applyMatrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0)
    if (end.x < start.x ) {
        p5.applyMatrix(-1, 0, 0, 1, 0, 0)
        console.log("flip");
    }
    p5.strokeCap(p5.SQUARE)
   // p5.strokeWeight(p5.random(linetype.minWidth, linetype.maxWidth))

    //const colorIndex = Math.floor(p5.random(0, linetype.colors.length))
    //const c = p5.color(linetype.colors[colorIndex])
    //p5.stroke(c);


    p5.line(-1* (origLength*0.5 + stretchToStart), 0, 1 * (origLength*0.5 + (stretchLength - stretchToStart)), 0)
    
    p5.pop()
}

/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @param numOfAngles angles of polygon
 * @param stretch stretch factor. From 0 to 1
 * @param stretchFromMid From 0 to 1. How big percentage of the stretch is in the start side of the mid point.
 * @returns 
 */
export function createSketch(canvasWidth: number, canvasHeight: number, numOfAngles: number, stretch: number, stretchFromMid: number, radius: number): Sketch {


    console.log("create")
    
    const dots = createPolygonDots(numOfAngles, radius);
    //console.log(dots)

    let sketch: Sketch = (p5) => {

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.rect(0, 0, canvasWidth, canvasHeight);
            p5.translate(canvasWidth/2,canvasHeight/2);
            //p5.scale(2,2)

        };

        p5.draw = () => {

            p5.background(200)
            p5.translate(canvasWidth/2,canvasHeight/2);

            for (let i=1; i < dots.length; i++) {
                
                stretchAndDrawLine([dots[i-1], dots[i]], stretch, stretchFromMid, p5);
            }
            stretchAndDrawLine([dots[dots.length-1], dots[0]], stretch, stretchFromMid, p5);

            p5.noLoop()
        };
    };
    return sketch;
}

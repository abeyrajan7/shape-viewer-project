import React from 'react';
import '../app/styles/ShapeViewport.css';


type ShapeViewportProps = {
    content: string[];
};
const ShapeViewport: React.FC<ShapeViewportProps> = ({ content }) => {
    
    const shapes = content;

    type Shape = 
        | { type: 'Rectangle'; x: number; y: number; width: number; height: number; color: string }
        | { type: 'Polygon'; polygonPoints: string; color: string };

    const parseShape = (shapeString: string): Shape | null => {
        const parts = shapeString.split(', ');
        const type = parts[0];

        if (type === 'Rectangle') {
            const x = parseInt(parts[1]);
            const y = parseInt(parts[2]);
            const width = parseInt(parts[4]);
            const height = parseInt(parts[5]);
            const color = `#${parts[6]}`;
            return { type, x, y, width, height, color };
        } else if (type === 'Polygon') {
            const polygonParts = shapeString.split(', ')[1]; 
            const polygonPointsArray = polygonParts.split(' '); 
            const color = `#${polygonPointsArray.pop()}`; 
            const polygonPoints = polygonPointsArray.join(' ');
            return { type, polygonPoints, color };
        }
        
        return null;
    };

    function getBoundingBox(pointsString: string) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
    
        const points = pointsString.split(" ");
        for (const point of points) {
            const coordinates = point.split(",");
            const x = parseFloat(coordinates[0]);
            const y = parseFloat(coordinates[1]);
    
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
    
        return {
            minX,
            minY,
            maxX,
            maxY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }

    return (
        <div className='shape-viewport-container'>
            {shapes.map((shapeString, index) => {
                const shape = parseShape(shapeString);

                if (!shape) return null;

                if (shape.type === 'Rectangle') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: `${shape.y}px`,
                                left: `${shape.x}px`,
                                width: `${shape.width}px`,
                                height: `${shape.height}px`,
                                backgroundColor: shape.color,
                                border: '1px solid black',
                            }}
                        />
                    );
                } 
                
                else if (shape.type === 'Polygon') {
                    const boxDimensions = getBoundingBox(shape.polygonPoints);
                    const topLeftX = boxDimensions.minX;
                    const topLeftY = boxDimensions.minY;
                    const adjustedPoints = shape.polygonPoints.split(" ").map(point => {
                        const [x, y] = point.split(",").map(Number);
                        return `${x - topLeftX},${y - boxDimensions.minY}`;
                    }).join(" ");

                    return (
                        <svg
                            key={index}
                            style={{
                                position: 'absolute', 
                                top: `${topLeftY}px`,
                                left: `${topLeftX}px`,
                                width: `${boxDimensions.width}px`,
                                height: `${boxDimensions.height}px`,
                                border: '1px solid transparent',
                            }}
                        >
                            <rect
                                x={0}
                                y={0}
                                width={boxDimensions.width}
                                height={boxDimensions.height}
                                fill="none"
                                stroke="lightgray"
                            />
                            <polygon
                                points={adjustedPoints}
                                style={{ fill: 'black', stroke: 'black', strokeWidth: 1 }}
                            />
                        </svg>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default ShapeViewport;

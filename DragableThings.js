// components/Canvas.js
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvases, setCanvases] = useState([[]]); // Array of canvases with initial empty canvas
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [objects, setObjects] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(scale, scale);

    objects.forEach((obj) => {
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    });

    ctx.restore();
  }, [objects, scale]);

  const addObject = () => {
    const newObjects = [
      ...objects,
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        color: getRandomColor(),
      },
    ];
    setObjects(newObjects);
    saveCurrentCanvas(newObjects);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleMouseDown = (e) => {
    if (!isSelecting) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const selectedObjectIndex = objects.findIndex(
      (obj) => x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height
    );

    if (selectedObjectIndex !== -1) {
      setDraggingIndex(selectedObjectIndex);
      setDragStart({ x, y });
      setOffset({
        x: x - objects[selectedObjectIndex].x,
        y: y - objects[selectedObjectIndex].y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const updatedObjects = [...objects];
    updatedObjects[draggingIndex] = {
      ...updatedObjects[draggingIndex],
      x: x - offset.x,
      y: y - offset.y,
    };

    setObjects(updatedObjects);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
    saveCurrentCanvas(objects);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const scaleAmount = event.deltaY * -0.01;
    setScale(prevScale => Math.min(Math.max(0.5, prevScale + scaleAmount), 4));
  };

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
  };

  const saveCurrentCanvas = (newObjects) => {
    const newCanvases = [...canvases];
    newCanvases[currentCanvasIndex] = newObjects;
    setCanvases(newCanvases);
  };

  const addNewCanvas = () => {
    const newCanvases = [...canvases, []];
    setCanvases(newCanvases);
    setCurrentCanvasIndex(newCanvases.length - 1);
    setObjects([]);
  };

  const switchCanvas = (canvasIndex) => {
    setCurrentCanvasIndex(canvasIndex);
    setObjects(canvases[canvasIndex]);
  };

  return (
    <CanvasContainer>
      <Toolbar>
        <Button onClick={addObject}>Add Object</Button>
        <Button onClick={toggleSelectMode}>
          {isSelecting ? 'Disable Select Mode' : 'Enable Select Mode'}
        </Button>
        <Button onClick={addNewCanvas}>New Canvas</Button>
        {canvases.map((_, index) => (
          <VersionButton
            key={index}
            onClick={() => switchCanvas(index)}
            active={index === currentCanvasIndex}
          >
            Canvas {index + 1}
          </VersionButton>
        ))}
      </Toolbar>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  canvas {
    border: 1px solid #000;
    cursor: ${props => (props.isSelecting ? 'move' : 'default')};
  }
`;

const Toolbar = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const VersionButton = styled(Button)`
  background-color: ${props => (props.active ? '#2ecc71' : '#3498db')};

  &:hover {
    background-color: ${props => (props.active ? '#27ae60' : '#2980b9')};
  }
`;

export default Canvas;

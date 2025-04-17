/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
const App = () => {
  const gridLayout = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
  ];

  const [coloredSquares, setColoredSquares] = useState<
    { row: any; col: any; color: any }[]
  >([]);

  const [isClearing, setIsClearing] = useState(false);
  const [instructions, setInstructions] = useState(
    "Click to color the squares"
  );

  const handleSquareClick = (row: any, col: any) => {
    if (isClearing) return;

    const squareIndex = coloredSquares.findIndex(
      (sq) => sq.row === row && sq.col === col
    );

    if (squareIndex === -1) {
      const newColoredSquares = [
        ...coloredSquares,
        { row, col, color: getRandomColor() },
      ];

      setColoredSquares(newColoredSquares);

      // check if all squares are colored
      const totalSquares = gridLayout.flat().filter(Boolean).length;
      if (newColoredSquares.length === totalSquares) {
        setInstructions("All Squares are filled. Clear in Sequuence");
        startClearingProcess();
      }
    }
  };

  const startClearingProcess = () => {
    setIsClearing(true);
  };

  useEffect(() => {
    if (isClearing && coloredSquares.length > 0) {
      const timer = setTimeout(() => {
        setColoredSquares((prev) => prev.slice(1));
      }, 500);
      return () => clearTimeout(timer);
    } else if (isClearing && coloredSquares.length === 0) {
      setIsClearing(false);
      setInstructions("Click to color the squares");
    }
  }, [isClearing, coloredSquares]);

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const isSquareColored = (row: any, col: any) => {
    return coloredSquares.some((sq) => sq.row === row && sq.col === col);
  };

  const getSquareColor = (row: any, col: any) => {
    const square = coloredSquares.find(
      (sq) => sq.row === row && sq.col === col
    );

    return square ? square.color : "transparent";
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Interactive Aurison Squares</h2>
      <p className="text-center mb-4">{instructions}</p>

      <div className="grid gap-4 mb-6">
        {gridLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {row.map((hasSquare, colIndex) =>
              hasSquare ? (
                <div
                  key={colIndex}
                  style={{
                    backgroundColor: getSquareColor(rowIndex, colIndex),
                  }}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className="w-24 h-24 rounded-lg border-2 border-gray-700 cursor-pointer flex bg-red-500 items-center justify-center"
                >
                  {isSquareColored(rowIndex, colIndex) && (
                    <span className="text-xs text-red-500 bg-black bg-opacity-50 rounded-md px-2 py-1">
                      {coloredSquares.findIndex(
                        (sq) => sq.row === rowIndex && sq.col === colIndex
                      ) + 1}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div key={colIndex} className="w-24 h-24"></div>
                </>
              )
            )}
          </div>
        ))}
      </div>

      <div className=""></div>
    </div>
  );
};

export default App;

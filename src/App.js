import { useEffect, useState } from "react";
import "./App.css";
import circle from "./circle.png";
import cross from "./cross.png";

function App() {
  const [divs, setDivs] = useState([
    { id: 1, fill: null, item: null, color: "white" },
    { id: 2, fill: null, item: null, color: "white" },
    { id: 3, fill: null, item: null, color: "white" },
    { id: 4, fill: null, item: null, color: "white" },
    { id: 5, fill: null, item: null, color: "white" },
    { id: 6, fill: null, item: null, color: "white" },
    { id: 7, fill: null, item: null, color: "white" },
    { id: 8, fill: null, item: null, color: "white" },
    { id: 9, fill: null, item: null, color: "white" },
  ]);

  const [winner, setWinner] = useState(null);
  const [counter, setCounter] = useState(0);
  const [xscore, setxscore] = useState(0);
  const [oscore, setoscore] = useState(0);

  const handleClick = (id) => {
    setDivs((prevDivs) =>
      prevDivs.map((ele) =>
        ele.id === id && ele.fill === null
          ? { ...ele, fill: counter % 2 === 0 ? "O" : "X" }
          : ele
      )
    );
    setCounter((prev) => prev + 1);
  };

  const checkWinner = (divs) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const positions = divs.map((ele) => ele.fill);
    let currentWinner = null;

    for (let win of winningCombinations) {
      const [a, b, c] = win;

      if (
        positions[a] &&
        positions[b] &&
        positions[c] &&
        positions[a] === positions[b] &&
        positions[c] === positions[a]
      ) {
        currentWinner = positions[a];
        break;
      }
    }

    setTimeout(() => {
      if (currentWinner) {
        setWinner(currentWinner);
        if (currentWinner === "X") {
          setxscore((prev) => prev + 100);
        } else {
          setoscore((prev) => prev + 100);
        }
      } else {
        isItFull(positions);
      }
    }, 1000);
  };

  const isItFull = (positions) => {
    for (let e of positions) {
      if (!e) {
        return false;
      }
    }

    if (!winner) {
      setDivs((prevDivs) =>
        prevDivs.map((ele) => {
          return { ...ele, fill: null };
        })
      );
      setWinner("None");
    }
  };

  const setEmpty = () => {
    setDivs((prevDivs) =>
      prevDivs.map((ele) => {
        return { ...ele, fill: null };
      })
    );
    setWinner(null);
  };

  useEffect(() => {
    checkWinner(divs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divs, winner]);

  const handlePlayAgain = () => {
    setEmpty();
  };

  return (
    <>
      <div className="main">
        <div className="scoreboard">
          <h4>X Score: {xscore}</h4>
          <h4>O Score: {oscore}</h4>
          {winner ? (
            <div className="winner-container">
              <h1>
                {winner === "None" ? "Game Draw!" : `Winner is ${winner}!`}
              </h1>
              <button onClick={handlePlayAgain}>Play Again</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="board">
          {divs.map((ele) => (
            <div
              id={ele?.id}
              onClick={() => handleClick(ele.id)}
              key={ele?.id}
              className="block"
              style={{ backgroundColor: `${ele?.color}` }}
            >
              {ele.fill && (
                <img
                  className="img"
                  src={ele.fill === "X" ? cross : circle}
                  alt="icon"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

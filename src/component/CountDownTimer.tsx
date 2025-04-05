import React, { useEffect, useRef, useState } from "react";

const CountDownTimer = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [remainingSec, setRemainingSec] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  //
  useEffect(() => {
    const totalSec = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(totalSec);
    setRemainingSec(totalSec);
  }, [hours, minutes, seconds]);

  //
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRemainingSec((prev) => {
          if (prev <= 1) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  //
  const displayHour = Math.floor(remainingSec / 3600);
  const displayMint = Math.floor((remainingSec % 3600) / 60);
  const displaySec = remainingSec % 60;

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const handlestart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
    setIsRunning(false);
    setIsPaused(false);
    setRemainingSec(totalSeconds);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">CountDown Timer</h2>
      <div className="flex items-center gap-2 mb-6 w-full justify-center">
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1 text-gray-600">Hours</label>
          <input
            type="number"
            min="0"
            max="99"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            disabled={isRunning}
            className="w-16 p-2 rounded border border-gray-500 text-black text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1 text-gray-600">Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            disabled={isRunning}
            className="w-16 p-2 rounded border border-gray-500 text-black text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1 text-gray-600">Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            disabled={isRunning}
            className="w-16 p-2 rounded border border-gray-500 text-black text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
      <div className="text-5xl font-mono font-bold mb-6 bg-gray-800 text-white py-4 px-6 rounded-lg w-full text-center">
        {formatTime(displayHour)}: {formatTime(displayMint)} :{" "}
        {formatTime(displaySec)}
      </div>
      <div className="flex gap-3 w-full justify-center">
        {!isRunning ? (
          <button
            onClick={handlestart}
            disabled={totalSeconds == 0}
            className="bg-green-500 hover: bg-green-600 text-white py-2 px-4 rounded disabled:bg-gray-500  disabled:cursor-not-allowed flex-1"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePauseResume}
            className={`${
              isPaused
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white py-2 px-6 rounded flex-1`}
          >
            {isPaused ? "Continue" : "Pause"}
          </button>
        )}
        <button
          onClick={handleReset}
          disabled={!isRunning && totalSeconds == remainingSec}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:bg-gray-500 disabled: cursor-not-allowed flex-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDownTimer;

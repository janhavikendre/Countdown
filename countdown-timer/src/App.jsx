import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import alarmSound from '../mixkit-digital-clock-digital-alarm-buzzer-992.wav';

const App = () => {
  const [time, setTime] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(10);
  const [play] = useSound(alarmSound);
  const progressRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      play();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time, play]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${(time / customTime) * 100}%`;
    }
  }, [time, customTime]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTime(customTime);
    setIsActive(false);
  };

  const handleIncreaseTime = () => {
    setTime((prevTime) => prevTime + 1);
  };

  const handleDecreaseTime = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 1);
    }
  };

  const handleCustomTimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCustomTime(value);
    setTime(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Countdown Timer</h1>
      <div className="relative w-full max-w-md mb-8">
        <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-4 bg-blue-600 rounded-full transition-width duration-1000"
          ></div>
        </div>
      </div>
      <h2 className="text-6xl mb-8">{time}</h2>
      <div className="space-x-4 mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleIncreaseTime}
        >
          Increase Time
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDecreaseTime}
        >
          Decrease Time
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="customTime" className="text-lg font-bold">
          Set Custom Time
        </label>
        <input
          id="customTime"
          type="number"
          className="border-2 border-gray-300 rounded-lg p-2 text-center"
          value={customTime}
          onChange={handleCustomTimeChange}
        />
      </div>
    </div>
  );
};

export default App;

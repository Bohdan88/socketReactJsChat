import React, { useState, useEffect, useCallback, ReactText } from 'react';

const StartIcon = () => (
  <>
    <span className="icon is-small">
      <i className="fas fa-play"></i>
    </span>
    <small>Start</small>
  </>
);

const StopIcon = () => (
  <>
    <span className="icon is-small">
      <i className="fas fa-stop-circle"></i>
    </span>
    <small>Stop</small>
  </>
);

const ResetIcon = () => (
  <>
    <span className="icon is-small">
      <i className="fas fa-redo-alt"></i>
    </span>
    <small>Reset</small>
  </>
);

// declare interval globally
let handleInterval: any;
let secondsRemainig: number = 0;

const Timer: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState<number | string>(60);
  const [seconds, setSeconds] = useState<number | string>(`0${0}`);
  const [timerState, setTimer] = useState(false);
  const [started, setStart] = useState(false);

  const setTick = () => {
    let minutesLeft = Math.floor(secondsRemainig / 60);
    let secondsInCurrentMinute = secondsRemainig - minutesLeft * 60;
    // set visual values
    setSeconds(secondsInCurrentMinute);
    setInputValue(minutesLeft);
    // edit strings
    if (secondsInCurrentMinute < 10) {
      setSeconds(`0${secondsInCurrentMinute}`);
    }
    if (minutesLeft < 10) {
      setInputValue(`0${minutesLeft}`);
    }
    if (minutesLeft === 0 && secondsInCurrentMinute === 0) {
      clearInterval(handleInterval);
    }
    // decrement all seconds left
    secondsRemainig--;
  };

  const startCountDown = (val: ReactText, timer: boolean) => {
    if (timer && !started) {
      setStart(true);
      secondsRemainig = parseInt(val as string) * 60;
      handleInterval = setInterval(setTick, 1000);
    } else if (!timer) {
      pauseInterval();
    } else if (started) {
      resumeInterval();
    }
  };

  //  pause and resume interval via useCallback and useEffect
  const pauseInterval = useCallback(() => {
    clearInterval(handleInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    pauseInterval();
  }, [pauseInterval]);

  const resumeInterval = useCallback(() => {
    handleInterval = setInterval(setTick, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (started) {
      resumeInterval();
    }
  }, [resumeInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset all values  to default
  const resetAllValues = () => {
    setTimer(false);
    setStart(false);
    pauseInterval();
    setInputValue(60);
    setSeconds(`0${0}`);
    secondsRemainig = 0;
    handleInterval = 0;
  };

  if (timerState && inputValue === '00' && seconds === '00') {
    setTimer(false);
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    // remove character if not a number 
    const replaceIfNaN = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setInputValue(replaceIfNaN.slice(0, 2));
  };
  return (
    <div>
      <div className="navbar-menu nav-center">
        <div className="nav-center-content">
          <div className="navbar-item ">
            <span className="timer-span-words">You have</span>
            <span className={`timer-span nav-center-timer`}>
              <input
                name="inputValue"
                className={`input minutes-input timer`}
                type="tel"
                placeholder="60"
                value={inputValue}
                disabled={started && true}
                onChange={(e) => onChangeInput(e)}
              ></input>
              <span className="colon"> : </span>
              <input
                name="sec"
                className={`input seconds-input timer`}
                type="tel"
                placeholder="Sec"
                disabled
                value={seconds}
              ></input>
            </span>
            <span className={`timer-span-words`}>left</span>
          </div>
        </div>
        <div className="field is-grouped nav-buttons-container">
          <button
            className={`button is-small ${timerState ? 'is-danger' : 'is-success'}`}
            onClick={() => {
              if (inputValue > 0) {
                setTimer(!timerState);
                startCountDown(inputValue, !timerState);
              }
            }}
          >
            {timerState ? <StopIcon /> : <StartIcon />}
          </button>
          <button className="button is-small  is-info reset-button" onClick={() => resetAllValues()}>
            <ResetIcon />
          </button>
        </div>
      </div>
    </div>
  );
};


export default Timer;

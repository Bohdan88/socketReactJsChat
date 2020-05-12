import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlockPicker } from 'react-color';
import Particles from 'react-particles-js';
import ParticlesParams from '../constants/Particles';
import { DEFAULT_USER_COLOR } from '../constants';

import { CSSTransition } from 'react-transition-group';
const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [userColor, setColor] = useState(DEFAULT_USER_COLOR);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h3 className="title is-3 join-title">Join</h3>
        <div className="field">
          <div className="control">
            <input
              placeholder="Name"
              className="input join-input"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              placeholder="Room"
              className="input join-input  customized-join-input"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
        </div>
        <div className="color-picker-container">
          <button
            className="button is-danger customized-color-picker-button"
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          >
            Pick Your Color
          </button>
          <CSSTransition in={displayColorPicker} timeout={2000} classNames="transition-alert" unmountOnExit>
            <div
              className={`notification join-box ${
                displayColorPicker ? 'color-picker-display-block' : 'color-picker-display-none'
              }`}
            >
              <button
                onClick={() => setDisplayColorPicker(false)}
                className="delete delete-button-color-picker"
              ></button>

              {displayColorPicker ? (
                <BlockPicker triangle="hide" color={userColor} onChange={(color) => setColor(color.hex)} />
              ) : null}
            </div>
          </CSSTransition>
        </div>

        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/app?name=${name}&room=${room}&color=${userColor.slice(1).toLowerCase()}`}
        >
          <button className="button is-info customized-join-button" type="submit">
            Join Room
          </button>
        </Link>
      </div>

      <Particles params={ParticlesParams as any} className="particles-full-screen" />
    </div>
  );
};

export default Join;

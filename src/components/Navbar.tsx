import React from 'react';
import Timer from './Timer';
import { DEFAULT_USER_COLOR } from '../constants';
// !TODO : create user icons as separate component

type Props = {
  toggleTheme: () => void;
  users: Array<string>;
};

const Navbar: React.FunctionComponent<Props> = ({ users, toggleTheme }) => {
  const usersArray = users && users.length > 5 ? users.slice(0, 5) : users;
  const restUsers = users && users.length > 5 ? users.length - 5 : null;
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container is-fluid navbar-info">
        <div className="navbar-brand navbar-info">
          <a className="navbar-item" href="/#">
            <p className="is-size-5 brand-title">Team Retrospective</p>
          </a>
          <span className="tag is-medium">Sprint 19</span>
          <a href="/#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <Timer />
        <div className="navbar-icons">
          {usersArray &&
            usersArray.map(
              (user: any): JSX.Element => {
                return !user.id ? (
                  <button className="button is-loading">Loading...</button>
                ) : (
                  <span
                    key={user.id}
                    style={{ background: `#${user.color || DEFAULT_USER_COLOR}` }}
                    className="label-round is-inline-block is-size-6"
                  >
                    {user.name[0].toUpperCase()}
                  </span>
                );
              }
            )}
          {restUsers && (
            <span className="label-round has-background-grey-light is-inline-block is-size-6 has-text-black rest-users">
              <small>+{restUsers}</small>
            </span>
          )}
        </div>
        <label className="switch">
          <small>Theme</small>
          <input type="checkbox" onClick={toggleTheme} />
          <div className="slider round"></div>
        </label>
      </div>
    </nav>
  );
};

// Navbar.defaultProps = defaultProps;

export default Navbar;

import { Link } from "react-router-dom";

import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  function logoutBtnHandler() {
    ctx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!ctx.isLoggedIn && (
          <li>
          <Link to="/auth">Login</Link>
        </li>
        )}
          
          {ctx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={logoutBtnHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

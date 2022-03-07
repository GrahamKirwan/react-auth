import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

import { AuthContext } from '../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const ctx = useContext(AuthContext);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  function submitHandler(e) {
    e.preventDefault();
    let url;
    
    // If user is trying to login
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpRtHyiDISxBKNzPxALWMtzLAIK9aWc8w'
    } 
    // If user is trying to signup
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpRtHyiDISxBKNzPxALWMtzLAIK9aWc8w'
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true
      })
    }).then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return res.json().then(() => {
          throw new Error('Auth Failed!')
        })
      }
    }).then((data) => {
      ctx.login(data.idToken);
      history.replace('/')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

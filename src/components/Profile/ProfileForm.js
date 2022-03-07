import classes from './ProfileForm.module.css';

import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

const ProfileForm = () => {

  const newPassRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    let newPassword = newPassRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCpRtHyiDISxBKNzPxALWMtzLAIK9aWc8w', {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: newPassword,
        returnSecureToken: false
      })
    }).then((res) => {
      console.log(res);
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

import React from 'react';
import { ImEyeBlocked, ImEye } from 'react-icons/im';

function SignupForm(props) {
  const {
    userName,
    handleUserName,
    userNameIsValid,
    password1IsValid,
    passwordsInputType,
    handlePassword1,
    handleShowPasswordButton,
    password2IsValid,
    password1,
    password2,
    handlePassword2,
    formIsValid,
    handleButton,
  } = props.signupProps;

  
  return (
    <form>
      <fieldset>
        <legend>Sign up</legend>
        <div className={`row ${userNameIsValid ? 'valid' : 'invalid'}`}>
          <label htmlFor='userName'>User Name</label>
          <input
            type='text'
            id='userName'
            value={userName}
            autoComplete='username'
            onChange={handleUserName}
          />
        </div>
        <br />
        <div className={`note ${userNameIsValid ? 'valid' : 'invalid'}`}>
          <p>allowed: 5 - 20 characters</p>
        </div>
        <div className={`row ${password1IsValid ? 'valid' : 'invalid'}`}>
          <label htmlFor='password'>Password</label>
          <input
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            placeholder='password'
            type={passwordsInputType}
            id='pas1'
            value={password1}
            autoComplete='new-password'
            onChange={handlePassword1}
          />
          <span className='eyes-icon' onClick={handleShowPasswordButton}>
            {passwordsInputType === 'password' ? <ImEye /> : <ImEyeBlocked />}
          </span>
        </div>

        <div className={`note ${password1IsValid ? 'valid' : 'invalid'}`}>
          <p>min 8 characters</p>
        </div>
        <div className={`row ${password2IsValid ? 'valid' : 'invalid'}`}>
          <label htmlFor='password'>Password</label>
          <input
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            placeholder='password'
            type={passwordsInputType}
            id='pas2'
            value={password2}
            autoComplete='new-password'
            onChange={handlePassword2}
          />
          <span className='eyes-icon' onClick={handleShowPasswordButton}>
            {passwordsInputType === 'password' ? <ImEye /> : <ImEyeBlocked />}
          </span>
        </div>
        <div className={`note ${password2IsValid ? 'valid' : 'invalid'}`}>
          <p>repeat your password</p>
        </div>
        <div className='buttonRow'>
          <button disabled={!formIsValid} onClick={handleButton}>
            Register
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default SignupForm;

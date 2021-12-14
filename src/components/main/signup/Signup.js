/* eslint-disable react-hooks/exhaustive-deps */
import './signup.scss';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../ThemeContext';
import Eye from '../../../assets/eye.png';
import Navbar from '../../navbar/Navbar';

function SignUpForm() {
  const { currentUser, setCurrentUser, loadUsers } = useTheme();
  const [userName, setUserName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [payload, setPayload] = useState({});
  const [passwordsInputType, setPasswordsInputType] = useState('password');
  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const navBanners = ['home', 'libro', 'login'];

  console.log(currentUser);

  const clearPayload = () => {
    if (Object.keys(payload).length !== 0) {
      setPayload((prev) => ({}));
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearPayload();
  }, [userName, password1, password2]);

  useEffect(() => {
    setFormIsValid(
      userNameIsValid &&
        password1IsValid &&
        password2IsValid &&
        password1 === password2
    );
  }, [
    userNameIsValid,
    password1IsValid,
    password2IsValid,
    password1,
    password2,
  ]);

  const handleUserName = (e) => {
    let _userName = e.target.value;
    _userName.length >= 5 && _userName.length <= 20
      ? setUserNameIsValid(true)
      : setUserNameIsValid(false);
    setUserName(_userName);
  };

  const handlePassword1 = (e) => {
    let _password1 = e.target.value;
    // _password1.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(_password1)
    _password1.length >= 8
      ? setPassword1IsValid(true)
      : setPassword1IsValid(false);
    setPassword1(_password1);
  };

  const handlePassword2 = (e) => {
    let _password2 = e.target.value;
    _password2.length >= 8
      ? setPassword2IsValid(true)
      : setPassword2IsValid(false);
    setPassword2(_password2);
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === 'password' ? 'text' : 'password'
    );
  };

  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      userName,
      password1,
      password2,
    }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
        password1,
        password2,
      }),
    };
    (async () => {
      const response = await fetch(
        `http://localhost:9000/signup/create`,
        requestOptions
      );
      const data = await response.json();
      setCurrentUser((prev) => data.savedDBUser);
      if (response.ok) {
        const _currentUser = await data;
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
        setUserName('');
        setPassword1('');
        setPassword2('');
      }
    })();
  };

  return (
    <div className='Signup'>
      <Navbar navBanners={navBanners} />

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
            <img onClick={handleShowPasswordButton} src={Eye} alt='' />
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
            <img onClick={handleShowPasswordButton} src={Eye} alt='eye' />
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

      {Object.keys(payload).length !== 0 && (
        <pre>Saved: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default SignUpForm;

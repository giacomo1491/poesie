import { useTheme } from '../../../ThemeContext';
import { useState } from 'react';
import './login.scss';
import { ImEyeBlocked, ImEye } from 'react-icons/im';

function Login() {
  const {
    currentUser,
    setCurrentUser,
    userName,
    setUserName,
    password,
    setPassword,
    handleLogoutButton,
  } = useTheme();
  const [passwordsInputType, setPasswordsInputType] = useState('password');

  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(',')
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  const handleuserName = (e) => {
    const _userName = e.target.value;
    setUserName(_userName);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    };
    const response = await fetch('http://localhost:9000/login', requestOptions);
    const _currentUser = await response.json();
    setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    setUserName('');
    setPassword('');
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === 'password' ? 'text' : 'password'
    );
  };

  return (
    <div className='Login'>
      {currentUser.userName && (
        <>
          {currentUser.userName !== 'anonymousUser' && (
            <h2>Current User: {currentUser.userName}</h2>
          )}

          {currentUserIsInGroup('loggedOutUsers') && (
            <form>
              <fieldset>
                <legend>Login</legend>
                <div className='row'>
                  <label htmlFor='userName'>User Name</label>
                  <input
                    type='text'
                    id='userName'
                    value={userName}
                    onChange={handleuserName}
                    autoComplete='userName'
                  />
                </div>
                <div className='row'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type={passwordsInputType}
                    id='password'
                    onChange={handlePassword}
                    value={password}
                    autoComplete='current-password'
                  />
                  <span
                    className='eyes-icon'
                    onClick={handleShowPasswordButton}
                  >
                    {passwordsInputType === 'password' ? (
                      <ImEye />
                    ) : (
                      <ImEyeBlocked />
                    )}
                  </span>
                </div>
                <div className='buttonRow'>
                  <button onClick={handleLoginButton}>Login</button>
                </div>
              </fieldset>
            </form>
          )}
          <br />
          <br />
          <br />
          {currentUserIsInGroup('loggedInUsers') && (
            <div>
              <button onClick={handleLogoutButton}>Logout</button>
            </div>
          )}
          {currentUserIsInGroup('loggedOutUsers') && (
            <div className='panel'>
              <h3>
                Grazie alla sua registrazione potrà votare le poesie, e disporre
                di un segnalibro che la aiuterà a ritrovare la pagina in cui ha
                smesso di leggere l'ultima volta
              </h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Login;

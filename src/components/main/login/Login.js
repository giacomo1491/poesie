import { useState, useEffect } from 'react';
import { useTheme } from '../../../ThemeContext';
import './login.scss';
import Navbar from '../../navbar/Navbar';

function Login() {
  const { currentUser, setCurrentUser } = useTheme();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navBanners = ['home', 'libro', 'signup'];

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:9000/login/currentuser',
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentUser((prev) => ({ ...prev, ...data.user }));
      }
      // loadNotYetApprovedUsers();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(
      'http://localhost:9000/login/logout',
      requestOptions
    );
    if (response.ok) {
      setUserName('');
      setPassword('');
      const _currentUser = await response.json();
      console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };
  console.log(`login:${currentUser.userName}`);
  return (
    <div className='Login'>
      <Navbar navBanners={navBanners} />
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
                    type='password'
                    id='password'
                    onChange={handlePassword}
                    value={password}
                    autoComplete='current-password'
                  />
                </div>
                <div className='buttonRow'>
                  <button onClick={handleLoginButton}>Login</button>
                </div>
              </fieldset>
            </form>
          )}

          {currentUserIsInGroup('loggedInUsers') && (
            <div>
              <button onClick={handleLogoutButton}>Logout</button>
            </div>
          )}
          {currentUserIsInGroup('loggedOutUsers') && (
            <div className='panel'>Welcome to this site.</div>
          )}

          {currentUserIsInGroup('members') && (
            <>
              <div className='panel'>
                <h3>Current Site News for Members</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Neque explicabo voluptate quia asperiores sit! Vel molestiae
                  labore ratione non dolores? Exercitationem soluta quo id
                  laboriosam, autem perferendis? Fuga, suscipit ipsa.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Login;

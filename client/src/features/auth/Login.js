import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ username, token: userData.token }));
      setUsername('');
      setPassword('');
      navigate('/welcome');
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);
  const loading = <h1>Loading...</h1>;

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className='login'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          value={username}
          onChange={handleUsernameInput}
          autoComplete='off'
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
  return content;
};

export default Login;

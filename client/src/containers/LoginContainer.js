import React, { useState } from 'react';

//TODO: Move presentation of Login to component
//https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

const LoginContainer = () => {
  const [token, setToken] = useState();
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          <p>Username</p>
          <input type='text' />
        </label>
        <label>
          <p>Password</p>
          <input type='password' />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;

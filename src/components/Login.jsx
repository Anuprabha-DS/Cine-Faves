import React, { useState } from 'react';
import SignUp from './Signup';

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.reload();
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
  };

  return (
    <div className="col text-end">
      {!currentUser ? (
        <>
          <button className="btn btn-primary me-2" onClick={() => setShowLogin(true)}>Login</button>
          <button className="btn btn-outline-primary" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </>
      ) : (
        <>
          <span className="me-2">Welcome, {currentUser.username}</span>
          <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
        </>
      )}

      {showLogin && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Login</h5>
                <button className="btn-close" onClick={() => setShowLogin(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default Login;
import { useState, useEffect } from 'react';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GITHUB_CLIENT_ID } = process.env;

const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  if ('accessToken' in response) {
    console.log(response);
    const tokenId = response.tokenId;

    // console.log(accessToken);

    fetch(`http://localhost:5000/auth/google-oauth/`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

const App = () => {
  const [data, setData] = useState({ errorMessage: '', isLoading: false });

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
      };

      const proxy_url = 'http://localhost:5000/auth/github-oauth';

      console.log(hasCode);
      console.log(requestData);

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: 'Sorry! Login failed',
          });
        });
    }
  }, [data]);
  return (
    <div>
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        // accessType="offline"
        // responseType="code"
        onSuccess={handleSuccess}
        onFailure={handleSuccess}
      />
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/login`}
        onClick={() => {
          setData({ ...data, errorMessage: '' });
        }}
      >
        Github
      </a>
    </div>
  );
};

export default App;

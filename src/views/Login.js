import React from 'react';

export function Login() {
    console.log('process.env.REACT_APP_SERVER_URL',process.env.REACT_APP_SERVER_URL)
    return (
        <div>
            <h1>Login</h1>
            <a href={process.env.REACT_APP_SERVER_URL + '/login'}>
                <button>
                    GO TO LOGIN
                </button>
            </a>

        </div>
    );
}

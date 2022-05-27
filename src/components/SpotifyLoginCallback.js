import React, {useEffect} from 'react';
import {useSearchParams, useNavigate} from "react-router-dom";
import {getTokens} from "../Managers/SpotifyManager";

export function SpotifyLoginCallback() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    let navigate = useNavigate();

    useEffect(() => {
        if (code && state) {
            console.log('test')
            getTokens(code, state)
                .then(res => {
                    const expires_in = res.expires_in
                    const access_token = res.access_token
                    const refresh_token = res.refresh_token
                    localStorage.setItem('expires_in', expires_in)
                    localStorage.setItem('access_token', access_token)
                    localStorage.setItem('refresh_token', refresh_token)
                    console.log(expires_in, access_token, refresh_token)
                    if (expires_in && access_token && refresh_token) {
                        navigate("/app")
                    } else {
                        navigate("/")
                    }
                })
        }
    }, [code, state]);


    return (
        <div>
            <h1>INICIANDO SESSION...</h1>
        </div>
    );
}


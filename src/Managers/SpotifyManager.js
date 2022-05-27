export const getUserData = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me',
        {headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data)
                return null;
            }
            return data;
        });
}

export const getCurrentSongData = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/player/currently-playing',
        {headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data)
                return null;
            }
            return data;
        });
}

export const pausePlayback = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/player/pause',
        {method: 'PUT', headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => {/*console.log(response)*/
        });
}

export const startPlayback = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/player/play',
        {method: 'PUT', headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => {/*console.log(response)*/
        });
}

export const nextTrack = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/player/next',
        {method: 'POST', headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => {/*console.log(response)*/
        });
}

export const getDevices = async (accessToken) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/player/devices',
        {headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data)
                return null;
            }
            return data;
        });
}

export const saveCurrentSong = async (accessToken, trackId) => {
    if (!accessToken) return missingAccesTokenError();
    return fetch('https://api.spotify.com/v1/me/tracks?ids=' + trackId,
        {method: 'PUT', headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(response => {/*console.log(response)*/
        });
}

export const getTokens = (code, state) => {
    return fetch(process.env.REACT_APP_SERVER_URL + `/callback?code=${code}&state=${state}`)
        .then(response => response.json())
}

function missingAccesTokenError() {
    console.error('Missing accesToken SpotifyManager.js');
    return null;
}

export const getUserData = async (accessToken) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        if(data.error) 
        {
            console.error(data)
            return null;
        }
        return data;
    });
    console.log(JSON.stringify(_return));
    return _return;          
}

export const getCurrentSongData = async (accessToken) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me/player/currently-playing',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        if(data.error) 
        {
            console.error(data)
            return null;
        }
        return data;
    });
    return _return;
}

export const pausePlayback = async (accessToken) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me/player/pause',
    {method: 'PUT', headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {/*console.log(response)*/});
    return _return;
}

export const nextTrack = async (accessToken) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me/player/next',
    {method: 'POST', headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {/*console.log(response)*/});
    return _return;
}

export const getDevices = async (accessToken) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me/player/devices',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        if(data.error) 
        {
            console.error(data)
            return null;
        }
        return data;
    });
    return _return;
}

export const saveCurrentSong = async (accessToken, trackId) => {
    if(!accessToken) return missingAccesTokenError();
    let _return =  await fetch('https://api.spotify.com/v1/me/tracks?ids='+trackId,
    {method: 'PUT', headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {/*console.log(response)*/});
    return _return;
}

const missingAccesTokenError = () => {
    console.error('Missing accesToken SpotifyManager.js');
    return null;
}

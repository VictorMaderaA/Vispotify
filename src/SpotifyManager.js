export const getUserData = (accessToken) => {
    if(!accessToken) return null;
    let _return = fetch('https://api.spotify.com/v1/me',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        console.log('getUserData():')
        console.log(data);
        if(data.error) return null;
        return data;
    });
    return _return;          
}

export const getCurrentSongData = (accessToken) => {
    if(!accessToken) return null;
    return fetch('https://api.spotify.com/v1/me/player/currently-playing',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        console.log('GetCurrentSongData():')
        console.log(data);
        if(data.error) return null;
        return data;
    });
    return null;
}

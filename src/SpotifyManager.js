export const getUserData = (accessToken) => {
    if(!accessToken) return null;
    fetch('https://api.spotify.com/v1/me',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        console.log('getUserData('+accessToken+'):')
        console.log(data);
        if(data.error) return null;
        return data;
    });
    return null;          
}

export const getCurrentSongData = (accessToken) => {
    if(!accessToken) return null;
    fetch('https://api.spotify.com/v1/me/player/currently-playing',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        console.log('GetCurrentSongData('+accessToken+'):')
        console.log(data);
        if(data.error) return null;
        return data;
    });
    return null;
}

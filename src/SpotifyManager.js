export const getUserData = async (accessToken) => {
    if(!accessToken) return null;
    let _return =  await fetch('https://api.spotify.com/v1/me',
    {headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => response.json())
    .then(data => {
        if(data.error) return null;
        return data;
    });
    return _return;          
}

export const getCurrentSongData = async (accessToken) => {
    if(!accessToken) return null;
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

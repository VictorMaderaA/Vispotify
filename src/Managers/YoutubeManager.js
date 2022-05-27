export const getYoutubeSearchId = async (search) => {
    if (!search) return youtubeError();
    const YOUTUBE_DATA_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY
    if (!YOUTUBE_DATA_API_KEY) return missingYtDataApiKeyError();

    return await fetch('https://www.googleapis.com/youtube/v3/' +
        'search?part=snippet&order=relevance&q=' + search +
        '&key=' + YOUTUBE_DATA_API_KEY,
        {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data)
                return null;
            }
            return data;
        });
}

function missingYtDataApiKeyError() {
    console.error('Missing YOUTUBE_DATA_API_KEY YoutubeManager.js');
    return null;
}

function youtubeError() {
    console.error('Error YoutubeManager.js');
    return null;
}

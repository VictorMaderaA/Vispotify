import {useEffect, useState} from 'react';
import {getCurrentSongData, nextTrack, pausePlayback} from "../Managers/SpotifyManager";
import {getYoutubeSearchId} from "../Managers/YoutubeManager";

export function UseYoutubeMode(props) {
    const appActive = props.appActive
    const youtubePlayerEnded = props.youtubePlayerEnded

    // const expires_in = localStorage.getItem('expires_in')
    const access_token = localStorage.getItem('access_token')
    // const refresh_token = localStorage.getItem('refresh_token')

    const [state, setState] = useState({
        songName: null,
        songArtist: null,
        prev_songName: null,
        prev_songArtist: null,
        youtubeVideoId: null,
        youtubeVideoFinished: false,
        keepSpotifyPlaying: true
    });
    if (youtubePlayerEnded) {
        setState({...state, youtubeVideoFinished: true})
    }
    useEffect(() => {
        if (appActive) {
            console.log('Activar Application')
            // activar aplicacion
            setState({
                ...state,
                songName: null,
                songArtist: null,
                youtubeVideoId: null,
                youtubeVideoFinished: true,
            })
        }
    }, [appActive]);

    const getDataSpotifysYoutube = async () => {
        const spotifyRes = await getCurrentSongData(access_token)
        if (!spotifyRes) return
        console.log(spotifyRes)
        const songName = spotifyRes.item.name
        const songArtist = spotifyRes.item.artists[0].name
        let youtubeVideoId = state.youtubeVideoId
        if (songName !== state.prev_songName || songArtist !== state.prev_songArtist) {
            let youtubeRes = await getYoutubeSearchId(encodeURI(songName + ' ' + songArtist));
            console.log('Fetch Youtube Search', youtubeRes, youtubeRes.items[0].id.videoId)
            if (!youtubeRes) return
            youtubeVideoId = youtubeRes.items[0].id.videoId
        }
        return {
            is_playing: spotifyRes.is_playing,
            progress_ms: spotifyRes.progress_ms,
            duration_ms: spotifyRes.item.duration_ms,
            songName,
            songArtist,
            youtubeVideoId,
            ...spotifyRes.item,
        }
    }

    const youtubeVideoFinished = async () => {
        if (appActive && state.youtubeVideoFinished) {
            // si ya termino el video
            console.log('update youtubeVideoFinished')
            // Lanzamos la siguiente cancion
            await nextTrack(access_token)

            setTimeout(async () => {
                // Obtenemos la data de spotify y Youtube
                const data = await getDataSpotifysYoutube()
                if (state.keepSpotifyPlaying) {
                    // Si keepSpotifyPlaying empezamos el playback y seteamos un timeout 10 segundos antes que acabe cancion
                    // Esto para que cuenten las reproducciones en spotify
                    console.log('PAUSE SONG IN:', data.duration_ms - data.progress_ms - 10000)
                    setTimeout(() => {
                        pausePlayback(access_token);
                    }, data.duration_ms - data.progress_ms - 5000);
                } else {
                    // Su no keepSpotifyPlaying, pausamos la resproduccion en spotify
                    pausePlayback(access_token);
                }
                setState({
                    ...state,
                    prev_songName: state.songName,
                    prev_songArtist: state.songArtist,
                    songName: data.songName,
                    songArtist: data.songArtist,
                    youtubeVideoId: data.youtubeVideoId,
                    youtubeVideoFinished: false
                })
            }, 1500);
            // set la var youtubeVideoFinished false
            setState({
                ...state,
                youtubeVideoFinished: false
            })
        }
    }
    useEffect(() => {
        youtubeVideoFinished()
    }, [state.youtubeVideoFinished]);
    return {
        ...state
    }

}


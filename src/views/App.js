import React, {useState} from 'react';
import {YoutubePlayer} from "../components/YoutubePlayer";
import {UseYoutubeMode} from "../components/UseYoutubeMode";

export function App() {

    const [appActive, setAppActive] = useState(false);
    const [youtubePlayerEnded, setYoutubePlayerEnded] = useState(false);

    const youtubeMode = UseYoutubeMode({appActive: appActive, youtubePlayerEnded})
    if(youtubePlayerEnded){
        setYoutubePlayerEnded(false)
    }

    console.log('youtubeMode', youtubeMode)
    return (
        <div>
            <h1>App</h1>
            {
                appActive ? (
                    <button onClick={() => setAppActive(false)}>
                        STOP APP
                    </button>
                ) : (
                    <button onClick={() => setAppActive(true)}>
                        START APP
                    </button>
                )
            }
            {
                youtubeMode.youtubeVideoId ? (
                    <YoutubePlayer
                        callbackYoutubePlayer={() => setYoutubePlayerEnded(true)}
                        videoId={youtubeMode.youtubeVideoId}
                    />
                ) : null
            }
        </div>
    );
}

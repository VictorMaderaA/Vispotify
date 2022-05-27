import React from 'react';
import YouTube from 'react-youtube';

export function YoutubePlayer(props) {
    const _onEnded = () => {
        console.log('onEnd YoutubePlayer')
        props.callbackYoutubePlayer();
    }
    return (
        <YouTube
            videoId={props.videoId}
            opts={{
                height: '390',
                width: '640',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 1
                }
            }}
            onEnd={_onEnded}
        />
    );
}


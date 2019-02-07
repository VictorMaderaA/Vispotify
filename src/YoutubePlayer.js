import React, { Component } from 'react';
import YouTube from 'react-youtube';

class YoutubePlayer extends Component
{

  constructor(){
    super();
    this._onEnded = this._onEnded.bind(this);

  }

  render()
  {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return(
    <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onEnd={this._onEnded}
      />
    );
  }

  _onEnded(event) {
    console.log('Fin del video');
    this.props.callbackYoutubePlayer();
  }

}

export default YoutubePlayer
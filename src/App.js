import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import YoutubePlayer from './YoutubePlayer.js';
import { getUserData, getCurrentSongData, pausePlayback, nextTrack}  from './SpotifyManager';
import { getYoutubeSearchId } from './YoutubeManager'


let defaultStyle = {
  color: '#fff'
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      user_display_name: null,
      user_email: null,
      user_id: null,
      user_image_url: null,

      song_name: null,
      song_artist: null,
      song_duration_ms: null,
      song_id: null,

      youtube_url: null,

      logged_in: null,
      accessToken: null
    }
  }



  componentDidMount() {

    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    this.setState({accessToken: accessToken});

    if(!accessToken) return; 

    getUserData(accessToken);

    this.startFetchingData(accessToken);
  }

  startFetchingData = async(accessToken) => {
    let _userData = await getUserData(accessToken);

    if(_userData)
    {
      this.setUserData(_userData);
      this.setState({logged_in: true});
      this.update_checkCurrentSong(accessToken);
      await pausePlayback(this.state.accessToken);
    }
  }

  setUserData = (data) => {
    this.setState({user_display_name: data.display_name});
    this.setState({user_email: data.email});
    this.setState({user_id: data.id});
    this.setState({user_image_url: data.images[0].url});
  }

  setSongData = (data) => {
    this.setState({song_name: data.item.name});
    this.setState({song_artist: data.item.artists[0].name});
    this.setState({song_id: data.item.id});
    this.setState({song_duration_ms: data.duration_ms});
  }

  update_checkCurrentSong = async (accessToken) => {
    let _songData = await getCurrentSongData(accessToken);

    if(!_songData) return;
    if(this.state.song_id === _songData.item.id) return

    this.setSongData(_songData);

    let _search = this.getEncodedSearchUri(this.state.song_name, this.state.song_artist);

    let _youtubeUrl = await getYoutubeSearchId(_search);

    this.setState({youtube_url: _youtubeUrl})
  }

  getEncodedSearchUri = (songName, songArtist) => {
    return encodeURI(songName + ' ' + songArtist);
  }


  callbackYoutubePlayer = async () => {
    await nextTrack(this.state.accessToken);
    await pausePlayback(this.state.accessToken);
    setTimeout(() => {
      this.update_checkCurrentSong(this.state.accessToken); 
    }, 1500);
    
  }

  render() {
    return (
      <div className="App">
        {
          this.state.logged_in ?
          <div>
            <h1 style={{...defaultStyle, 'fontSize': '54px'}}>Vispotify</h1>
            <h2 style={{...defaultStyle, 'fontSize': '34px'}}>See your music</h2>
            <h3 style={{...defaultStyle, 'fontSize': '24px'}}>
              Connected to {this.state.user_display_name} Account
            </h3>
            <h4>Current Song: {this.state.song_name}</h4>
            <h4>Artist: {this.state.song_artist}</h4>

            {this.state.youtube_url ? 
            <YoutubePlayer videoId={this.state.youtube_url} callbackYoutubePlayer={this.callbackYoutubePlayer}/> : <h5>NoVideoFound</h5>}

          </div> : <div>
              <button onClick={() => window.location = 'http://localhost:8888/login'}
              style={{padding:'20px', margin:'20px'}}>Log in with Spotify</button>
            </div>
        }
      </div>
    );
  }
}

export default App;
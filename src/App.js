import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import YoutubePlayer from './YoutubePlayer.js';
import { getUserData, getCurrentSongData}  from './SpotifyManager';


let defaultStyle = {
  color: '#fff'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      songData: '',
      videoData: ''
    }

    this.prevSong = {
      name: '',
      artist:''
    }

    this.userData = {};
    this.songData = {};
    
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    let _userData = getUserData(accessToken);
    if(_userData) this.userData = _userData;
    console.log(this.userData);

    let _songData = getCurrentSongData(accessToken);
    if(_songData) this.songData = _songData;
    console.log(this.songData);

    if(!accessToken) return; 

    // this.update(accessToken);
    // setInterval(() => {   
    //   this.update(accessToken);
    // }, 10000)
  }

  update(accessToken){
    this.GetCurrentSong(accessToken);

    if(this.prevSong.name === this.state.songData.name && this.prevSong.artist === this.state.songData.artists[0].name)
    {
      console.log('El video no a cambiado');
      return;
    }

    console.log('El video cambio');        
    this.prevSong.name = this.state.songData.name;
    if(this.state.songData.artists)
    this.prevSong.artist = this.state.songData.artists[0].name; 

    if(this.state.songData.artists)
    {
      let search = encodeURI(this.state.songData.name + ' ' + this.state.songData.artists[0].name);
      this.GetUrlYoutube(search);
    }
  }


  GetCurrentSong(accessToken) {
    console.log('Obteniendo la cancion Actual Spotify')
    fetch('https://api.spotify.com/v1/me/player/currently-playing',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      if(!data) return;
      this.setState({songData: data.item});
    });
  }

  GetUrlYoutube(search)
  {
    console.log(search); //TODO -TEST THAT IT WORKS WITH IS ULR 
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q='+search+'&key=AIzaSyDuNGLnUASRTFPRSbPrNldPrql53vRqm8E',
    {
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      if(!data) return;
      this.setState({videoData: data});
    });
  }


  render() {
    return (
      <div className="App">
        {
          this.userData ?
          <div>
            <h1 style={{...defaultStyle, 'fontSize': '54px'}}>Vispotify</h1>
            <h2 style={{...defaultStyle, 'fontSize': '34px'}}>See your music</h2>
            <h3 style={{...defaultStyle, 'fontSize': '24px'}}>
              Connected to {this.state.serverData.user.name} Account
            </h3>
            <h4>Current Song: {this.state.songData.name}</h4>
            <h4>Artist: {this.state.songData.artists && this.state.songData.artists[0].name}</h4>

            {this.state.videoData.items ? 
            <YoutubePlayer videoId={this.state.videoData.items[0].id.videoId}/> : <h5>NoVideo</h5>}
            

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
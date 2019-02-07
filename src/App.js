import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import YouTube from 'react-youtube';


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
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if(!accessToken) return;
    
    fetch('https://api.spotify.com/v1/me',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({serverData: {user: {name: data.display_name}}}));  

    fetch('https://api.spotify.com/v1/me/player/currently-playing',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      if(!data.item) return;
      this.setState({songData: data.item});
    });
    this.GetCurrentSong(accessToken);

    setInterval(() => {   
      this.GetCurrentSong(accessToken);

      if(this.prevSong.name === this.state.songData.name && this.prevSong.artist === this.state.songData.artists[0].name)
      {
        console.log('El video no a cambiado');
        return;
      }

      console.log('El video cambio');        
      this.prevSong.name = this.state.songData.name;
      this.prevSong.artist = this.state.songData.artists[0].name; 

      let search = encodeURI(this.state.songData.name + ' ' + this.state.songData.artists[0].name);
      this.GetUrlYoutube(search);
    }, 5000)



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
          this.state.serverData.user ?
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


class YoutubePlayer extends Component
{
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
  }

}
export default App;
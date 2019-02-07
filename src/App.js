import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import YoutubePlayer from './YoutubePlayer.js';
import { getUserData, getCurrentSongData}  from './SpotifyManager';
import { stringify } from 'querystring';


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

      logged_in: null
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

    getUserData(accessToken);

    this.startFetchingData(accessToken);



    // let _songData = getCurrentSongData(accessToken);
    // if(_songData) this.songData = _songData;
    // console.log(this.songData);

   

    // this.update(accessToken);
    // setInterval(() => {   
    //   this.update(accessToken);
    // }, 10000)
  }

  startFetchingData = async(accessToken) => {
    // getUserData(accessToken).then(data => this.setUserData(data));
    let _userData = await getUserData(accessToken);
    let _songData = await getCurrentSongData(accessToken);

    console.log(JSON.stringify(_songData));

    this.setUserData(_userData);
    //this.setSongData(_songData);
    this.setState({logged_in: true});
  }


  setUserData = (data) => {
    this.setState({user_display_name: data.display_name});
    this.setState({user_email: data.email});
    this.setState({user_id: data.id});
    this.setState({user_image_url: data.images[0].url});
  }

  setSongData = (data) => {
    this.setState({user_display_name: data.display_name});
    this.setState({user_email: data.email});
    this.setState({user_id: data.id});
    this.setState({user_image_url: data.images[0].url});
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
          this.state.logged_in ?
          <div>
            <h1 style={{...defaultStyle, 'fontSize': '54px'}}>Vispotify</h1>
            <h2 style={{...defaultStyle, 'fontSize': '34px'}}>See your music</h2>
            <h3 style={{...defaultStyle, 'fontSize': '24px'}}>
              Connected to {this.state.user_display_name} Account
            </h3>
            <h4>Current Song: {this.state.song_name}</h4>
            <h4>Artist: {this.state.song_artist}</h4>

            {/* {this.state.videoData.items ? 
            <YoutubePlayer videoId={this.state.videoData.items[0].id.videoId}/> : <h5>NoVideo</h5>} */}

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
import React from 'react';
import store from '../store.js'
import setLyrics from '../action-creators/lyrics.js'
import Lyrics from '../components/Lyrics'
import axios from 'axios'




class LyricsContainer extends React.Component {

  constructor () {
    super();
  
    this.state = Object.assign({}, store.getState(), {artistQuery: '', songQuery: ''})

    this.setArtist= this.setArtist.bind(this)
    this.setSong= this.setSong.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
   
  handleSubmit(event){
    event.preventDefault();
    axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
    .then((res) => res.data)
    .then((lyrics) => {
      const lyricsAction = setLyrics(lyrics)
      store.dispatch(lyricsAction)
    })
  }

  setArtist(artistQuery){
    this.setState({
      artistQuery,
    })
   }
  
  setSong(songQuery){
    this.setState({
      songQuery,
    })

  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const newState = store.getState();
      this.setState(newState);
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render () {
    console.log(this.state)
  

    return (
      <div>
      <Lyrics 
      text={this.state.text} 
      setArtist={this.setArtist} 
      setSong={this.setSong}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit ={this.handleSubmit}
       />
      </div>
    );
  }
}

export default LyricsContainer;

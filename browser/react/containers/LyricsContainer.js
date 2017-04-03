import React from 'react';
import store from '../store.js'
import {setLyrics, fetchLyrics} from '../action-creators/lyrics.js'
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


    let lyricsThunk = fetchLyrics(this.state.artistQuery,this.state.songQuery)
    store.dispatch(lyricsThunk)

    // axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
    // .then((res) => {
    //   // console.log(res.data)
    //   return res.data})
    // .then((lyrics) => {
    //   // console.log(lyrics);
    //   const lyricsAction = setLyrics(lyrics.lyric)
    //   store.dispatch(lyricsAction)
    // })
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
    // console.log(this.state)

    // console.log('this.state is ',this.state)
    return (
      <div>
      <Lyrics
      text={this.state.lyrics.text}
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

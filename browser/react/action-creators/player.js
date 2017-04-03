import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST} from '../constants.js'
import AUDIO from '../audio.js'
import store from '../store.js'
// import axios from 'axios'
//
//--------------------------------------------------------------------------------------------------------
//-----------------------------------------Actions -------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

export const startPlaying = ()=>{
	return {type: START_PLAYING};
}

export const stopPlaying = ()=>{
  return {type: STOP_PLAYING};
}

export const setCurrentSong = (currentSong)=>{
  return {type: SET_CURRENT_SONG, currentSong: currentSong};
}

export const setList = (songList)=>{
  return {type: SET_LIST, currentSongList: songList};
}

//--------------------------------------------------------------------------------------------------------
//---------------------------------------Thunk Creators -------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

export const playThunkCreator = ()=>{
  return function (dispatch, getState) {
    console.log('playing!!!!!!!!');
    AUDIO.play();
    dispatch(startPlaying());
  }
}

export const pauseThunkCreator = () => {
  return function (dispatch, getState) {
    AUDIO.pause();
    dispatch(stopPlaying());
  }
}

export const loadThunkCreator = (currentSong, currentSongList) =>{
  return function(dispatch,getState){
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    dispatch(setCurrentSong(currentSong));
    dispatch(setList(currentSongList));
  }
}

export const startSongThunkCreator = (song, list) => {
  console.log('songTHC passed in vals: ',song, list)
  return function(dispatch,getState){
    let pauseThunk=pauseThunkCreator();
    dispatch(pauseThunk);//be care you don't end up in a loop!!!!!!!

    let loadThunk=loadThunkCreator(song, list);
    dispatch(loadThunk);

    let playThunk=playThunkCreator();
    dispatch(playThunk);
  }
}

export const toggleOneThunkCreator = (selectedSong, selectedSongList) => {
  console.log('toggleOneTHC passed in vals: ',selectedSong, selectedSongList)
  return function(dispatch,getState){
    let storeState=store.getState();
    // console.log(storeState);
    if(!Object.keys(storeState.player.currentSong).length){

      let startSongThunk=startSongThunkCreator(selectedSong,selectedSongList);
      dispatch(startSongThunk);
    }
    else if(selectedSong.id !== storeState.player.currentSong.id){
        let startSongThunk=startSongThunkCreator(selectedSong,selectedSongList);
        dispatch(startSongThunk);
      }
    else {
      let toggleThunk=toggleThunkCreator();
      dispatch(toggleThunk);
    };
  }
}

export const toggleThunkCreator = ()=> {
  return function(dispatch,getState){
    let storeState=store.getState();
    if (storeState.player.isPlaying) {
      let pauseThunk=pauseThunkCreator();
      dispatch(pauseThunk);
    }
    else {
      let playThunk=playThunkCreator();
      dispatch(playThunk);
    }
  }
}

export const nextThunkCreator = () => {
  return function(dispatch,getState){
    let storeState=store.getState();
    let startSongThunk=startSongThunkCreator(...skip(1, storeState.player));
    dispatch(startSongThunk);
  }
}

export const prevThunkCreator = () => {
  return function(dispatch,getState){
    let storeState=store.getState();
    let startSongThunk=startSongThunkCreator(...skip(-1, storeState.player));
    dispatch(startSongThunk);
  }
}

//
// export const fetchLyrics = function (artist, song) {
//   return function (dispatch, getState) {
//     axios.get(`/api/lyrics/${artist}/${song}`)
//       .then(res => {
//         dispatch(setLyrics(res.data.lyric));
//       });
//   };
// };

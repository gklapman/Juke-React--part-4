import {SET_LYRICS} from '../constants.js'
import axios from 'axios'


export const setLyrics = (text)=>{
	return {type: SET_LYRICS, lyrics: text}
}

export const fetchLyrics = function (artist, song) {
  return function (dispatch, getState) {
    axios.get(`/api/lyrics/${artist}/${song}`)
      .then(res => {
        dispatch(setLyrics(res.data.lyric));
      });
  };
};

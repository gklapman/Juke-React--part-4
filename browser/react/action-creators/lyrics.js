import {SET_LYRICS} from '../constants.js'


function setLyrics (text){
	return {type: SET_LYRICS, lyrics: text}
} 

export default setLyrics;


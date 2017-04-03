import {SET_LYRICS} from '../constants'



const initialState = {
	text: '',
	
};



export default function reducer (prevState = initialState, action) {

	const newState = Object.assign({}, prevState);

	switch(action.type){
		case SET_LYRICS:
			newState.text = action.lyrics
			return newState;
				break;
	
		default: 
			return prevState;
	}
}


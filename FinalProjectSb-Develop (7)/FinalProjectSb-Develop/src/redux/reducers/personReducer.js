import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../types/personType'

export const personReducer = (store = {}, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...store,
				...action.payload
			}

		case SIGN_UP:
    	return {
      ...store,
      ...action.payload,
    	}

    case SIGN_OUT:
   		return {
      ...store,
      ...action.payload,
		}
	
		default:
			return store
	}
}
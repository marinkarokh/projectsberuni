import { ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS } from "../types/commentTypes"

export const commentsReducer = (state = [], action) => {

	switch (action.type) {
		case SET_COMMENTS:
			return action.payload

        case ADD_COMMENT:
            return [
				...state,
				action.payload
			]
		case DELETE_COMMENT:
				return state.filter((comment) => comment._id !== action.payload)

		default:
			return state
	}
}

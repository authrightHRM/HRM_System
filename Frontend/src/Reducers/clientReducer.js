const initialState = {
	client: null,
	loggedIn: false,
	loggingIn: false,
	loginError: false,

	saving: false,
	saved: false,
	savedClient: null,

	fetching: false,
	fetched: false,
	clientList: [],
};

export const client = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_CLIENT_PENDING': {
			return { ...state, fetching: true };
		}
		case 'FETCH_CLIENT_SUCCESS': {
			return {
				...state,
				fetching: false,
				fetched: true,
				clientList: action.payload,
			};
		}
		case 'FETCH_CLIENT_FAILURE': {
			return { ...state, fetching: false, error: true };
		}

		case 'UPDATE_CLIENT_INITIAL': {
			return { ...state, updated: false };
		}
		case 'UPDATE_CLIENT_PENDING': {
			return { ...state, updating: true };
		}
		case 'UPDATE_CLIENT_SUCCESS': {
            let clientList = [...state.clientList];
            for(let i = 0; i < clientList.length; i++) {
                if(clientList[i].clientId === action.payload.clientId) {
                    clientList[i] = action.payload;
                    break;
                }
            }
			return {
				...state,
				clientList: clientList,
				updating: false,
				updated: true,
			};
		}
		case 'UPDATE_CLIENT_FAILURE': {
			return { ...state, updating: false, error: true };
		}
		case 'CREATE_CLIENT_INITIAL': {
			return { ...state, updated: false };
		}
		case 'CREATE_CLIENT_PENDING': {
			return { ...state, updating: true };
		}
		case 'CREATE_CLIENT_SUCCESS': {
			//state.createdClient = action.payload;
			//var clientList = state.clientList
			//clientList.append(action)
			return {
				...state,
				clientList: [...state.clientList, action.payload],
				updating: false,
				updated: true,
			};
		}
		case 'CREATE_CLIENT_FAILURE': {
			return { ...state, updating: false, error: true };
		}
		default:
			return state;
	}
};

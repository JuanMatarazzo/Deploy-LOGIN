import {
  ALL_USERS,
  USER_ID,
  LOGIN,
  UPDATE_USER,
  DELETE_USER,
  USER_CREATE,
  LIMP_STATE,
  LIMP_DETAIL,
  LIMP_ERROR,
  FILTER_NAME,
  FILTER_GENDER
} from "./actions";

let initialState = {
  Users: [],
  User: [],
  UserId: {},
  token: "",
  error: [],
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        Users: action.payload,
      };
    case USER_ID:
      return {
        ...state,
        UserId: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        User: action.payload.userData,
        token: action.payload.token,
        error: action.payload.error,
      };
      case UPDATE_USER:
        if(!action.payload.data){
          return {
            ...state,
            error: ['Error']
          }
        }
        return {
          ...state,
          Users: state.Users.map((user) =>
            user.id === action.payload.data.id ? action.payload.data : user
          ),
          error: action.payload.error
        };
 
    case DELETE_USER:
      return {
        ...state,
        Users: state.Users.filter((user) => user.id !== action.payload),
      };
    case USER_CREATE:
      return {
        ...state,
        Users: [...state.Users, action.payload.resp],
        error: action.payload.error,
      };
    case LIMP_STATE:
      return {
        Users: [],
        User: [],
        UserId: {},
        token: "",
        error: [],
      };
    case LIMP_DETAIL:
      return {
        ...state,
        UserId: {},
      };
    case LIMP_ERROR:
      return {
        ...state,
        error: [],
      };
      case FILTER_NAME:
        return {
          ...state,
          Users: action.payload
        }
      case FILTER_GENDER:
        return {
          ...state,
          Users: action.payload
        }
    default:
      return { ...state };
  }
};

export default reducer;

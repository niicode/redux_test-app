const redux = require('redux')
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default
const loggerMiddleware = require('redux-logger')
const axios = require('axios')
const logger = loggerMiddleware.createLogger()

const initialState = {
  isLoading : false,
  makes: [],
  error: ''
}

//Action types 
const FETCH_MAKES = 'FETCH_MAKES';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

//action methods 
const fetchMakesRequest = () =>{
  return {
    type: FETCH_MAKES
  }
}

//action methods 
const fetchMakeSuccess = makes =>{
  // console.log(makes)
  let der= {
    type: FETCH_SUCCESS,
    payload: makes
  }
  console.log(der);
  return der;
}


//action methods 
const fetchErrorMsg = error => {

  let err =  {
    type: FETCH_FAILED,
    payload: error
  }

  return err
}


//Reducers
const reducer = (state= initialState, action)=> {
  switch(action.type){
    case FETCH_MAKES:
      return {
        ...state,
        isLoading: true,
      }
      break;
    case FETCH_SUCCESS:

        return {
          ...state,
        isLoading: false,
        makes: action.payload
      }
      // console.log(res)
      break;
    case FETCH_FAILED:
      return {
        isLoading: false,
        error: action.payload
      }
      break;
      default: return state;
  }
}

const fetchMakes = () => {
  return function (dispatch){
    dispatch(fetchMakesRequest())
    axios.get('https://d.bluespaceafrica.com/ajax/motor/get-makes/')
    .then(response => {
      //response.data
      const make = response.data.map(make => make.vehicle_make_name)
      // console.log(make)
      dispatch(fetchMakeSuccess(make))
      // console.log(fetchMakeSuccess())
    })
    .catch(error =>{
      //error.message
      dispatch(fetchErrorMsg(error))
    })
  }
}





const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))
const unscubscribe= store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchMakes())
unscubscribe()


///https://d.bluespaceafrica.com/ajax/motor/get-makes/
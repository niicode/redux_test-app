const redux = require('redux')
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = 'BUY_CAKE';
const ADD_CAKE = 'ADD_CAKE';
const ICE_CREAM = 'ICE_CREAM'


const InitialIceCream = {
  amount: 20
}

const InitialAmount = {
  amount: 10
}

const buyCake = () => {
  return{
    type: BUY_CAKE
  }
}

const buyIceCream = () => {
  return {
    type: ICE_CREAM
  }
}

const addCake = () => {
  return {
    type: ADD_CAKE
  }
} 



const Cakereducer = (state = InitialAmount, action = buyCake) => {
  switch(action.type){
    case BUY_CAKE:
      return{
        amount : state.amount - 1
      }
      break;
    case ADD_CAKE:
      return {
        amount : state.amount + 1
      }
      default: return state
  }
}

const IceCream = (state = InitialIceCream, action = buyIceCream) =>{
  switch (action.type){
    case ICE_CREAM:
      return{
        amount : state.amount - 1
      }
    default:
       return state
  }
}

const rootReducer = combineReducers({
  ice: IceCream,
  cake: Cakereducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial Value', store.getState())
const unsubscribe =store.subscribe(()=> {})
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())

unsubscribe()






















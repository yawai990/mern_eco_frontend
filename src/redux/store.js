import { createStore, combineReducers, applyMiddleware } from 'redux';
import { counterReducer } from './reducer/reducer';
import { userRegisterLoginReducer } from './reducer/user';
import thunk from 'redux-thunk';
import { getCategoriesReducer } from './reducer/categoryReducer';

const reducer = combineReducers({
    cart : counterReducer,
    userRegisterLogin : userRegisterLoginReducer,
    getCategories : getCategoriesReducer
});

const userData =  localStorage.getItem('userInfo') ? 
                            JSON.parse(localStorage.getItem('userInfo'))
                            : sessionStorage.getItem('userInfo') ?
                            JSON.parse(sessionStorage.getItem('userInfo'))
                              : {}

const cartItemsInLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
  const INITIAL_STATE = {
    cart : {
      cartItems: cartItemsInLocalStorage,
      itemsCount : cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity ,0) : 0 ,
      cartSubtotal : cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce( (price, item) => price + item.price * item.quantity  ,0) : 0,
    },
    userRegisterLogin : { userInfo :userData || 'user info'}
  }

const middleware = [thunk]

const store = createStore( reducer, INITIAL_STATE,applyMiddleware(...middleware));

export default store; 
import {createStore, applyMiddleware,combineReducers} from 'redux'
import reducer from '../reducer/userReducer'
import thunk from 'redux-thunk'
import categoryReducer from '../reducer/categoyReducer'
import createCategoryReducer from '../reducer/create_category_reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

// const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

const store = createStore(combineReducers({
    userReducer:reducer,
    categoryReducer:categoryReducer,
    createCategory:createCategoryReducer
}),composeWithDevTools(applyMiddleware(thunk)))

export default store;
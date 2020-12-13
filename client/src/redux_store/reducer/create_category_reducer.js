// import {signup} from '../action/signup_action'
// import store from '../store/store'
// import {login} from '../action/login_action'
const initialState = {
    data:[],
    error:'',
    message:'',
    exists:false
}

const createCategoryReducer = (state = initialState , action) => {
    const {type,payload} = action
    // console.log("Payload" , payload)
    if(type == "CREATE_CATEGORY"){
        console.log("Payload" , payload)    
        return {
            ...state,
            data: payload
        }
    }
    if(type == "CATEGORY_CREATION_ERROR"){
        return {
            ...state,
            exists:true,
            error: payload
        }
    }
    return state
}

export default createCategoryReducer
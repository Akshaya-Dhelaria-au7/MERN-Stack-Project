// import {signup} from '../action/signup_action'
// import store from '../store/store'
// import {login} from '../action/login_action'
const initialState = {
    data:[],
    user:{},
    error:'',
    // category_error:''
}

const reducer = (state = initialState , action) => {
    const {type,payload} = action
    if(type == "USER_SIGNUP"){
        // console.log("Payload" , payload)
        return { 
            ...state,
            user: {...payload},
            error:''
        }
    }
    if(type == "USER_SIGNUP_ERROR"){
        return {
            ...state,
            error: payload
        }
    }
    if(type == "USER_LOGIN"){
        return {
            ...state,
            user:{...payload},
            error:''
        }
    }
    if(type == "USER_LOGIN_ERROR"){
        return {
            ...state,
            error: payload
        }
    }
    // if(type == "CATEGORY"){
    //     console.log("Payload" , payload)    
    //     return {
    //         ...state,
    //         data: payload
    //     }
    // }
    // if(type == "CATEGORY_ERROR"){
    //     return {
    //         ...state,
    //         category_error: payload
    //     }
    // }
    return state
}

export default reducer
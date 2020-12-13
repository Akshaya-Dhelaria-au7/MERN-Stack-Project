// import {signup} from '../action/signup_action'
// import store from '../store/store'
// import {login} from '../action/login_action'
const initialState = {
    data:[],
    message:'',
    error:'',
    error_message:''
}

const categoryReducer = (state = initialState , action) => {
    const {type,payload} = action
    // console.log("Payload" , payload)
    if(type == "CATEGORY"){
        console.log("Payload" , payload)    
        return {
            ...state,
            data: payload
        }
    }
    if(type == "CATEGORY_ERROR"){
        return {
            ...state,
            error: payload
        }
    }
    return state
}

export default categoryReducer
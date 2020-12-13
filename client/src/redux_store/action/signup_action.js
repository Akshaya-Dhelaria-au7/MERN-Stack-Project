import Axios from 'axios';
import Backend_URL from '../../deployed/backend'

export const signup = eachUser => {
    return{
        type:"USER_SIGNUP",
        payload: eachUser
    }
}

export const fetchDataError = error => {
    return {
        type:"USER_SIGNUP_ERROR",
        payload: error
    }
}

// export const category = eachUser => {
//     // console.log(eachUser)
//     return{
//         type:"CATEGORY",
//         payload: eachUser
//     }
// }

// export const fetchCategoryError = error => {
//     return {
//         type:"CATEGORY_ERROR",
//         payload: error
//     }
// }

export const fetchData = (userInfo) => {
    return async function(dispatch){
        // console.log("Dispatch",dispatch , "Info" , userInfo)
        await Axios.post(`${Backend_URL}/users/signup` , userInfo )
        .then(response => {
            // console.log("Action ",response.response)
            dispatch(signup(response.response))
        })
        .catch(error => {
            // console.log("Action error",error)
            dispatch(fetchDataError(error.response.data.error))
        })
    }
}

// export const fetchCategory = () => {
//     return async function(dispatch){
//         // console.log("Dispatch",dispatch , "Info" , userInfo)
//         await Axios.get(`${Backend_URL}/allcategory`)
//         .then(response => {
//             console.log("Action category ",response.data.data)
//             dispatch(category(response.data.data))
//         })
//         .catch(error => {
//             console.log("Action error category ",error)
//             dispatch(fetchDataError(error.response.data.message))
//         })
//     }
// }


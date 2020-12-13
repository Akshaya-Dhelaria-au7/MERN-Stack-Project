import Axios from 'axios';
import Backend_URL from '../../deployed/backend'

export const category = eachUser => {
    // console.log(eachUser)
    return{
        type:"CATEGORY",
        payload: eachUser
    }
}

export const fetchDataError = error => {
    return {
        type:"CATEGORY_ERROR",
        payload: error
    }
}

export const fetchData = (  ) => {
    return async function(dispatch){
        // console.log("Dispatch",dispatch , "Info" , userInfo)
        await Axios.get(`${Backend_URL}/allcategory`)
        .then(response => {
            // console.log("Action ",response.data.data)
            dispatch(category(response.data.data))
        })
        .catch(error => {
            // console.log("Action error",error)
            dispatch(fetchDataError(error.response.data.message))
        })
    }
}


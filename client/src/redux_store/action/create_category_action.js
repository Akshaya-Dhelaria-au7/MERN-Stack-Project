import Axios from 'axios';
import Backend_URL from '../../deployed/backend'

export const createCategory = eachCategory => {
    return{
        type:"CREATE_CATEGORY",
        payload: eachCategory
    }
}

export const createCategoryError = error => {
    return {
        type:"CATEGORY_CREATION_ERROR",
        payload: error
    }
}

export const fetchCreateCategory = (userInfo) => {
    return async function(dispatch){
        console.log("Dispatch login",dispatch , "Info" , userInfo)
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/category`, userInfo ,{
			headers:setHeader
		})
        .then(response => {
            console.log("Action create category ",response)
            dispatch(createCategory(response.data))
        })
        .catch(error => {
            console.log("Action error create category",error.response.data.message)
            dispatch(createCategoryError(error.response.data.message))
        })
    }
}


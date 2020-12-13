import React,{Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend'
import Spinner from '../loader.gif'

class DeleteCategory extends Component{

    deletingCategory = async () => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.delete(`${Backend_URL}/profile/deletetitle/${this.props.match.params._id}`,{
            headers:setHeader
        })
        .then((data) => console.log("Category deleted Successfully!!"))
        .catch((err) => console.log("Error while deleting Category" , err))
    }

    // componentDidMount(){
    //     // console.log("Profile page called")
    //     this.callingProfile()
    // }

    updateHandler = (id) => {
        this.props.history.push(`/profile/updating/${id}`)
    }

    render(){
        return(
            <Fragment>
                <p>Delete</p>
                <hr/>
                {/*
                    data.length == 0 ? <img src={Spinner} alt='Loading...'/> :
                    data.data.map(eachCategory => (
                        <div>
                            <p>{eachCategory.Category}</p>
                            <p>{eachCategory.Title}</p>
                            <p>{eachCategory.Link}</p>
                            <button className="btn btn-warning" onClick={() => this.updateHandler(eachCategory._id)}>Update</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    ))
                    */}
            </Fragment>
        )
    }
} 

export default DeleteCategory
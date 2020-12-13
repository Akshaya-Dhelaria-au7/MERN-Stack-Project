import React,{Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend'
import Spinner from '../loader.gif'
import './profile.css'
import noresult from './noresults.png'
import {connect} from 'react-redux'
import ProfilePic from './profile.png'

class Profile extends Component{
    state={
        data:[],
        initialized : false
    }

    callingProfile = async () => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.get(`${Backend_URL}/profile/alltitles`,{
            headers:setHeader
        })
        // .then((data) => console.log("Data in profile ",data))
        .then((data) => this.setState({data:data.data, initialized :true}))
        .catch((err) => this.setState({initialized : true}))
    }

    componentDidMount(){
        // console.log("Profile page called")
        this.callingProfile()
    }

    updateHandler = (id) => {
        const {data} = this.state
        this.props.history.push(`/profile/updating/${id}`,{data:data})
    }

    deleteHandler = async (id,index) => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.delete(`${Backend_URL}/profile/deletetitle/${id}`,{
            headers:setHeader
        })
        .then((data) => {
            var previousData = this.state.data;
            previousData.data.splice(index,1);
            this.setState({data: previousData})
        })
        .catch((err) => console.log("Error in profile is" , err))
        // this.callingProfile()
        setTimeout(() => {
            this.props.history.push(`/profile/mytutorials`)
        },5000)
    }

    render(){
        const {data,initialized} = this.state
        // console.log("Data in profile is" , data)
        // console.log("Props in profile" , this.props)
        return(
            <Fragment>
                {
                    localStorage.getItem('access-token') ? <span></span> : 
                    <div class="alert alert-danger" role="alert" style={{justifyContent:'center',width:'30vw',marginLeft:'450px'}}>
                        Log in to view your profile
                    </div>
                }
                <div className="card">
                  <img src={ProfilePic} alt="Profile" style={{"width":"15vw"}} />
                  <h3>{localStorage.getItem('Name')}</h3>
                  <p className="title">{localStorage.getItem('Email')}</p>
                </div>
                <hr/>
                <h4>Tutorials you have posted</h4>
                <br />
                {
                    (initialized == true && data.length == 0) ? <img className="no-result" src={noresult} alt="No Post Found"/> : data.length === 0 ? <img src={Spinner} alt='Loading...'/> :
                    data.data.map((eachCategory,index) => (
                        <div className="user-container">
                            <div className="row">
                                <div className="user-profile">
                                    <br/>
                                    <p className="titles" style={{'textTransform':'uppercase'}}>Title : {eachCategory.Title}</p>
                                    <a href={eachCategory.Link} target="_blank">Link : {eachCategory.Link}</a>
                                    <br/>
                                    <br/>
                                    <button className="btn btn-warning" onClick={() => this.updateHandler(eachCategory._id)}>
                                        <i className="fa fa-edit" 
                                        style={{
                                            'color':'white',
                                            'width':'50px',
                                            'position':'relative'
                                        }}>
                                        </i>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => this.deleteHandler(eachCategory._id,index)}><i className="fa fa-trash" style={{
                                            'color':'white',
                                            'width':'50px',
                                            'position':'relative'
                                        }}></i>
                                    </button> 
                                    <br />
                                    <br />
                                </div>
                            </div>
                        <br />
                        <br />
                        </div>
                    ))
                }
            </Fragment>
        )
    }
} 

const mapStateToProps = (state) => {
    console.log("User profile" , state)
    return {
        state: state.userReducer
    }
}

export default connect(mapStateToProps)(Profile)
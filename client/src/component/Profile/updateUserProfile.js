import React,{Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend'
// import Spinner from '../loader.gif'

class UpdateProfile extends Component{
    state={
        Title:'',
        Link:''
    }

    updatingProfile = async () => {
        console.log("Props update" , this.props)
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.put(`${Backend_URL}/profile/updatetitle/${this.props.match.params._id}`,{
            Title:this.state.Title,
            Link:this.state.Link
        },{
            headers:setHeader
        })
        .then((data) => console.log("Data in Updating Category ",data))
        // .then((data) => this.setState({data:data.data}))
        .catch((err) => console.log("Error in updating category is" , err.response))
    }

    changeHandler = (event) => {
		const {name,value} = event.target
		this.setState({
			[name]:value
		})
    }
    
    submitHandler = (event) => {
		this.updatingProfile()
		setTimeout(() => {
			this.props.history.push('/profile/mytutorials')
		},4000)
		// console.log("Updated Category")
		event.preventDefault()
		
	}

    render(){
        console.log("Props update in render" , this.props)
        const {data} = this.state
        console.log("Data in profile is" , data)
        const {Title,Link} = this.state
		const enableButton =  Title.length>1 && Link.length>5
        return(
            <div className="update-profile">
                <h4 style={{'padding':'5px'}}>Update your Post Details</h4>
                <hr/>
                {
					localStorage.getItem('access-token') ? <span></span> : 
					<div class="alert alert-danger" role="alert" style={{justifyContent:'center',width:'30vw',marginLeft:'450px'}}>
						Log in to create category
				  	</div>
				}
                <br/>
                <i class="fa fa-list" aria-hidden="true"></i>
                <input name="Title" type="text" placeholder="Title" value={Title} onChange={this.changeHandler}/>
                <br />
                <br />
                <i className="fa fa-link" aria-hidden="true"></i>
                <input name="Link" type="text" placeholder="Link" value={Link} onChange={this.changeHandler}/>
                <br />
                <br />
                <button className="btn btn-info" onClick={this.submitHandler} disabled={!enableButton}>Update Category</button>
                {/*
                    data.length == 0 ? <img src={Spinner} alt='Loading...'/> :
                    data.data.map(eachCategory => (
                        <div>
                            <p>{eachCategory.Title}</p>
                            <p>{eachCategory.Link}</p>
                        </div>
                    ))
                    */}
                <br />
                <br />
            </div>
        )
    }
} 

export default UpdateProfile
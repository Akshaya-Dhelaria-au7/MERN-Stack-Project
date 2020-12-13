import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'
import {connect} from 'react-redux'

class CreateTitle extends Component{
	state={
		Category:'',
        Title:'',
		Link:'',
		category_id:'',
		data:''
	}

	callingCreateApi = async () => {
		const {category_id} = this.state
		// console.log("ID is" , category_id)
		const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/title/createtitle/${category_id}`,{
            Title:this.state.Title,
            Link:this.state.Link
		},{
			headers:setHeader
		})
		.then((data) => this.setState({data:data.data.message}))
		.catch((err) => console.log("Error while creating Title",err.response))
	}

	changeHandler = (event) => {
		const {name,value} = event.target
		this.setState({
			[name]:value
		})
	}

	componentDidMount(){
		Axios.get(`${Backend_URL}/allcategory`)
		.then((data) => this.setState({
            Category:data.data
        }))
		.catch((err) => console.log("Error is",err.response))
    }

	submitHandler = (event) => {
		this.callingCreateApi()
		setTimeout(() => {
			const {data} = this.state
			if(data === "Link Already Exists!!") {
				console.log("Link exists")
			}
			else{
				this.props.history.push('/')
			}
			
		},4000)
		event.preventDefault()
		
	}

	storeCategory = (event) => {
		console.log(event.target.value)
		this.setState({
			category_id:event.target.value
		})
	}

	render(){
		const {Category,Title,Link,data} = this.state
		console.log("Props in create title" , this.props)
		console.log("Data is ",data)
		// console.log(category_id)
		// const accessToken = localStorage.getItem('access-token')
		const validation = Category && Title.length>1 && Link.length>5
		return(
				<Fragment>
					{
						localStorage.getItem('access-token') ? <span></span> : 
						<div class="alert alert-danger" role="alert" style={{justifyContent:'center',width:'30vw',marginLeft:'470px'}}>
							Log in to create Tutorials
					  	</div>
					}
                    <div className="create-title">
					<h3>Create the Tutorial </h3>
					<hr />
						<h4>Choose the category</h4>
						<select onChange={this.storeCategory} required>
						<option>Select the Category</option>
						{
							Category.length === 0 ? <img src={Spinner} alt='Loading...'/> :
							Category.data.map(eachCategory => (
								
								<Fragment>
									<option value={eachCategory._id} onClick={() => this.storeCategory(eachCategory._id)}>{eachCategory.Category}</option>
								</Fragment>
							))
						}
						</select>
						<br/>
						<br/>
						<i className="fa fa-list" aria-hidden="true"></i>
						<input name="Title" type="text" placeholder="Title" value={Title} onChange={this.changeHandler}/>
						<br />
						<br />
						<i className="fa fa-link" aria-hidden="true"></i>
						<input name="Link" type="text" placeholder="Link" value={Link} onChange={this.changeHandler}/>
						<br />
						<br />
						
						{
							data === "Link Already Exists!!" && <div className="alert alert-danger" role="alert" style={{justifyContent:'center','width':'30vw','marginLeft':'60px'}}>
	                    		Link already exists
	                		</div>
						}
						<button className="btn btn-info" onClick={this.submitHandler} disabled={!validation}>Create Tutorial</button>
						<br />
						<br />
					</div>
				</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return{
		state:state.categoryReducer
	}
}

export default connect(mapStateToProps)(CreateTitle);

import React , {Component, Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'
import noresults from './Profile/noresults.png'

class Links extends Component{
	state={
        data:[],                                    
        message:'',
        error:'',
        error_message:''
	}

	callingCreateApi = async () => {
		await Axios.get(`${Backend_URL}/title/titles/${this.props.match.params.category_id}`,{
        })
        .then((data) => this.setState({data:data.data, error_message:data.data.message}),() => console.log("State changed"))
        .catch((err) => this.setState({initialized : true}))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }
    
    clickHandler = (title_id,category_id,index) => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		Axios.post(`${Backend_URL}/likes/${title_id}`,{
            // likes:this.state.likes
        },{
			headers:setHeader
        })
        .then((data) => {
            console.log(data.data.message)
            var previousData = this.state.data;
            var likedPost =  previousData[index];
            likedPost.Likes.push(data.data.data.Like);
            previousData[index] = likedPost;
            this.setState({data: previousData,message:data.data.message})  
        })
		.catch((err) => err.response && err.response.data && this.setState({error:err.response.data.message}))
    }

	render(){
        const {data,error,message,error_message} = this.state
        console.log(message,"error message is ",error_message)                                      
		return(
            <Fragment>
            <br />
            <h4>List of Tutorials </h4>
            <hr />
            {
                error.length > 0 && <div class="alert alert-danger" role="alert" style={{'justifyContent':'center','width':'30vw','marginLeft':'440px'}}>
                    Please login to like the post.
                  </div> 
            }
            {

                error_message && error_message.length > 0 ? <img style={{'width':'70vw','height':'70vh'}} src={noresults} alt="No Posts Found"/> : data.length === 0 ? <img src={Spinner} alt='Loading...'/> : data.map((each,index) => (
                <div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title-handler">                                                                                                                                                                                                                         
                                <a className="link" style={{'textTransform':'uppercase'}} href={each.Link} target="_blank">{each.Title}</a>
                                <p>({each.Link})</p>
                                <br/>
                                <button className="btn btn-primary" onClick={() => this.clickHandler(each._id,each.category_id,index)}>Likes: {each.Likes.length}</button>
                                <br /> 
                            </div>
                        </div>
                    </div>
                <hr />
                </div>
            ))}
            </Fragment>
		)
	}
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

export default Links;

//(error_message.length > 0) ? <img style={{'width':'70vw','height':'70vh'}} src={noresults} alt="No Posts Found"/> : 


//                (error_message == undefined) ? <img style={{'width':'70vw','height':'70vh'}} src={noresults} alt="No Posts Found"/> : 

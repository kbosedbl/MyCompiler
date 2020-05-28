import React  from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import 'react-dropdown/style.css';
import './Dashboard.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Loader from 'react-loader-spinner';
import Navbar from './Navbar';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

class Dashboard extends React.Component
{
	constructor(props) 
	{
		super(props);
		let shouldRedirect = false;
	    if (localStorage.getItem('userTokenTime')) {
	      // Check if user holds token which is valid in accordance to time
	      const data = JSON.parse(localStorage.getItem('userTokenTime'));
	      if (new Date().getTime() - data.time > (3 * 60 * 60 * 1000)) {
	        // It's been more than hour since you have visited dashboard
	        localStorage.removeItem('userTokenTime');
	        shouldRedirect = true;
	      }
	    } else {
	      shouldRedirect = true;
	    }
		this.state = {
			redirect: shouldRedirect,
			language: 'C',
			code: '',
			selectedTab: 'write',
			input: '',
			output: '',
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.setValue = this.setValue.bind(this);
		this.onCustomInputChange = this.onCustomInputChange.bind(this);		
	}
	handleChange(event) 
	{	  	
		this.setState({language: event.target.value});	
		//console.log(event.target.value);
	}
	setValue(event)
	{
		this.setState({code: event});
		//console.log(this.state.code+"     "+this.state.versionIndex+"     "+this.state.language+"     "+this.state.clientId+"     "+this.state.clientSecret);
	}
	onCustomInputChange(event)
	{
		this.setState({input: event.target.value});
		//console.log(this.state.input);
	}	
	onSubmitHandler(event)
	{
		console.log(this.state);		
    	this.setState({loading: true});		  
	    axios.post('http://127.0.0.1:3333/api/execution', {
	        code: this.state.code,
	        language: this.state.language,
	        input: this.state.input
		}).then(res => {
			this.setState({loading: false});
			var stdout = (res.data.error !== undefined && res.data.error !== '') ? res.data.error : ((res.data.output !== undefined) ? res.data.output: 'Compilation error');
			this.setState({output: stdout});
	        console.log(this.state.output); 
		}).catch(err => {
			this.setState({loading: false});
			this.setState({output: 'Some error occured please try again'});
			console.log(err);
		});     

	}

	render()
	{
		var { loading , output} = this.state;
		if (this.state.redirect) return <Redirect to="/signIn" />
		return(			
				<div >
					<Navbar />
		            <select className="Dropdown" value={this.state.language} onChange={this.handleChange}>
					  <option selectedvalue="C">C</option>
					  <option value="CPP">C++</option>
					  <option value="JAVA">JAVA</option>
					  <option value="JAVASCRIPT">JAVASCRIPT</option>
					  <option value="PYTHON">PYTHON</option>
					</select>					
			        <ReactMde 
			        	weidth={100}
				        value={this.state.code}
				        onChange={this.setValue}
				        generateMarkdownPreview={markdown =>
				          Promise.resolve(converter.makeHtml(markdown))
				        }
			      	/>
			      	<div >
			      		<h4 className="std" 
			      			style={{
			      			marginTop: "2.1%"}}>
			      			Custom Input
		      			</h4>
			      		<input  
			      			type="text"			      			
			      			placeholder="" 
			      			className="stdin" 
			      			value={this.state.input} 
			      			onChange={this.onCustomInputChange}/>
			      	</div>
			      	<button 
			      		type="button2" 
			      		className="btn2 btn-success2" 
			      		onClick={this.onSubmitHandler.bind(this)}>Run</button>
		      		<br />	
		      		{loading ? 
		      				<div style={{
		      				         display: "flex",
									 justifyContent: "center",
       								 alignItems: "center"
		      				}}>
		      					<Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> 
	      					</div>
		      				: 
		      				output.length === 0 ?
		      					<br />
		      					:
			      				<div>		      					
			      					<h4 className="std" style={{
			      						marginTop: "2.1%"}}>
			      						Output
		      						</h4>
			      					<div class="stdout">		      						
			      						{this.state.output}		      						
			      					</div>
			      				</div>
		      				
		      		}	      		
				</div>
			);
	}
}

export default Dashboard;
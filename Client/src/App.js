import React , {Component} from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import  SignIn  from './components/Form/SignIn/signIn';
import  SignUp  from './components/Form/SignUp/signUp';
import  SignOut from './components/SignOut';

class App extends Component {	
	render(){
		return (
				<React.Fragment>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/signUp" component={SignUp} />
					<Route exact path="/signIn" component={SignIn} />
					<Route exact path="/signOut" render={SignOut} />
				</React.Fragment>
		);
	}
}

export default App;
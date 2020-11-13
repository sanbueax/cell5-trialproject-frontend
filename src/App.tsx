import React from 'react';
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';
// import { UserProvider } from './UserContext'
// import './App.css'

function App() {
	// const [user, setUser] = useState({
	// 	email: localStorage.getItem('email'),
	// 	isAdmin: localStorage.getItem('isAdmin') === 'true'
	// });

	// const unsetUser = () => {
	// 	localStorage.clear();
	// }

  return (
    <React.Fragment>
      <Router>
	      <NavBar />
	      <Container>
	      	<Switch>
	      		<Route exact path="/home" component={Home} />
				<Route exact path="/explore" component={Explore} />
	      	</Switch>
	      </Container>
      </Router>  
	</React.Fragment>  	  
  );
}

export default App;
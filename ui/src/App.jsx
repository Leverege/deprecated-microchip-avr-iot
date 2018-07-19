import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Modal from './components/Modal/Modal';
import WelcomePane from './components/WelcomePane/WelcomePane';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import './css/config.less';
import './app.less'
import Overview from './components/Main/Overview';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showShadow: false
    }
  }

  componentDidMount() {
    const contentSection = document.getElementById('App-content');
    contentSection.addEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const contentSection = document.getElementById('App-content');
    this.setState({ showShadow: contentSection.scrollTop > 0 })
  }

  renderModal = () => {
    if ( this.props.showModal ) {
      return <Modal />
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          {this.renderModal()}
          <TopNavBar showShadow={this.state.showShadow}/>
          <div id='App-content'>          
            <Switch>
              <Route exact path='/device/:uid' component={ Main } />
              <Route component={ WelcomePane } />            
            </Switch>
            <Route exact path='/' component={ Overview }/>
            <Footer/>
          </div>          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ( state ) => ({
  establishingFirebaseConnection: state.DeviceReducer.establishingFirebaseConnection,
  connectedToFirebase: state.DeviceReducer.connectedToFirebase,
  showModal: state.UIReducer.showModal
})

export default connect(mapStateToProps)(App);

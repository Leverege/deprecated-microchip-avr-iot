import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-slidedown/lib/slidedown.css'
import TopNavBar from './components/TopNavBar/TopNavBar';
import Modal from './components/Modal/Modal';
import WelcomePane from './components/WelcomePane/WelcomePane';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Overview from './components/Main/Overview';

import './css/config.less';
import './app.less'

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showShadow : false
    }
  }

  componentDidMount() {
    console.log( 'Powered by Leverege. IoT is hard. We make it easy.' )
    const contentSection = document.getElementById( 'App-content' );
    contentSection.addEventListener( 'scroll', this.handleScroll );
  }

  handleScroll = () => {
    const contentSection = document.getElementById( 'App-content' );
    this.setState( { showShadow : contentSection.scrollTop > 0 } )
  }

  renderModal = () => {
    return this.props.showModal ? <Modal /> : null
  }

  render() {
    return (
      <Router >
        <div className="App">
          {this.renderModal()}
          <TopNavBar showShadow={this.state.showShadow} />
          <div id="App-content">
            <Switch>
              <Route exact path="/device/:uid" component={Main} />
              <Route component={WelcomePane} />            
            </Switch>
            <Footer />
          </div>          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ( {
  establishingFirebaseConnection : state.DeviceReducer.establishingFirebaseConnection,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  showModal : state.UIReducer.showModal
} )

export default connect( mapStateToProps )( App );

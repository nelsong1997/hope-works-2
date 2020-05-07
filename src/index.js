import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route  } from "react-router-dom";
import Home from "./home"
import Form from "./form"
import Forms from "./forms"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
      return (
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/view-forms" component={Forms}/>
        </div>
      )
    }        
}

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>, 
document.getElementById('root'));

serviceWorker.unregister();
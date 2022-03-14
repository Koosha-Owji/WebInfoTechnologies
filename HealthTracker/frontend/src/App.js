import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import AboutUs from './components/AboutUs.js';
import AboutDiabetes from './components/AboutDiabetes';

const App = () => (
  <BrowserRouter>
      <Switch>
      <Route exact path="/home" component= {Home}/>
      <Route exact path="/aboutUs" component= {AboutUs}/>
      <Route exact path="/aboutDiabetes" component= {AboutDiabetes}/>
      </Switch>
  </BrowserRouter>
);


export default App;

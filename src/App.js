import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes, Link } from "react-router-dom";
import SignUp from "./views/Auth/SignUp";
import Nickname from "./views/Account/Nickname";
import SignIn from "./views/Auth/SignIn";
import {OAuth, SignUpOAuth} from "./views/Auth/OAuth";
import Footer from "./components/footer";
import SearchBarOnMap from "./components/searchBarOnMap";
import SearchResults from "./views/Search/SearchResult/index";

function App() {

  return (
      <Router>

          <Routes>
              <Route path="/" element={<SearchBarOnMap />} />
              <Route path="/search-results" element={<SearchResults />} />
          </Routes>


          <Routes>
              <Route path='/account'>
                  <Route path='nickname' element={<Nickname/>}></Route>
              </Route>
              <Route path='/auth'>
                  <Route path='sign-up' element={<SignUp/>}></Route>
                  <Route path='sign-in' element={<SignIn/>}></Route>
                  <Route path='sign-up-oauth/:userEmail/:userType' element={<SignUpOAuth/>}></Route>
                  <Route path='oauth-response/:token/:expirationTime' element={<OAuth/>}></Route>
              </Route>
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;

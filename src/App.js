import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./views/Auth/SignUp";
import Nickname from "./views/Account/Nickname";
import SignIn from "./views/Auth/SignIn";
import {OAuth, SignUpOAuth} from "./views/Auth/OAuth";

function App() {

  return (
    <Router>
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
    </Router>
  );
}

export default App;

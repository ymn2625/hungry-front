import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./views/User/SignUp";
import SignIn from "./views/User/SignIn";
import OAuth from "./views/User/OAuth";
function App() {

  return (
    <Router>
        <Routes>
            <Route path='/account'>
                <Route path='sign-up' element={<SignUp/>}></Route>
                <Route path='sign-in' element={<SignIn/>}></Route>
                <Route path='oauth-response/:token/:expirationTime' element={<OAuth/>}></Route>
            </Route>
        </Routes>
    </Router>
  );
}

export default App;

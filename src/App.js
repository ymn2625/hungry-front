import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./views/Auth/SignUp";
import Nickname from "./views/Account/Nickname";
import SignIn from "./views/Auth/SignIn";
import {OAuth, SignUpOAuth} from "./views/Auth/OAuth";

function App() {

  return (
      <Router>

          <div>
              <h1>사이트의 홈페이지</h1>
              <nav>
                  <ul>
                      <li>
                          <Link to="/auth/sign-in">로그인</Link>
                      </li>
                      <li>
                          <Link to="/auth/sign-up">회원가입</Link>
                      </li>
                  </ul>
              </nav>
          </div>

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

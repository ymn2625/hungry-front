import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./views/Auth/SignUp";
import Nickname from "./views/Account/Nickname";
import SignIn from "./views/Auth/SignIn";
import {OAuth, SignUpOAuth} from "./views/Auth/OAuth";
import Footer from "./components/footer";
import SearchBarOnMap from "./components/searchBarOnMap";
import SearchResults from "./views/Search/SearchResult/index";
import MyPage from "./views/Account/MyPage";
import Tel from "./views/Account/Tel";
import Password from "./views/Account/Password";
import FindAccount from "./views/Auth/FindAccount";



function App() {

    // Footer가 포함된 레이아웃 컴포넌트
    const LayoutWithFooter = ({ children }) => (
        <>
            {children}
            <Footer />
        </>
    );

    // padding이 필요한 레이아웃 컴포넌트
    const LayoutWithPadding = ({ children }) => (
        <>
            <div className='padding-box'>
                {children}
            </div>
        </>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutWithFooter><SearchBarOnMap /></LayoutWithFooter>} />
                <Route path="/search-results" element={<LayoutWithFooter><SearchResults /></LayoutWithFooter>} />

                <Route path='/account'>
                    <Route path='user' element={<LayoutWithPadding><MyPage/></LayoutWithPadding>}></Route>
                    <Route path='nickname' element={<LayoutWithPadding><Nickname/></LayoutWithPadding>}></Route>
                    <Route path='tel' element={<LayoutWithPadding><Tel/></LayoutWithPadding>}></Route>
                    <Route path='password' element={<LayoutWithPadding><Password/></LayoutWithPadding>}></Route>
                </Route>
                <Route path='/auth'>
                    <Route path='sign-up' element={<LayoutWithPadding><SignUp/></LayoutWithPadding>}></Route>
                    <Route path='sign-in' element={<LayoutWithPadding><SignIn/></LayoutWithPadding>}></Route>
                    <Route path='sign-up-oauth/:userEmail/:userType' element={<LayoutWithPadding><SignUpOAuth/></LayoutWithPadding>}></Route>
                    <Route path='oauth-response/:token/:expirationTime' element={<LayoutWithPadding><OAuth/></LayoutWithPadding>}></Route>
                    <Route path='find-account' element={<LayoutWithPadding><FindAccount/></LayoutWithPadding>}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

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



function App() {

    // Footer가 포함된 레이아웃 컴포넌트
    const LayoutWithFooter = ({ children }) => (
        <>
            {children}
            <Footer />
        </>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutWithFooter><SearchBarOnMap /></LayoutWithFooter>} />
                <Route path="/search-results" element={<LayoutWithFooter><SearchResults /></LayoutWithFooter>} />

                <Route path='/account'>
                    <Route path='user' element={<MyPage/>}></Route>
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

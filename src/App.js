import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import SignUp from "./views/Auth/SignUp";
import Nickname from "./views/Account/Nickname";
import SignIn from "./views/Auth/SignIn";
import {OAuth, SignUpOAuth} from "./views/Auth/OAuth";
import Footer from "./components/footer";
import SearchBarOnMap from "./views/Search/searchBarOnMap";
import SearchResults from "./views/Search/SearchResult/index";
import MyPage from "./views/Account/MyPage";
import Tel from "./views/Account/Tel";
import Password from "./views/Account/Password";
import FindAccount from "./views/Auth/FindAccount";
import {useEffect} from "react";
import SearchResultWholePage from "./views/Search/SearchResultWholePage";
import PartyDetail from "./views/Party/PartyDetail";

function RouteUrl () {
    const navigate = useNavigate()

    // 애플리케이션이 처음 로드될 때 로그인 창으로
    useEffect(() => {
        const isFirstLoad = sessionStorage.getItem('isFirstLoad');
        if (!isFirstLoad) {
            sessionStorage.setItem('isFirstLoad', 'true');
            navigate('/auth/sign-in');
        }
    }, [navigate]);

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
        <Routes>
            <Route/>
            <Route path="/" element={<LayoutWithFooter><SearchBarOnMap /></LayoutWithFooter>} />
            <Route path="/search-results" element={<LayoutWithFooter><SearchResults /></LayoutWithFooter>} />
            <Route path="/search-result-whole-page" element={<SearchResultWholePage />} />



            <Route path='/party'>
                <Route path='party-detail' element={<LayoutWithFooter><PartyDetail/></LayoutWithFooter>}/>
            </Route>
            <Route path='/account'>
                <Route path='user' element={<LayoutWithPadding><MyPage/></LayoutWithPadding>} />
                <Route path='nickname' element={<LayoutWithPadding><Nickname/></LayoutWithPadding>} />
                <Route path='tel' element={<LayoutWithPadding><Tel/></LayoutWithPadding>} />
                <Route path='password' element={<LayoutWithPadding><Password/></LayoutWithPadding>} />
            </Route>
            <Route path='/auth'>
                <Route path='sign-up' element={<LayoutWithPadding><SignUp/></LayoutWithPadding>} />
                <Route path='sign-in' element={<LayoutWithPadding><SignIn/></LayoutWithPadding>} />
                <Route path='sign-up-oauth/:userEmail/:userType' element={<LayoutWithPadding><SignUpOAuth/></LayoutWithPadding>} />
                <Route path='oauth-response/:token/:expirationTime' element={<LayoutWithPadding><OAuth/></LayoutWithPadding>} />
                <Route path='find-account' element={<LayoutWithPadding><FindAccount/></LayoutWithPadding>} />
            </Route>

        </Routes>
    )
}

function App() {
    return (
        <Router>
            <RouteUrl/>
        </Router>
    );
}

export default App;

import './App.css';
import TitleBox from "./components/titleBox";
import InputBox from "./components/inputBox";
import {useEffect, useRef, useState} from "react";
import SignUp from "./views/User/SignUp";
import SignIn from "./views/User/SignIn";
function App() {

  return (
    <div className="App">
        <SignUp/>
    </div>
  );
}

export default App;

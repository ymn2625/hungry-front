import React from "react";
import IconBack from "../../../components/bootstrapIcon/IconBack_BS";
import {useNavigate} from "react-router-dom";

function SearchResultWholePage() {
    const navigate = useNavigate(); // useNavigate로 변경


    const handleTurnBack = () =>{
        navigate(-1); // -1은 이전 페이지로 이동하는 명령입니다.

    }

    return(
        <div>
            <div style={{position:'absolute'}} onClick={handleTurnBack}>
                <IconBack/>
            </div>
            <div>
                여기로넘어와
            </div>
        </div>
    )
}
export default SearchResultWholePage;


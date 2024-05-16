// icon:chevron-left | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconBack(props) {
    return (
        <svg
            fill="black"
            viewBox="0 0 16 16"
            height="2em"
            width="2em"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
            />
        </svg>
    );
}

export default IconBack;

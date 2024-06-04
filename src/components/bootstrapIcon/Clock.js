// icon:chevron-left | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function Clock(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.w} height={props.h} fill="currentColor" className="bi bi-clock-fill"
             viewBox="0 0 16 16">
            <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
        </svg>
    );
}

export default Clock;

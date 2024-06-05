import React from "react";
import party_store from "../../../stores/party_store";

function PartyDetail() {

    const {customPartyDetail} = party_store();

return(
    <>
        <div>
            헤헤
            {customPartyDetail.partyName}
        </div>
    </>


    );
        }
export default PartyDetail;

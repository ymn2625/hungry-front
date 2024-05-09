import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

export default function OAuth() {
    const { token, expirationTime } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token || !expirationTime) return;

        const now = (new Date().getTime()) * 1000;
        const expires = new Date(now + parseInt(expirationTime));

        localStorage('accessToken', token, { expires, path: '/' });
        navigate('/');

    }, [token]);

    return (
        <></>
    );
}
import React, {useEffect, useState} from 'react';
import instance from "../../utils/config/instance";


function CheckUser({children, margin = "my6"}) {
    const [hasUser, setHasUser] = useState(false)

    function getUser() {
        let token = localStorage.getItem('access_token');
        if (token !== null) {
            instance("/api/v1/security", "GET").then(res => {
                if (res?.data[0].name === "ROLE_SUPER_ADMIN" ) {
                    setHasUser(true)
                }
            }).catch(err => {
                setHasUser(false)
            })
        } else {
            setHasUser(false);
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (<div className={'d-inline-block'}>
            {hasUser ? <>{children}</> : <></>}
        </div>
    );
}

export default CheckUser

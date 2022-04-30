import React, {createContext, useState, useMemo, useEffect} from 'react';
import axios from "axios";

// Create a new user context and define
// what it will contain.
export const AuthenticationContext = createContext({
    userInfo: {},
    setUserInfo: () => {
    }
});

export function AuthenticationProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const value = useMemo(() => ({userInfo, setUserInfo}), [userInfo]);
    const {children} = props;
    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.post(
                    `/ws/account/userData`
                    , {});

                setUserInfo(data.account || {});
            } catch (e) {
            }
        }
        fetchData();
    }, []);

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
}


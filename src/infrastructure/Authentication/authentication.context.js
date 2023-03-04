import React, { createContext, useState } from 'react';

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    return (
        <AuthenticationContext.Provider
        value={{
            user,
            setUser,
            uid,
            setUid
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider;
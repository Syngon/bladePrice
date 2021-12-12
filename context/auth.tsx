import { createContext, FC, useContext, useEffect, useState } from "react";
import { User, getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, EmailAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebase";
import { FirebaseError } from "firebase/app";

interface IAuth {
    user: User | null,
    login: () => void,
    logout: () => void
};

interface ICredential {
    email: string,
    password: string
}

const auth = getAuth(app);

const AuthContext = createContext<IAuth>({
    user: null, login: () => { }, logout: () => { }
});

const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })

        return unsubscribe;
    }, [])

    const login = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            console.error(error)
        }
    }


    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
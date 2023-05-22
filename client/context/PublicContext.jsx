import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!admin) {
            axios.get('/api/admin').then(({ data }) => {
                setAdmin(data);
                setReady(true);
            });
        }
    }, [])
    return (
        <AdminContext.Provider value={{ admin, setAdmin, ready }}>
            {children}
        </AdminContext.Provider>
    );
}
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/api/user').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
        setReady(true);
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
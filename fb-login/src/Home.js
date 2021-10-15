import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from './firebase'
import { Button } from 'react-bootstrap'

export default function Home() {
    const { user } = useAuthState()

    return (
        <div className="container">
            <h3>Welcome {user?.email} </h3>
            <br></br>
            <Button onClick={() => signOut(getAuth())}>Sign out</Button>
            <small><p>Developed by Tarek ElShennawy</p></small>
        </div>
    )
}
import React from 'react'
import { useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Button, Form } from 'react-bootstrap'

export default function Signup() {
    const handleSubmit = useCallback(async e => {
        e.preventDefault()

        const { email, password } = e.target.elements
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email.value, password.value)
    }, [])


    return (
        <div className="container">
            <h3>Register</h3>
            <hr></hr>
            <Form onSubmit={handleSubmit}>
                <div className="form-group">
                <Form.Label>Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" /> 
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" /> 
                </div>
                <div className="form-group">
                <br></br>
                <Button type="submit" className="btn-md btn-primary">Login</Button>
                <br></br>
                <small><p>Developed by Tarek ElShennawy</p></small>
                </div>
            </Form>
        </div>
    )
}
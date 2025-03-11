import React from 'react'
import Nav from '../Navbar/nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';


export default function Contact() {
    return (
        <div>
            <Nav />
            <div className="container mt-5">
                <h1 className="mb-4">Contact us</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Your Phone</Form.Label>
                        <Form.Control type="text" placeholder="Your Phone" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNation">
                        <Form.Label>Choose your favourite nation</Form.Label>
                        <Form.Control as="select">
                            <option>Choose your favourite nation</option>
                            <option>USA</option>
                            <option>Canada</option>
                            <option>France</option>
                            <option>Japan</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>Your content</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><FaPen /></InputGroup.Text>
                            <Form.Control as="textarea" placeholder="Your content" />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        SUBMIT
                    </Button>
                </Form>
            </div>
        </div>
    )
}

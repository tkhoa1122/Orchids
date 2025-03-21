import React from 'react';
import Nav from '../Navbar/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Định nghĩa schema validation với Yup
const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Tên quá ngắn!')
        .max(50, 'Tên quá dài!')
        .required('Vui lòng nhập tên'),
    phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập số điện thoại'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email'),
    nation: Yup.string()
        .notOneOf(['Choose your favourite nation'], 'Vui lòng chọn quốc gia')
        .required('Vui lòng chọn quốc gia'),
    content: Yup.string()
        .min(10, 'Nội dung quá ngắn!')
        .required('Vui lòng nhập nội dung')
});

export default function Contact() {
    return (
        <div>
            <Nav />
            <div className="container mt-5">
                <h1 className="mb-4">Contact us</h1>

                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        email: '',
                        nation: 'Choose your nation',
                        content: ''
                    }}
                    validationSchema={ContactSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        // Xử lý submit form
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            resetForm();
                        }, 500);
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Your Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your Phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isValid={touched.phone && !errors.phone}
                                    isInvalid={touched.phone && !!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formNation">
                                <Form.Label>Choose your favourite nation</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="nation"
                                    value={values.nation}
                                    onChange={handleChange}
                                    isValid={touched.nation && !errors.nation}
                                    isInvalid={touched.nation && !!errors.nation}
                                >
                                    <option>Choose your favourite nation</option>
                                    <option>USA</option>
                                    <option>Canada</option>
                                    <option>France</option>
                                    <option>Japan</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.nation}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Your content</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaPen /></InputGroup.Text>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Your content"
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        isValid={touched.content && !errors.content}
                                        isInvalid={touched.content && !!errors.content}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.content}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
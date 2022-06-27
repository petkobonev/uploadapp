import { Form, Formik } from 'formik';
import React from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from '../upload/MultipleFileUploadField';
import {Button, Card, CardBody, Row} from "reactstrap";

export default function Upload() {
    return (
        <Card>
            <CardBody>
                <Formik
                    initialValues={{ files: [] }}
                    validationSchema={object({
                        files: array(
                            object({
                                url: string().required(),
                            })
                        ),
                    })}
                    onSubmit={(values) => {
                        console.log('values', values);
                    }}
                >
                    {({ values, errors, isValid, isSubmitting }) => (
                        <Form>
                            <Row container spacing={2} direction="column">
                                <MultipleFileUploadField name="files" />
                            </Row>

                        </Form>
                    )}
                </Formik>
            </CardBody>
        </Card>
    );
}

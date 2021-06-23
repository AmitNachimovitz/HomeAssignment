import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Form, Col, Row, Button } from 'react-bootstrap'

export default function SearchBar() {
    const history = useHistory()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (value) => {
        history.push(`?food=${value.searchQuery.trim().replace(' ', '_')}`)
    }

    return (
        <div>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} controlId="formPlaintextFoodPair">
                    <Form.Label column sm="2">
                        Food Pairing
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control
                            name="searchQuery"
                            defaultValue={''}
                            className={`form-control ${
                                errors.searchQuery ? 'is-invalid' : ''
                            }`}
                            {...register('searchQuery', {
                                required: {
                                    value: true,
                                    message: 'Please provide a food pairing',
                                },
                                pattern: {
                                    value: /^[a-z '-]+$/,
                                    message:
                                        'The search should contain only letters',
                                },
                            })}
                        />
                        <ErrorMessage
                            className="invalid-feedback"
                            name="searchQuery"
                            as="div"
                            errors={errors}
                        />
                    </Col>
                    <Col sm="2">
                        <Button type="submit">Search</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

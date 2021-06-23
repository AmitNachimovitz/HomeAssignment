import { Modal, Button } from 'react-bootstrap'
import { modalRemoved } from './beerModalSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function BeerModal() {
    const dispatch = useDispatch()
    const showModal = useSelector((state) => state.modal.show)
    const beer = useSelector((state) => state.modal.data)

    const onModalClose = () => {
        dispatch(modalRemoved())
    }

    return (
        <>
            {beer && (
                <Modal
                    animation={false}
                    show={showModal}
                    onHide={onModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {beer.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Description:</h6>
                        {beer.description}
                        <h6>First Brewed:</h6>
                        {beer.first_brewed}
                        <h6>Brewers Tips:</h6>
                        {beer.brewers_tips}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

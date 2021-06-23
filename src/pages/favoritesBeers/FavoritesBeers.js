import { Container, Row, Col, CardDeck, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
    selectAllFavorites,
    removedAllBeers,
} from '../../components/beers/favoritesBeersSlice'
import BeerCard from '../../components/beers/BeerCard'
import BeerModal from '../../components/beers/BeerModal'
import noBottle from '../../assets/images/noBottle.png'
import './favoritesBeers.css'

export default function FavoritesBeers() {
    const dispatch = useDispatch()
    const favoritesBeers = useSelector(selectAllFavorites)
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    const handleRemoveAll = () => {
        dispatch(removedAllBeers())
        setShowModal(false)
    }

    const renderedBeers = favoritesBeers.map((beer) => (
        <Col align="center" key={beer.id}>
            <BeerCard
                key={beer.id}
                isFavCard={true}
                id={beer.id}
                name={beer.name}
                imgUrl={beer.image_url ? beer.image_url : noBottle}
            />
        </Col>
    ))
    return (
        <Container fluid>
            <Row>
                <Col xs={6}>
                    <h1>Favorites Beers</h1>
                </Col>
            </Row>
            <Row id="buttonRow">
                <Col xs={2}>
                    <Button onClick={handleShow} disabled={favoritesBeers == 0}>
                        Remove All
                    </Button>
                </Col>
            </Row>
            <CardDeck>{renderedBeers}</CardDeck>
            <Modal
                animation={false}
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove All Beers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete all the beers from your
                    favorites?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleRemoveAll}>Remove All</Button>
                </Modal.Footer>
            </Modal>
            <BeerModal />
        </Container>
    )
}

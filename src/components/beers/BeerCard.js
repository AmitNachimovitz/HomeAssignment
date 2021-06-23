import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Image, Col, Row, Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { isFavoriteById, beerAdded, beerRemoved } from './favoritesBeersSlice'
import { modalShowed } from './beerModalSlice'
import './beers.css'
import addToFavImg from '../../assets/images/addtofav.png'
import removeFromFavImg from '../../assets/images/removefromfav.png'

export default function BeerCard(props) {
    const dispatch = useDispatch()
    const { isFavCard, id, name, imgUrl } = props
    const beer = useSelector((state) =>
        state.beers.data.find((beer) => beer.id === id)
    )
    const isInFavorites = useSelector((state) => isFavoriteById(state, id))
    const [isFavorite, setIsFavorite] = useState(isInFavorites)
    const [rank, setRank] = useState(1)

    const onCardClick = () => {
        dispatch(modalShowed(beer))
    }

    const onAddToFavoritesClicked = () => {
        dispatch(beerAdded(beer))
        setIsFavorite(!isFavorite)
    }

    const onRemoveFromFavoritesClicked = () => {
        dispatch(beerRemoved(id))
        setIsFavorite(!isFavorite)
    }

    let dropItems = []
    if (isFavCard) {
        dropItems = [1, 2, 3, 4, 5].map((rank) => (
            <Dropdown.Item onClick={() => setRank(rank)} key={rank}>
                {rank}
            </Dropdown.Item>
        ))
    }
    return (
        <Card style={{ width: '18rem', cursor: 'pointer' }}>
            <Card.Header>
                <Row>
                    {isFavCard && (
                        <Col>
                            <Dropdown>
                                Rank
                                <Dropdown.Toggle id="dropdown">
                                    {rank}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>{dropItems}</Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    )}
                    <Col>
                        <Image
                            key={isFavorite}
                            className="favoriteImg"
                            src={isFavorite ? removeFromFavImg : addToFavImg}
                            onClick={
                                isFavorite
                                    ? onRemoveFromFavoritesClicked
                                    : onAddToFavoritesClicked
                            }
                        />
                    </Col>
                </Row>
            </Card.Header>

            <Card.Img onClick={onCardClick} variant="top" src={imgUrl} />
            <Card.Body as="a" onClick={onCardClick}>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

BeerCard.propTypes = {
    isFavCard: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

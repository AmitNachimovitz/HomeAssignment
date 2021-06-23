import { useDispatch, useSelector } from 'react-redux'
import { Card, Image, Col, Row, Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
    isFavoriteById,
    beerAdded,
    beerRemoved,
    rankChanged,
} from './favoritesBeersSlice'
import { modalShowed } from './beerModalSlice'
import './beers.css'
import addToFavImg from '../../assets/images/addtofav.png'
import removeFromFavImg from '../../assets/images/removefromfav.png'

export default function BeerCard(props) {
    const dispatch = useDispatch()
    const { isFavCard, id, name, imgUrl } = props

    const isInFavorites = useSelector((state) => isFavoriteById(state, id))

    let beer
    if (!isInFavorites) {
        beer = useSelector((state) =>
            state.beers.data.find((beer) => beer.id === id)
        )
    } else {
        beer = useSelector((state) =>
            state.favoritesBeers.find((beer) => beer.id === id)
        )
    }
    const onCardClick = () => {
        dispatch(modalShowed(beer))
    }

    const onAddToFavoritesClicked = () => {
        dispatch(beerAdded(beer))
    }

    const onRemoveFromFavoritesClicked = () => {
        dispatch(beerRemoved(id))
    }

    const setRank = (rank) => {
        dispatch(rankChanged({ id, rank }))
    }

    let dropItems = []
    if (isInFavorites) {
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
                                    {beer.rank}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>{dropItems}</Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    )}
                    <Col>
                        <Image
                            key={isInFavorites}
                            className="favoriteImg"
                            src={isInFavorites ? removeFromFavImg : addToFavImg}
                            onClick={
                                isInFavorites
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

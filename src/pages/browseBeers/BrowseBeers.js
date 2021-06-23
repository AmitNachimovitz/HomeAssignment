import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, CardDeck, Spinner, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'
import PaginationBar from '../../components/pagination/PaginationBar'
import SearchBar from '../../components/searchBar/SearchBar'
import BeerCard from '../../components/beers/BeerCard'
import BeerModal from '../../components/beers/BeerModal'
import {
    selectAllBeers,
    fetchBeers,
    searchBeers,
} from '../../components/beers/beersSlice'
import noBottle from '../../assets/images/noBottle.png'
import failImg from '../../assets/images/fail.png'
import noResultsImg from '../../assets/images/noResultsImg.png'
import './browseBeers.css'

export default function BrowseBeers() {
    const { search } = useLocation()
    const dispatch = useDispatch()
    const beersStatus = useSelector((state) => state.beers.status)
    const error = useSelector((state) => state.beers.error)
    const beers = useSelector(selectAllBeers)
    const searchQuery = queryString.parse(search)

    useEffect(() => {
        if (searchQuery.food === undefined) {
            dispatch(fetchBeers())
        } else {
            dispatch(searchBeers(searchQuery.food))
        }
    }, [searchQuery.food])

    let content

    if (beersStatus === 'loading') {
        content = <Spinner animation="border" />
    } else if (beersStatus === 'succeeded') {
        if (beers) {
            if (beers.length > 0) {
                content = beers.map((beer) => (
                    <Col align="center" key={beer.id}>
                        <BeerCard
                            key={beer.id}
                            isFavCard={false}
                            id={beer.id}
                            name={beer.name}
                            imgUrl={beer.image_url ? beer.image_url : noBottle}
                        />
                    </Col>
                ))
            } else {
                content = (
                    <Row>
                        <Col>
                            <h1>No results...</h1>
                        </Col>
                        <Col>
                            <Image className="resultImg" src={noResultsImg} />
                        </Col>
                    </Row>
                )
            }
        } else {
            content = (
                <Row>
                    <Col>
                        <h1>Something went wrong...</h1>
                    </Col>
                    <Col>
                        <Image className="resultImg" src={failImg} />
                    </Col>
                </Row>
            )
        }
    } else if (beersStatus === 'failed') {
        content = (
            <Row>
                <Col>
                    <h1>Something went wrong...</h1>
                </Col>
                <Col>
                    <Image className="resultImg" src={failImg} />
                </Col>
            </Row>
        )
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={6}>
                    <SearchBar />
                </Col>
            </Row>
            <CardDeck>{content}</CardDeck>
            {beers && (
                <Row id="paginationBarRow">
                    <PaginationBar />
                </Row>
            )}

            <BeerModal />
        </Container>
    )
}

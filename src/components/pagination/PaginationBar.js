import Pagination from 'react-bootstrap/Pagination'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useSelector, useDispatch } from 'react-redux'
import { pageChanged } from './paginationSlice'
import { fetchBeers, searchBeers } from '../beers/beersSlice'

export default function PaginationBar() {
    const { search } = useLocation()
    const dispatch = useDispatch()
    const total_beers = useSelector((state) => state.pagination.totalsBeers)
    const beersPerPage = useSelector((state) => state.pagination.beersPerPage)
    const searchQuery = queryString.parse(search)
    let numberOfPages = total_beers / beersPerPage
    if (total_beers % beersPerPage > 0) {
        numberOfPages++
    }

    const handlePageChange = (e) => {
        dispatch(pageChanged(e.target.text))
        if (searchQuery.food === undefined) {
            dispatch(fetchBeers())
        } else {
            dispatch(searchBeers(searchQuery.food))
        }
    }

    let items = []
    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item onClick={handlePageChange} key={number}>
                {number}
            </Pagination.Item>
        )
    }

    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
}

import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { pageChanged } from '../pagination/paginationSlice'
import './NavBar.css'

export default function NavBar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const onChangeRoute = (value) => {
        dispatch(pageChanged(1))
        history.push(value.target.name)
    }

    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link name="/browse_beers" onClick={onChangeRoute}>
                            Browse Beers
                        </Nav.Link>
                        <Navbar.Brand>CodiBeer</Navbar.Brand>
                        <Nav.Link
                            name="/favorites_beers"
                            onClick={onChangeRoute}
                        >
                            Favorites Beers
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

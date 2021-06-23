import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/navbar/NavBar'
import BrowseBeers from './pages/browseBeers/BrowseBeers'
import FavoritesBeers from './pages/favoritesBeers/FavoritesBeers'

function App() {
    return (
        <Router>
            <NavBar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/browse_beers"
                        render={() => (
                            <React.Fragment>
                                <BrowseBeers />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path="/favorites_beers"
                        component={FavoritesBeers}
                    />

                    <Redirect to="/browse_beers" />
                </Switch>
            </div>
        </Router>
    )
}

export default App

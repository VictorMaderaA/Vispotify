import React, {Component} from 'react';
import './App.css';
import {LoggedIn} from "./components/LoggedIn";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./views/Login";
import {App as Application} from "./views/App";
import {SpotifyLoginCallback} from "./components/SpotifyLoginCallback";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login/>} />
                </Route>
                <Route path="/callback">
                    <Route index element={<SpotifyLoginCallback/>} />
                </Route>

                <Route path="/app" element={<LoggedIn/>}>
                    <Route index element={<Application/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
  }
}

export default App;

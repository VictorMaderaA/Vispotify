import React from 'react';
import {Link, Outlet} from "react-router-dom";

export function LoggedIn() {
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="about">About</Link>
            </nav>
            <Outlet/>
        </div>
    );
}


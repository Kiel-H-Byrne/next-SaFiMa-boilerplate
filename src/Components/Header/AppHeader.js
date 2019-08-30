import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

//Auth
import { doLogOut } from "./../../DB/auth";
import * as ACTIONS from "./../../Actions/actionConstants";

//Router
import * as ROUTE from "../routes";
import { push } from "react-router-redux";

export default class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
              <a href='/'>
                <img src="img/WaldoFace.png" className="App-logo" alt="Waldo" height="100%" />
              </a>
              <a
                className="App-link"
                href="https://www.perkinswill.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perkins+Will
              </a>
            </header>
        )
    }
}

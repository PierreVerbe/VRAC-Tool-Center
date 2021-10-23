import React from "react"
import logo from "./../../resources/image/logo_VRAC.png"

import "./Home.css"

const Home = () => {
    return (
        <div>
            <img id="logoVracHome" alt="Vrac Logo" src={logo}/>
            <div id="textHome">
                <h1>Vieux Roboticiens Amis de Cachan</h1>
                <h2>Participations :</h2>
                <p>Édition 2018 Coupe de France de robotique (CRAC) : 4 ème</p>
                <p>Édition 2019</p>
                <ul>
                    <li>Coupe de France de robotique : 34 ème</li>
                    <li>Coupe de D'île de france : ? ème</li>
                </ul>
                <p>Édition 2020 Coupe de France de robotique : 9 ème</p>
                <p>Édition 2021</p>
                <ul>
                    <li>Coupe de France de robotique : 9 ème</li>
                    <li>Coupe de D'île de france : 2 ème</li>
                </ul>
            </div>
        </div>
    )
}

export default Home

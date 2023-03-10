import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from "react";
import "./UserNewPark.css"




export const NewParkForm = () => {

    const [userData, update] = useState({
        name: "",
        location: "",
        description: "",
        basketballCourt: false,
        tennisCourt: false,
        volleyballCourt: false,
        frisbee: false,
        playground: false,
        soccerField: false,
        parkingLot: false,
        imageUrl: ''

    })

    const navigate = useNavigate()
    const localParkUser = localStorage.getItem("parklife_user")
    const parkUserObject = JSON.parse(localParkUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newPark = { ...userData };
        const userId = parkUserObject.id
        newPark.userId = userId


        return fetch(`http://localhost:8088/parks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPark)
        })
            .then(res => res.json())
            .then((data) => {
                navigate('/user-parks')
            })
    }


    const knope = require('knope')


    let compliment = knope.getCompliment(parkUserObject.name, 2)


    return (
        <div className="pageWrapper">
        <form className="productForm">
            <h2 className="productForm__title">{compliment} <br></br> <br></br> Add a park here...if you're cool.</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        type="text"
                        id="parkName"
                        className="form-control"
                        placeholder="Name of park"
                        value={userData.name}
                        onChange={
                            (event) => {
                                const copy = { ...userData }
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        required type="text"
                        id="parkAddress"
                        className="form-control"
                        placeholder="Park address"
                        value={userData.location}
                        onChange={
                            (event) => {
                                const copy = { ...userData }
                                copy.location = event.target.value
                                update(copy)
                            }
                        }>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        required type="text"
                        id="parkDescription"
                        className="form-control"
                        placeholder="What do you like about this park?"
                        value={userData.description}
                        onChange={
                            (event) => {
                                const copy = { ...userData }
                                copy.description = event.target.value
                                update(copy)
                            }
                        }>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imgUrl">Image URL: </label>
                    <input
                        required
                        type="text"
                        id="imgUrl"
                        className="form-control"
                        placeholder="example.com"
                        value={userData.imageUrl}
                        onChange={(event) => {
                            const copy = { ...userData }
                            copy.imageUrl = event.target.value
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <div className="checkWrapper">


                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Basketball</label>
                        <input
                            id="checkBasketball"
                            type="checkbox"
                            value={userData.basketballCourt}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.basketballCourt = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Tennis</label>
                        <input
                            id="CheckTennis"
                            type="checkbox"
                            label="Tennis"
                            value={userData.tennisCourt}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.tennisCourt = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Volleyball</label>
                        <input
                            id="checkVolleyball"
                            type="checkbox"
                            label="Volleyball"
                            value={userData.volleyballCourt}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.volleyballCourt = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Frisbee</label>
                        <input
                            id="checkFrisbee"
                            type="checkbox"
                            label="Frisbee"
                            value={userData.frisbee}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.frisbee = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Soccer</label>
                        <input
                            id="checkSoccer"
                            type="checkbox"
                            label="Soccer"
                            value={userData.soccerField}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.soccerField = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Playground</label>
                        <input
                            id="checkPlayground"
                            type="checkbox"
                            label="Playground"
                            value={userData.playground}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.playground = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Lights</label>
                        <input
                            id="checkSwings"
                            type="checkbox"
                            label="Volleyball"
                            value={userData.lights}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.lights = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
                <div className="container">
                    <div className="check">
                        <label htmlFor="attributes">Parking Lot</label>
                        <input
                            id="checkParking"
                            type="checkbox"
                            label="Parking Lot"
                            value={userData.parkingLot}
                            onChange={
                                (event) => {
                                    const copy = { ...userData }
                                    copy.parkingLot = event.target.checked
                                    update(copy)
                                }
                            }>

                        </input>
                    </div>
                </div>
            </div>
            <div className="button-centered">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary button-primary">
                Submit Park
            </button>
            </div>
        </form>
        </div>
    )
}

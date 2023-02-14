import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { basketball, parking, playground, soccer, swingset, tennis, volleyball } from "../parks/AllParksList"

export const UserParks = () => {

    const [parks, setParks] = useState([])
    const [filteredParks, setFilteredParks] = useState([])

    const navigate = useNavigate();
    const localParkUser = localStorage.getItem("parklife_user")
    const parkUserObject = JSON.parse(localParkUser)
    
    



    const currentUserId = parkUserObject.id
    const deletePark = (id) => {
        fetch(`http://localhost:8088/parks/${id}`, {
            method: "DELETE"
        })
        .then(navigate(0))
            
    }


    useEffect(
        () => {
            fetch(`http://localhost:8088/parks`)
                .then(res => res.json())
                .then((allparksArray) => {
                    setParks(allparksArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const filter = parks.filter(park => park.userId === currentUserId)
            setFilteredParks(filter)

        }, [parks])

        const knope = require('knope')


        let compliment = knope.getCompliment(parkUserObject.name)

       

    return <>
        <h2>{compliment} Here are your Parks</h2>
        <button onClick={() => navigate("/park-form")}>
            Create New Park
        </button>
        <article className="userParks">
            {
                filteredParks.map(
                    (park) => {
                        return <section key={park.id} className="userCreatedParks">
                            <header>
                                <article>

                                    <h4>
                                        {park.name}
                                    </h4>
                                    <img src={`${park.imageUrl}`} className="park-image" />
                                    <div>
                                        {park.location}
                                    </div>
                                </article>
                                <h5>
                                    Park Amenities:
                                </h5>
                                <article>
                                    <div>
                                        {basketball(park)}
                                        <div>
                                            {tennis(park)}
                                        </div>
                                        <div>
                                            {volleyball(park)}
                                        </div>
                                        <div>
                                            {playground(park)}
                                        </div>
                                        <div>
                                            {soccer(park)}
                                        </div>
                                        <div>
                                            {swingset(park)}
                                        </div>
                                        <div>
                                            {parking(park)}
                                        </div>

                                        <br>
                                        </br>
                                    </div>
                                </article>
                            </header>
                            <button className="delete-button" onClick={() => deletePark(park.id)}>Delete Park</button>
                        </section>
                    }
                )
            }


        </article>


    </>
}
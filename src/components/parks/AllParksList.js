import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const basketball = (park) => {
    if (park.basketballCourt === true) {
        return "Basketball Hoops"
    }
}
export const tennis = (park) => {
    if (park.tennisCourt === true) {
        return "Tennis Courts"
    }
}
export const volleyball = (park) => {
    if (park.volleyballCourt === true)
        return "Volleyball Courts"
}
export const playground = (park) => {
    if (park.playground === true)
        return "Playground"
}
export const soccer = (park) => {
    if (park.soccerField === true)
        return "Soccer Field"
}
export const swingset = (park) => {
    if (park.swingSet === true)
        return "Swing-sets"
}
export const parking = (park) => {
    if (park.parkingLot === true)
        return "Parking Lot"
}

export const AllParksList = () => {
    const [allparks, setAllParks] = useState([])
    const navigate = useNavigate();


    useEffect(
        () => {
            fetch(`http://localhost:8088/parks`)
                .then(res => res.json())
                .then((allparksArray) => {
                    setAllParks(allparksArray)
                })
        },
        []
    )
    return <>
        <h2>AllParks</h2>

        <button id="new-park" onClick={() => {
            if (localStorage.getItem("parklife_user")) {
                navigate("/park-form")
            } else {
                navigate("/login")
            }

        }}>
            Create New Park
        </button>
        <article className="allparks">
            {
                allparks.map(
                    (park) => {
                        console.log(park)
                        return <section key={park.id} className="parks">
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
                                    {basketball(park)}
                                    <article>
                                        {tennis(park)}
                                    </article>
                                    <article>
                                        {volleyball(park)}
                                    </article>
                                    <article>
                                        {playground(park)}
                                    </article>
                                    <article>
                                        {soccer(park)}
                                    </article>
                                    <article>
                                        {swingset(park)}
                                    </article>
                                    <article>
                                        {parking(park)}
                                    </article>

                                    <br>
                                    </br>
                                </article>
                            </header>
                        </section>
                    }
                )
            }
        </article>
    </>

}
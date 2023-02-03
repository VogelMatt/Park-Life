import { useEffect, useState } from "react";


export const basketball = (park) => {
    if(park.basketballCourt === true) {
        return "Basketball Hoops"
    }
}
export const tennis = (park) => {
    if(park.tennisCourt === true) {
        return "Tennis Courts"
    }
}
export const Volleyball = (park) => {
    if(park.volleyBallCourt === true)
    return "Volleyball Courts"
}
export const playground = (park) => {
    if(park.playground === true)
    return "Playground"
}
export const soccer = (park) => {
    if(park.soccerField === true)
    return "Soccer Field"
}
export const swingset = (park) => {
    if(park.swingSet === true)
    return "Swing-sets"
}
export const parking = (park) => {
    if(park.parkingLot === true)
    return "Parking Lot"
}

export const AllParksList = () => {
    const [allparks, setAllParks] = useState([])



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
        <article className="allparks">
            {
                allparks.map(
                    (park) => {
                        return <section key={park.id} className="parks">
                            <header>
                                <article>
                                    <h4>
                                       {park.name}  
                                    </h4>
                                    {park.location}
                                    
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
                                    {Volleyball(park)}
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
import { useEffect, useState } from "react"
import { basketball, parking, playground, soccer, swingset, tennis, Volleyball } from "../parks/AllParksList"

export const UserParks = () => {
        
        const [parks, setParks] = useState([])
        const [filteredParks, setFilteredParks] = useState([])
        const currentUser = 5
        // this will be the parklife user once login is not scuffed


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
            ()=>{
              const filter = parks.filter(park => park.createdUserId === currentUser)
              setFilteredParks(filter)  
                
            },[parks])
        
        
        
        return <>
            <h2>My Parks</h2>
            <article className="userParks">
                {
                    filteredParks.map(
                        (park) => {
                            return <section key={park.id} className="userCreatedParks">
                                 <header>
                                    <article>

                                        <div>
                                            <h4>
                                            {park.name}  
                                            </h4>
                                            {park.location}                                    
                                        </div>
                                        <h5>
                                        Park Amenities:
                                        </h5>
                                        <div>
                                            {basketball(park)}
                                        <div>
                                            {tennis(park)}
                                        </div>
                                        <div>
                                            {Volleyball(park)}
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
                        </section>
                        }
                    )
                }


            </article>
        
        
        </>
}
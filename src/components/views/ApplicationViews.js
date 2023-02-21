import { Outlet, Route, Routes } from "react-router-dom"
import { AllParksList } from "../parks/AllParksList"
import { ParkContainer } from "../search/ParkContainer"
import { NewParkForm } from "../users/UserNewPark"
import { UserParks } from "../users/UserParks"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <br></br>
                    {/* <h3>When You Want To Park Your Life</h3> */}

                    <Outlet />
                </>
            }>
                
                <Route path="/" element={<ParkContainer/>} />



                <Route path="user-parks" element={<UserParks/>} />

                <Route path="park-form" element={<NewParkForm/>} />

            </Route>
        </Routes>
    )
}


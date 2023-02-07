import { Outlet, Route, Routes } from "react-router-dom"
import { AllParksList } from "../parks/AllParksList"
import { NewParkForm } from "../users/UserNewPark"
import { UserParks } from "../users/UserParks"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Park Life</h1>
                    <div>For When You Want To Park Your Life</div>

                    <Outlet />
                </>
            }>
                
                <Route path="/" element={<AllParksList />} />



                <Route path="user-parks" element={<UserParks/>} />

                <Route path="park-form" element={<NewParkForm/>} />

            </Route>
        </Routes>
    )
}


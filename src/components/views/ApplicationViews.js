import { Outlet, Route, Routes } from "react-router-dom"
import { AllParksList } from "../parks/AllParksList"
import { UserPage } from "../users/UserPage"


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



                <Route path="UserPage" element={<UserPage />} />
            </Route>
        </Routes>
    )
}


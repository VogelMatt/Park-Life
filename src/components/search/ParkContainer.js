import { useState } from "react"
import { AllParksList } from "../parks/AllParksList"
import { ParkSearch } from "./ParkSearch"

export const ParkContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ParkSearch setterFunction={setSearchTerms}/>
        <AllParksList searchTermState={searchTerms}/>
    </>
}
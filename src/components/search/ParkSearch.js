export const ParkSearch = ({ setterFunction }) => {
    return (
        <input 
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" className="searchBarPosition change" placeholder="Enter Search"/>
        )
}
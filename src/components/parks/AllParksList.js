import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import LightIcon from '@mui/icons-material/Light';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';





<i className="fa-solid fa-basketball"></i>

export const basketball = (park) => {
    if (park.basketballCourt === true) {
        return <i className="fa-solid fa-basketball"> basketball</i>
    }
}
export const tennis = (park) => {
    if (park.tennisCourt === true) {
        return <i className="fa-solid">
            <span className="material-symbols-outlined">
                sports_tennis
            </span>
            Tennis
        </i>
    }
}
export const volleyball = (park) => {
    if (park.volleyballCourt === true)
        return <i className="fa-solid fa-volleyball"> volleyball</i>
}
export const frisbee = (park) => {
    if (park.frisbee === true)
        return <i className="fa-solid">
            <span className="material-symbols-outlined">
                album
            </span>
            Frisbee
        </i>
}
export const playground = (park) => {
    if (park.playground === true)
        return <i className="fa-solid fa-people-roof"> playground</i>
}
export const soccer = (park) => {
    if (park.soccerField === true)
        return <i className="fa-solid fa-futbol"> soccer</i>
}
export const lights = (park) => {
    if (park.lights === true)
        return <i className="fa-solid">
            <span className="material-symbols-outlined">
                light
            </span>
            Lights
        </i>
}
export const parking = (park) => {
    if (park.parkingLot === true)
        return <i className="fa-solid fa-square-parking"> parking</i>
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export const AllParksList = ({ searchTermState }) => {
    const [allparks, setAllParks] = useState([])
    const navigate = useNavigate();
    const [filteredParks, setFilteredParks] = useState([])

    const [expanded, setExpanded] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const handleExpandClick = (id) => {
        setExpanded(!expanded)

        if (selectedId === id) {
            setSelectedId(-1);
        } else {
            setSelectedId(id)

        }
    };

    const localParkUser = localStorage.getItem("parklife_user")
    const loggedInUser = JSON.parse(localParkUser)

    const fetchAllParks = () => {
        fetch(`http://localhost:8088/parks?_embed=parkInterests&_expand=user`)
            .then(res => res.json())
            .then((allparksArray) => {
                setAllParks(allparksArray)
                setFilteredParks(allparksArray)
            })
    }
    useEffect(
        () => {
            fetchAllParks()
        },
        []
    )

    useEffect(
        () => {
            // if(searchTermState.length > 0) {                
            const searchedParks = allparks.filter(park => park.name.toLowerCase().startsWith(searchTermState))
            setFilteredParks(searchedParks)
            // } else {
            //     setFilteredParks(allparks)                
            // }
        },
        [searchTermState]
    )




    const likeParkClick = (parkId, userId) => {
        // event.preventDefault()

        const newParkInterestObject = {
            parkId: parkId,
            userId: userId
        }


        return fetch(`http://localhost:8088/parkInterests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParkInterestObject)
        })
            .then(fetchAllParks())

    }

    const deleteParkClick = (id) => {


        return fetch(`http://localhost:8088/parkInterests/${id}`, {
            method: "DELETE",
        })
            .then(fetchAllParks())
    }








    return <>

        <div className="pageWrapper">
            <div className="button-centered" style={{marginBottom: '2rem' }}>

                <button className="button-primary" id="new-park" onClick={() => {
                    if (localStorage.getItem("parklife_user")) {
                        navigate("/park-form")
                    } else {
                        navigate("/login")
                    }

                }}>
                    Create New Park
                </button>
            </div>
            <article className="allparks">
                {
                    filteredParks.map(
                        (park) => {
                            return <section key={park.id} className="parks">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        title={park.name}
                                        subheader={park.location}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={park.imageUrl}
                                        alt="Park Image"
                                    />
                                    <CardContent className="cardContent">
                                        <Typography variant="body2" color="text.secondary">
                                            {park.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {
                                            loggedInUser && park.parkInterests.some(pi => pi.userId === loggedInUser.id) ?
                                                <IconButton onClick={() => {
                                                    let parkInterestObjToDelete = park.parkInterests.find(pi => pi.userId === loggedInUser.id)
                                                    deleteParkClick(parkInterestObjToDelete.id)

                                                }}>

                                                    <FavoriteIcon style={{ color: "green" }} />
                                                </IconButton>

                                                :
                                                ""
                                        }
                                        {
                                            loggedInUser && !park.parkInterests.some(pi => pi.userId === loggedInUser.id) ?
                                                <IconButton onClick={() => {
                                                    likeParkClick(park.id, loggedInUser.id)
                                                }}>
                                                    <FavoriteIcon />
                                                </IconButton>
                                                :
                                                ""
                                        }
                                        {
                                            !loggedInUser ?
                                                <IconButton>
                                                    <FavoriteBorderOutlinedIcon style={{ color: "green" }} />
                                                </IconButton>
                                                :
                                                ""
                                        }
                                        {park.parkInterests.length}
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={() => {
                                                handleExpandClick(park.id)
                                            }}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={park.id === selectedId ? true : false} timeout="auto" unmountOnExit>
                                        <CardContent >
                                            <div className="expandedInfo">
                                                <article>
                                                    {basketball(park)}
                                                </article>
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
                                                    {frisbee(park)}
                                                </article>
                                                <article>
                                                    {soccer(park)}
                                                </article>
                                                <article>
                                                    {lights(park)}
                                                </article>
                                                <article>
                                                    {parking(park)}
                                                </article>
                                            </div>
                                        </CardContent>
                                    </Collapse>
                                </Card>



                            </section>
                        }
                    )
                }
            </article>
        </div>
    </>

}
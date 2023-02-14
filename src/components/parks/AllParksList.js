import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';





<i class="fa-solid fa-basketball"></i>

export const basketball = (park) => {
    if (park.basketballCourt === true) {
        return <i class="fa-solid fa-basketball"></i>
    }
}
export const tennis = (park) => {
    if (park.tennisCourt === true) {
        return <span class="material-symbols-outlined">
            sports_tennis
        </span>
    }
}
export const volleyball = (park) => {
    if (park.volleyballCourt === true)
        return <i class="fa-solid fa-volleyball"></i>
}
export const playground = (park) => {
    if (park.playground === true)
        return <i class="fa-solid fa-people-roof"></i>
}
export const soccer = (park) => {
    if (park.soccerField === true)
        return <i class="fa-solid fa-futbol"></i>
}
export const swingset = (park) => {
    if (park.swingSet === true)
        return "Swing-sets"
}
export const parking = (park) => {
    if (park.parkingLot === true)
        return <i class="fa-solid fa-square-parking"></i>
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


export const AllParksList = () => {
    const [allparks, setAllParks] = useState([])
    const navigate = useNavigate();


    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const localParkUser = localStorage.getItem("parklife_user")
    const loggedInUser = JSON.parse(localParkUser)

    const fetchAllParks = () => {
        fetch(`http://localhost:8088/parks?_embed=parkInterests&_expand=user`)
            .then(res => res.json())
            .then((allparksArray) => {
                setAllParks(allparksArray)
            })
    }


    useEffect(
        () => {
            fetchAllParks()
        },
        []
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
        <h2>Parks</h2>

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
                        return <section key={park.id} className="parks">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    // avatar={
                                    //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    //         {park.user.name}
                                    //     </Avatar>
                                    // }
                                    // action={
                                    //     <IconButton aria-label="settings">
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title={park.name}
                                    subheader={park.location}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={park.imageUrl}
                                    alt="Park Image"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {park.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {
                                        loggedInUser && park.parkInterests.some(pi => pi.userId === loggedInUser.id) ?
                                            <IconButton onClick={() => {
                                                let parkInterestObjToDelete = park.parkInterests.find(pi => pi.userId === loggedInUser.id)
                                                setInterval(deleteParkClick(parkInterestObjToDelete.id), 500 ) 

                                            }}>

                                                <FavoriteIcon style={{ color: "green" }} />
                                            </IconButton>

                                            :
                                            ""
                                    }
                                    {
                                            loggedInUser && !park.parkInterests.some(pi => pi.userId === loggedInUser.id) ?
                                                <IconButton onClick={() => { 
                                                    setInterval(likeParkClick(park.id, loggedInUser.id), 500 ) 
                                                    }}>
                                                    <FavoriteIcon/>
                                                    </IconButton>
                                                :
                                                ""
                                    }
                                    {
                                            !loggedInUser ?
                                                <IconButton>
                                                    <FavoriteBorderOutlinedIcon style={{ color: "green" }}/>
                                                    </IconButton>
                                                :
                                                ""
                                    }
                                    {park.parkInterests.length}
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
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
                                        </article>
                                    </CardContent>
                                </Collapse>
                            </Card>



                        </section>
                    }
                )
            }
        </article>
    </>

}
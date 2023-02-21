import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { basketball, parking, playground, soccer, lights, frisbee, tennis, volleyball } from "../parks/AllParksList"



import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



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




export const UserParks = () => {

    const [parks, setParks] = useState([])
    const [filteredParks, setFilteredParks] = useState([])

    const navigate = useNavigate();
    const localParkUser = localStorage.getItem("parklife_user")
    const parkUserObject = JSON.parse(localParkUser)




    const currentUserId = parkUserObject.id
    const deletePark = (id) => {
        fetch(`http://localhost:8088/parks/${id}`, {
            method: "DELETE"
        })
            .then(navigate(0))

    }
    const [expanded, setExpanded] = React.useState(false);
    const [selectedId, setSelectedId] = useState(-1);

    const handleExpandClick = (id) => {
        setExpanded(!expanded)

        if (selectedId === id) {
            setSelectedId(-1);
        } else {
            setSelectedId(id)

        }
    };


    useEffect(
        () => {
            fetch(`http://localhost:8088/parks?_embed=parkInterests&_expand=user`)
                .then(res => res.json())
                .then((allparksArray) => {
                    setParks(allparksArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const filter = parks.filter(park => park.userId === currentUserId)
            setFilteredParks(filter)

        }, [parks])

    const knope = require('knope')


    let compliment = knope.getCompliment(parkUserObject.name, 2)



    return <>
        <div className="pageWrapper">
            <div className="button-centered" style={{marginBottom: '2rem' }}>
                <button className="button-primary" onClick={() => navigate("/park-form")}>
                    Create New Park
                </button>
            </div>
            <article className="userParks">
                {
                    filteredParks.map(
                        (park) => {
                            return <section key={park.id} className="userCreatedParks">
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
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {park.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton>
                                            <FavoriteBorderOutlinedIcon style={{ color: "green" }} />
                                        </IconButton>
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
                                        <CardContent>

                                            <div>
                                                <div>
                                                    {basketball(park)}
                                                </div>
                                                <div>
                                                    {tennis(park)}
                                                </div>
                                                <div>
                                                    {volleyball(park)}
                                                </div>
                                                <div>
                                                    {playground(park)}
                                                </div>
                                                <article>
                                                    {frisbee(park)}
                                                </article>
                                                <div>
                                                    {soccer(park)}
                                                </div>
                                                <div>
                                                    {lights(park)}
                                                </div>
                                                <div>
                                                    {parking(park)}
                                                </div>
                                            </div>
                                            <div className="button-centered">
                                                <button className="delete-button button-secondary" onClick={() => deletePark(park.id)}>Delete Park</button>
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
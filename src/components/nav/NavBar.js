import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { ParkSearch } from "../search/ParkSearch";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));




export const NavBar = () => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box className="navbar-entire" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />

                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            localStorage.getItem("parklife_user") ?
                            <MenuItem component={Link} to="/" onClick={handleClose}>Parks</MenuItem>                            
                            :
                            ""
                        }
                                           
                                               
                        {
                            localStorage.getItem("parklife_user") ?
                            <MenuItem component={Link} to="/user-parks" onClick={handleClose}>My Parks</MenuItem>                            
                            :
                            ""
                        }
                        {
                            localStorage.getItem("parklife_user") ?
                            <MenuItem component={Link} to="/park-form" onClick={handleClose}>Add New Park</MenuItem>                            
                            :
                            ""
                        }   
                                        
                            
                        {
                            localStorage.getItem("parklife_user") ?
                                <MenuItem component={Link} to="/" onClick={() => {
                                        handleClose()
                                        localStorage.removeItem("parklife_user")
                                        navigate("/", { replace: true })
                                    }}>Logout
                                </MenuItem>
                                :
                                <MenuItem component={Link} to="/login" onClick={handleClose}>Login
                                </MenuItem>
                        }
                    </Menu>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <article className="parkLogoFont">
                            Park Life
                        </article>
                    </Typography>

                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}







// return (
//     <ul className="navbar">
//         <li className="navbar__item active">
//             <Link className="navbar__link" to="/">Parks</Link>
//         </li>
//         {
//             localStorage.getItem("parklife_user") ?
//                 <li className="navbar__item active">
//                     <Link className="navbar__link" to="/user-parks">My Parks</Link>
//                 </li>
//                 :
//                 ""
//         }

//         {
//             localStorage.getItem("parklife_user") ?
//                 <li className="navbar__item active">
//                     <Link className="navbar__link" to="/park-form">Add New Park</Link>
//                 </li>
//                 :
//                 ""
//         }





// {
//     localStorage.getItem("parklife_user") ?
//         <li className="navbar__item navbar__logout">
//             <Link className="navbar__link" to="" onClick={() => {
//                 localStorage.removeItem("parklife_user")
//                 navigate("/", { replace: true })
//             }}>Logout</Link>
//         </li>
//         :
//         <li className="navbar__item active">
//             <Link className="navbar__link" to="/login">Login</Link>
//         </li>
// }
//         </ul>
//     )
// }


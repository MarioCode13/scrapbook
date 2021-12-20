import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to='/'
                    className={classes.heading}
                    variant='h2'
                    align='center'
                >
                    Scrapbook
                </Typography>
                <img
                    className={classes.image}
                    src={memories}
                    alt='memories'
                    height='70'
                />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {' '}
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user.result.name}
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.logout}
                            color='secondary'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        color='primary'
                    >
                        Log in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

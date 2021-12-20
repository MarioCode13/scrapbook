import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
    TextField
} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { AUTH } from '../../constants/actionTypes'
import useStyles from './styles.js'
import Input from './Input.js'
import Icon from './icon'

import { signin, signup } from '../../actions/auth'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setForm(initialState)
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: AUTH, data: { result, token } })

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleError = () =>
        alert('Google Sign In was unsuccessful. Try again later')

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}

                        <Input
                            name='email'
                            label='Email Address'
                            handleChange={handleChange}
                            type='email'
                        />
                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name='confirmPassword'
                                label='Repeat Password'
                                handleChange={handleChange}
                                type='password'
                            />
                        )}
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='318432576739-tfp1v8691jal0489amhki38p84j39s83.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy='single_host_origin'
                    />

                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? 'Already have an account? Sign in'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

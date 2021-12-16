import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getPosts } from './actions/posts'
import memories from './images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './styles'

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Container maxWidth='lg'>
            <AppBar
                className={classes.appBar}
                position='static'
                color='inherit'
            >
                <Typography
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
            </AppBar>
            <Grow in>
                <Container>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='stretch'
                        spacing={3}
                        className={classes.mainContainer}
                    >
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App

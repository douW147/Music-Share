import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Audiotrack, HeadsetTwoTone } from "@material-ui/icons";
import React from "react"

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}));

function Header( ) {
    const clases = useStyles();
    return (
        <AppBar position='fixed' color='primary'>
            <Toolbar>
                <HeadsetTwoTone/>
                <Typography className={clases.title} variant='h6' >
                    Apollo Music Share 
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
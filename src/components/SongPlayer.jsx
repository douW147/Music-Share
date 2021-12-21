import { Card, CardContent, CardMedia, IconButton, Slider, Typography, makeStyles } from "@material-ui/core";
import { PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";
import QueuedSongList from "./QueuedSongList";

const useStyles = makeStyles( theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}));

function SongPlayer() {
    const thumbnail = "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg";
    const classes = useStyles(); 

    return (
    <>
        <Card className={classes.container} variant="outlined">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" variat="h3">
                        title
                    </Typography>
                    <Typography variant="subtitle1" variat="p" color="textSecondary">
                        Artist
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton>
                        <SkipPrevious/>
                    </IconButton>
                    <IconButton>
                        <PlayArrow className={classes.playIcon}/>
                    </IconButton>
                    <IconButton>
                        <SkipNext/>
                    </IconButton>
                    <Typography variant="subtitle1" variat="p" color="textSecondary">
                        00:03:52
                    </Typography>
                </div>
                <Slider
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                />
            </div>
            <CardMedia image={thumbnail} className={classes.thumbnail}/>
        </Card>
        <QueuedSongList/>
    </>
    )
}

export default SongPlayer;
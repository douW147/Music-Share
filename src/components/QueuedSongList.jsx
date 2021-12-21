import { Avatar, IconButton, Typography, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";


const useStyles = makeStyles( theme => ({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflowWrap: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
}));

function QueuedSongList() {

    const song = {
        title: "Lune",
        artist: "Moon",
        thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
    };

    return (
        <div style={{margin: '10px 0'}}>
            <Typography color='textSecondary' variant="button">
                QUEUE (5)
            </Typography>
            {Array.from({ length: 5 }, () => song).map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
}

function QueuedSong(props) {
    const classes = useStyles();
    const {thumbnail, artist, title} = props.song;
    return (
    <div className={classes.container}>
        <Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar}/>
        <div className={classes.songInfoContainer}>
            <Typography className={classes.text} variant="subtitle2">
                {title}
            </Typography>
            <Typography className={classes.text} variant="body2" color="textSecondary">
                {artist}
            </Typography>
        </div>
        <IconButton>
            <Delete color="error"/>
        </IconButton>
    </div>
)}

export default QueuedSongList;
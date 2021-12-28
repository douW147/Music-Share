import { useMutation } from "@apollo/react-hooks";
import { Avatar, IconButton, Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";


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

function QueuedSongList( {queue} ) {
    const isGreaterMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const song = {
        title: "Lune",
        artist: "Moon",
        thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
    };
    return ( isGreaterMd &&
        <div style={{margin: '10px 0'}}>
            <Typography color='textSecondary' variant="button">
                QUEUE ({queue.length})
            </Typography>
            {queue.map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
}

function QueuedSong(props) {
    const classes = useStyles();
    const {thumbnail, artist, title} = props.song;
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE,{
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });
    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...props.song, __typename: "Song" }}
        });
        console.log("eheh");
    }
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
        <IconButton onClick={handleAddOrRemoveFromQueue}>
            <Delete color="error"/>
        </IconButton>
    </div>
)}

export default QueuedSongList;
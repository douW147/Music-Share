import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import { ADD_SONG } from "../graphql/mutations";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const DEFAULT_SONG = {
    duration: 0,
    title: "",
    artist: "",
    thumbnail: ""
};

function AddSong () {
    const clases = useStyles();
    const [isDialog, setIsDialog] = React.useState(false);
    const [url, setUrl] = useState("");
    const [isPlayable, setIsPlayable] = useState(false);
    const [song, setSong] = useState (DEFAULT_SONG);
    const [addSong, { error }] = useMutation(ADD_SONG);

    useEffect(() => {
       const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url)
        setIsPlayable(isPlayable)
    }, [url])

    function handleCloseDialog() {
        setIsDialog(false);
    }

    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer);
        }
        setSong({ ...songData, url });
    }

    async function handleAddSong() {
        try {
            const { url, thumbnail, duration, title, artist } = song;
            // addSong({ variables: { ...song }})
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null
                }
            })
            handleCloseDialog();
            setSong(DEFAULT_SONG);
            setUrl("");
        } catch (error) {
            console.log("error aditing song", error);
        }
    }

    function handleError(field) {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    }

    function handleSongChange(event) {
        const { name, value } = event.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }));
    }

    function getYoutubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        return {duration, title, artist: author, thumbnail}
    }

    function getSoundCloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve ({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    });
                }
            })
        })
    }
    const {thumbnail, title, artist} = song;
    return (
    <div className={clases.container}>
        <Dialog
            className={clases.dialog}
            open={isDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
                <img 
                    src={thumbnail}
                    style={{ width: 500}} 
                    
                    alt="Song thumbnail"
                    // className={clases.thumbnail}
                />
                <TextField
                    onChange={handleSongChange}
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                    value={title}
                    error={handleError('title')}
                    helperText={ handleError('title') && "Fill out field"}
                />
                <TextField
                    onChange={handleSongChange}
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                    value={artist}
                    error={handleError('artist')}
                    helperText={ handleError('artist') && "Fill out field"}
                />
                <TextField
                    onChange={handleSongChange}
                    margin="dense"
                    name="thumbnail"
                    label="Thumbnail"
                    fullWidth
                    value={thumbnail}
                    error={handleError('thumbnail')}
                    helperText={ handleError('thumbnail') && "Fill out field"}
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
            </DialogActions>
        </Dialog>
        <TextField
            className={clases.urlInput}
            onChange={event => setUrl(event.target.value)}
            value={url}
            placeholder="Add Youtube or Soundcloud Url"
            fullWidth
            margin="normal"
            type="url"
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                        <Link/>
                    </InputAdornment>
                )
            }}
        />
        <Button
            disabled={!isPlayable}
            className={clases.addSongButton}
            onClick={() => {
                setIsDialog(true)
            }}
            variant="contained"
            color="primary"
            endIcon={<AddBoxOutlined/>}
        >
            Add
        </Button>
        <ReactPlayer url={url} hidden onReady={handleEditSong}/>
    </div>
    )
}

export default AddSong;
import { TextField, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import React, { useState } from "react";

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

function AddSong () {
    const clases = useStyles();
    const [isDialog, setIsDialog] = React.useState(false);

    function handleCloseDialog() {
        setIsDialog(false);
    }

    return (
    <div className={clases.container}>
        <Dialog
            className={clases.dialog}
            open={isDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
                <img style={{ width: 500}} src="https://i.ytimg.com/vi/8GW6sLrK40k/maxresdefault.jpg"
                    alt="Song thumbnail"
                    className={clases.thumbnail}
                />
                <TextField
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="thumbnail"
                    label="Thumbnail"
                    fullWidth
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                <Button variant="outlined" color="primary">Add Song</Button>
            </DialogActions>
        </Dialog>
        <TextField
            className={clases.urlInput}
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
    </div>
    )
}

export default AddSong;
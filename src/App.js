import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid } from "@material-ui/core";



function App() {
  return (
    <>
      <Header/>
      <Grid container >  { /* spacing={3}*/}
        <Grid style={{
          paddingTop: 80
        }} item xs={12} md={7}>
          <AddSong/>
          <SongList/>
        </Grid>
        <Grid style={{
          position: 'fixed',
          width: '100%',
          right: 0,
          top: 70
        }} item xs={12} md={5}>
          <SongPlayer/>
        </Grid>
      </Grid>
    </>
  )
}

export default App;

import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid , useMediaQuery, Hidden} from "@material-ui/core";



function App() {

  // const matches = useMediaQuery('(min-width: 600px)');
  const isGreaterMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  const isGreaterSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  return (
    <>
      <Hidden only="xs"> 
        <Header/>
      </Hidden>
      <Grid container spacing={3} style={{width: "100%"}} >  { /* spacing={3}*/}
        <Grid style={{
          paddingTop: isGreaterSm ? 80 : 10
        }} item xs={12} md={7}>
          <AddSong/>
          <SongList/>
        </Grid>
        <Grid style={
          isGreaterMd ? {
          position: 'fixed',
          width: '100%',
          right: 0,
          top: 70
        } : {
          position: 'fixed',
          width: '100%',
          left: 0,
          bottom: 0
        }} item xs={12} md={5}>
          <SongPlayer/>
        </Grid>
      </Grid>
    </>
  )
}

export default App;

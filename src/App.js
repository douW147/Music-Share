import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid , useMediaQuery, Hidden} from "@material-ui/core";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {title: "Father Forgive Me (Official Video)",
  id: "6c0b7cfb-1aac-4465-b2fa-453a6744f3b4",
  artist: "Travis Thompson",
  thumbnail: "http://img.youtube.com/vi/fyMmVX6JYbo/0.jpg",
  url: "https://www.youtube.com/watch?v=fyMmVX6JYbo",
  duration: 220,
  created_at: "2021-12-27T18:21:56.749058+00:00"},
  isPlaying: false
});

function App() {
 const initialSongState = React.useContext(SongContext);
 const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  // const matches = useMediaQuery('(min-width: 600px)');
  const isGreaterMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  const isGreaterSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  return (
    <SongContext.Provider value={{ state, dispatch}}>
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
    </SongContext.Provider>
  )
}

export default App;

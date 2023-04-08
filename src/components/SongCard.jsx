import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
    
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }  

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  } 

  // console.log(song.hub.image);
  // console.log(data);
  
  return(
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup 
  rounded-lg cursor-pointer
   ">
    <div className="relative w-full h-56 group">
      <div className={`absolute inset-0 justify-center items-center
      bg-black bg-opacity-50 group-hover:flex
       ${activeSong?.title === song.title ? 
       'flex bg-black bg-opacity-70' : 'hidden' }`}>
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
      </div>
      <img src={song?.images?.coverart || song?.displayImageUri} alt="song_img" />
    </div>
    <div className="flex flex-col mt-4">
      <p className="text-lg font-semibold text-white truncate">
        <Link to={ song?.key ? `/songs/${song?.key}`
          : '/songs'}>
            {song.title || song.trackName}
        </Link>
      </p>
      <p className="mt-1 text-sm text-gray-300 truncate">
        <Link to={ song?.key ? 
        song.artists ? `/artists/${song?.
        artists[0]?.adamid}` : '/top-artists' 
        : '/top-artists' }>
            {song.subtitle || song.artists[0].name}
        </Link>
      </p>
    </div>
  </div>)
};

export default SongCard;

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs} from "../components";
import { setActiveSong,playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/billboard";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const {activeSong, isPlaying} = useSelector((state)=> state.player);
    const {data: songData , isFetching : isFetchingSongDetails } 
        = useGetSongDetailsQuery({songid});
    const {data, isFetching: isFetchingRelatedSongs, error}
        = useGetSongRelatedQuery({songid});
    
    if(isFetchingRelatedSongs || isFetchingSongDetails) // isFetchingSongDetails || 
        return <Loader title="Searching song details" />
    if(error)
        return <Error />;
    
    const handlePauseClick = () => {
        dispatch(playPause(false));
        }  
    
    const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, songData, i}));
    dispatch(playPause(true));
    } 
        
    // console.log(songid);
    // console.log(songData);
    // console.log(data);

    return (
    <div className="flex flex-col">
        <DetailsHeader artistId=""songData={songData} />
        <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">
                Lyrics
            </h2>
            <div className="mt-5">
                {
                songData?.sections[1].type === 'LYRICS' ?
                    songData?.sections[1].text.map((line, i) => (
                    <p className="text-base text-gray-400">{line}</p>
                )) : <p className="text-base text-gray-400">
                    Sorry, No Lyrics found!</p>
                }
            </div>
        </div>
        
        <RelatedSongs 
            data={data.tracks}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
        />
    </div>
    );
}

export default SongDetails;

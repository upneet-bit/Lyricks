import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs} from "../components";
import { setActiveSong,playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery } from "../redux/services/billboard";

const ArtistDetails = () => {
    const { id :artistId } = useParams();
    const {activeSong, isPlaying} = useSelector((state)=> state.player);
    const {data: artistData , isFetching : isFetchingArtistDetails, error} 
        = useGetArtistDetailsQuery(artistId);
    const {data , isFetching : isFetchingSongs, err}
        = useGetArtistTopSongsQuery(artistId);
    
    if(isFetchingArtistDetails || isFetchingSongs )
        return <Loader title="Searching Artist Details" />
    
    if(error || err)
        return <Error />;
        
    // console.log(artistId);
    console.log(artistData);
    console.log(data.data);
    
    return (
    <div className="flex flex-col">
        <DetailsHeader 
          artistId={artistId} 
          artistData={artistData} />
        
        <RelatedSongs 
            data={data.data}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
        />
    </div>
    );
}

export default ArtistDetails;

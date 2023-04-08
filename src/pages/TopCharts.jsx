import { useSelector } from "react-redux";
import { useGetTop100Query } from "../redux/services/billboard";
import { Error, Loader, SongCard } from "../components";

const TopCharts = () => {
    const { data, isFetching, error } = useGetTop100Query();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
  
    if (isFetching) 
        return <Loader title="Loading Top Charts" />;
  
    if (error) return <Error />;
  
    return (
      <div className="flex flex-col">
        <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Discover Top Charts</h2>
  
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {data.tracks.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      </div>
    );
};

export default TopCharts;

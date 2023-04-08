import React from 'react';

import { ArtistCard, Error, Loader } from '../components';
import { useGetTop100Query } from '../redux/services/billboard';


const TopArtists = () => {
    const { data, isFetching, error } = useGetTop100Query();

    if (isFetching) return <Loader title="Loading artists..." />;
  
    if (error) return <Error />;
  
    // console.log(data);
    
    return (
      <div className="flex flex-col">
        <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Top artists</h2>
  
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {data.tracks?.map((track) => <ArtistCard key={track.key} track={track} />)}
        </div>
      </div>
    );
};

export default TopArtists;

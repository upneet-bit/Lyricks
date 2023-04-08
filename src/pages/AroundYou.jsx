import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios'
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from "../components";
import { useGetTop200ByCountryQuery } from '../redux/services/spotify';
const AroundYou = () => {
    // const [country, setCountry] = useState('');
    // const [loading, setLoading] = useState(true);
    
    // setCountry('IN');
    // console.log(country);

    // useEffect(()=>{// ipify
    //     axios.get("https://geo.ipify.org/api/v1?apiKey=at_DN2GU99t121SY1fFxs5ysb0hkDyPo")
    //     .then((res)=> setCountry(res?.data?.location?.country))
    //     .catch((err)=>console.log(err))
    //     .finally(()=>setLoading(false));
    // }, [country]);

    const { data, isFetching, error } = useGetTop200ByCountryQuery('IN');
    const { activeSong, isPlaying } = useSelector((state) => state.player);
  
    if (isFetching) 
        return <Loader title="Loading Top Charts" />;
  
    if (error) return <Error />;

    // console.log(data.slice(0,20));

    return (
      <div className="flex flex-col">
        <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Discover Top Charts</h2>
  
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {data.map((song, i) => (
            <SongCard
              key={song.trackMetadata.trackName}
              song={song.trackMetadata}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      </div>
    );
}

export default AroundYou;

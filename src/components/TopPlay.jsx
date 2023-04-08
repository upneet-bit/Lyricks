import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTop100Query } from "../redux/services/billboard";

import 'swiper/css';
import 'swiper/css/free-mode';
import { TopCharts } from "../pages";

const TopChartCard = ({song,i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className="flex flex-row items-center w-full hover:bg-[#4c426e]
  py-2 p-2 rounded-lg cursor-pointer mb-2">
    <h3 className="mr-3 text-base font-bold text-white">{i+1}.</h3>
    
    <div className="flex flex-row items-center justify-between flex-1">
      <img className="w-20 h-20 rounded-lg" src={song?.images.coverart} alt={song?.title} />

      <div className="flex flex-col justify-center flex-1 mx-3">
       <Link to={`/songs/${song.key}`} >
          <p className="text-xl font-bold text-white" >
            {song?.title}
          </p>
       </Link>
       <Link to={`/artists/${song.artists[0].adamid}`} >
          <p className="mt-1 text-base text-gray-300" >
            {song?.subtitle}
          </p>
       </Link>
      </div>      
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch= useDispatch();
  const {activeSong, isPlaying} = useSelector((state)=> state.player)
  const {data} = useGetTop100Query();
  const divRef= useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour : 'smooth' })
  });

  const topPlays= data?.tracks?.slice(0,5);
  // console.log(topPlays);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }  

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  } 

  return (
    <div ref={divRef} className="
    flex-1 mb-6 ml-0 xl:ml-6 xl:mb-0 xl:max-w-[500px] 
    max-w-full flex flex-col"  >
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-base text-gray-300 cursor-pointer"
            >See More</p>
          </Link>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          {topPlays?.map((song,i) => (
            <TopChartCard 
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={()=> handlePlayClick(song,i) }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-bold text-white"
            >Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-base text-gray-300 cursor-pointer"
              >See More</p>
            </Link>
        </div>
        
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song,i)=>(
            <SwiperSlide
            key={song?.key}
            style={ {width: '25%', height: 'auto'}}
            className="rounded-full shadow-lg animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name" 
                  className="object-cover w-full rounded-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>

    </div>
  )


};

export default TopPlay;

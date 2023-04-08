import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const spotifyApi = createApi({
        reducerPath: 'spotifyApi' ,
        baseQuery  : fetchBaseQuery({
            baseUrl:'https://spotify81.p.rapidapi.com/',
            prepareHeaders: (headers)=>{
                headers.set('X-RapidAPI-Key','d766e736a4msh4be0f2bb969a53bp1bbb7cjsna4779e0eb3ab');
                return headers;
            }
        }),
        endpoints: (builder) => ({
            getTop200ByCountry: builder.query({
                query : (country)=> `/top_200_tracks?country=${country}`    //IN
            })
        })
    });

    //hook
    export const {
        useGetTop200ByCountryQuery
    }=spotifyApi;
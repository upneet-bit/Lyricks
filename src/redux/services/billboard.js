import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const billBoardApi = createApi({
        reducerPath: 'billBoardApi' ,
        baseQuery  : fetchBaseQuery({
            baseUrl:'https://shazam.p.rapidapi.com/',
            prepareHeaders: (headers)=>{
                headers.set('X-RapidAPI-Key','d766e736a4msh4be0f2bb969a53bp1bbb7cjsna4779e0eb3ab');
                return headers;
            }
        }),
        endpoints: (builder) => ({
            getTop100: builder.query({
                query : ()=> '/charts/track?locale=en-US&pageSize=20&startFrom=0'
            }),
            getSongDetails: builder.query({
                query: ({ songid }) => `/songs/get-details?key=${songid}`
            }),
            getSongRelated: builder.query({
                query: ({ songid }) => `/songs/list-recommendations?key=484129036&locale=en-US`// ${songid}
            }),
            getArtistDetails:builder.query({
                query: (artistId) => `/artists/get-details?id=${artistId}`
            }),
            getArtistTopSongs:builder.query({
                query: (artistId) =>`/artists/get-top-songs?id=${artistId}&l=en-US`
            }),
            getSongsBySearch: builder.query({
                query: (searchTerm) =>`/search?term==${searchTerm}&locale=en-US&offset=0&limit=5`
            })
            ,
            // getSongsByCountry:builder.query({
            //     query: (country) => ``
            // })
        })
    });

    //hook
    export const {
        useGetTop100Query,
        useGetSongDetailsQuery,
        useGetSongRelatedQuery,
        useGetArtistDetailsQuery,
        useGetArtistTopSongsQuery,
        useGetSongsBySearchQuery
    }=billBoardApi;
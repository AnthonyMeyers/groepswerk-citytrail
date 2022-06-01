import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const placeholderImgStad = "fs_anthonym/groepswerk/images/placeholder_city.webp";
const placeholderImgMon = "fs_anthonym/groepswerk/images/monument_placeholder.webp";
const placeholderFlag = "fs_anthonym/groepswerk/images/unknown_flag.jpg";

const api = createApi({
  reducerPath: "landenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wdev2.be",
  }),
  tagTypes: ["LANDEN", "STEDEN", "MONUMENTEN", "TALEN"],
  endpoints: (builder) => ({
    //Get alle landen
    getAllLanden: builder.query({
      query: (page = "/fs_stijn/eindwerk/api/countries.jsonld?page=1") => {
        console.log(page);
        if(page.toString().indexOf("?page=") > -1){
        page = page.toString().substr(page.toString().indexOf("?page=") + 6);
      }
        return `/fs_stijn/eindwerk/api/countries.jsonld?page=${page}`;
      },
      providesTags: ["LANDEN"],
      transformResponse: (response) => {
        let lastPage = "/api/countries.jsonld?page=1";
        let nextPage = "/api/countries.jsonld?page=1";
        let isPage = "";
        if ("hydra:view" in response) {
          if ("hydra:previous" in response["hydra:view"]) {
            lastPage = response["hydra:view"]["hydra:previous"];
          } else if ("hydra:last" in response["hydra:view"]) {
            lastPage = response["hydra:view"]["hydra:last"];
          }
          if ("@id" in response["hydra:view"]) {
            isPage = response["hydra:view"]["@id"]
              .toString()
              .substr(
                response["hydra:view"]["@id"].toString().indexOf("?page=")+ 6
              );
          }
        }

        if (response["hydra:view"] && response["hydra:view"]["hydra:next"]) {
          nextPage = response["hydra:view"]["hydra:next"];
        }

        const list = response["hydra:member"]
        return {
          list,
          lastPage,
          nextPage,
          isPage,
        };
      },
    }),
    //Get alle talen
    getAllLanguages: builder.query({
      query: () => `/fs_stijn/eindwerk/api/languages.json?pagination=false`,
      transformResponse: (response) => response.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }),
      providesTags: ["TALEN"],
    }),
    //Get 1 land
    getOneLand: builder.query({
      query: (id) => `/fs_stijn/eindwerk/api/countries/${id}.jsonld`,
      providesTags: ["LANDEN", "TALEN"],
    }),

    //Get 1 stad
    getOneStad: builder.query({
      query: (id) => ({ url: `/fs_stijn/eindwerk/api/cities/${id}.json` }),
      providesTags: ["STEDEN"],
    }),
    //Get 1 monument
    getOneMonument: builder.query({
      query: (id) => ({ url: `/fs_stijn/eindwerk/api/monuments/${id}.json` }),
      providesTags: ["MONUMENTEN"],
    }),
    //Post een land
    addOneLand: builder.mutation({
      query: (name) => ({
        url: `/fs_stijn/eindwerk/api/countries.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { name, flag: placeholderFlag, languages: []},
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Post een taal
    addOneLanguage: builder.mutation({
      query: (name) => ({
        url: `/fs_stijn/eindwerk/api/languages.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Post een stad
    addOneStad: builder.mutation({
      query: ({ countryId, name }) => ({
        url: `/fs_stijn/eindwerk/api/cities.json`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: {
          country: `/api/countries/${countryId}`,
          name,
          latidude: "0",
          longitude: "0",
          img: placeholderImgStad,
        },
      }),
      invalidatesTags: ["STEDEN", "LANDEN"],
    }),
    //Post een monument
    addOneMonument: builder.mutation({
      query: ({ cityId, name }) => ({
        url: `/fs_stijn/eindwerk/api/monuments.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { city: `/api/cities/${cityId}`, name, img: placeholderImgMon },
      }),
      invalidatesTags: ["STEDEN", "MONUMENTEN"],
    }),

    //Delete een land
    removeOneLand: builder.mutation({
      query: (id) => ({
        url: `/fs_stijn/eindwerk/api/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //DELETE een taal
    removeOneLanguage: builder.mutation({
      query: (id) => ({
        url: `/fs_stijn/eindwerk/api/languages/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Delete een stad
    removeOneCity: builder.mutation({
      query: (id) => ({
        url: `/fs_stijn/eindwerk/api/cities/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["STEDEN", "LANDEN"],
    }),
    //Delete een monument
    removeOneMonument: builder.mutation({
      query: (id) => ({
        url: `/fs_stijn/eindwerk/api/monuments/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["MONUMENTEN", "STEDEN"],
    }),
    //Wijzig een land
    updateOneLand: builder.mutation({
      query: ({ id, name = "test", flag = "test" }) => ({
        url: `/fs_stijn/eindwerk/api/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, flag },
      }),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Voeg taal toe aan land
    changeLanguagesCity: builder.mutation({
      query: ({ id, languages }) => (
        console.log(languages),
        {
          url: `/fs_stijn/eindwerk/api/countries/${id}.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "PUT",
          body: { languages },
        }
      ),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Wijzig een stad
    updateOneCity: builder.mutation({
      query: ({
        id,
        name = "",
        latidude = 0,
        longitude = 0,
        img = placeholderImg,
      }) => ({
        url: `/fs_stijn/eindwerk/api/cities/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, latidude, longitude, img },
      }),
      invalidatesTags: ["STEDEN"],
    }),
    //Wijzig een monument
    updateOneMonument: builder.mutation({
      query: ({ id, name = "", description = "", img }) => ({
        url: `/fs_stijn/eindwerk/api/monuments/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name: name, description, img },
      }),
      invalidatesTags: ["MONUMENTEN"],
    }),
  }),
});

export default api;
export const {
  useGetAllLandenQuery,
  useGetOneLandQuery,
  useGetOneStadQuery,
  useGetOneMonumentQuery,
  useGetAllLanguagesQuery,
  useAddOneLandMutation,
  useAddOneStadMutation,
  useAddOneMonumentMutation,
  useAddOneLanguageMutation,
  useRemoveOneLandMutation,
  useRemoveOneLanguageMutation,
  useRemoveOneCityMutation,
  useRemoveOneMonumentMutation,
  useUpdateOneLandMutation,
  useUpdateOneCityMutation,
  useUpdateOneMonumentMutation,
  useChangeLanguagesCityMutation,

} = api;

/*    //Get alle landen
    getAllLanden: builder.query({
      query: () => `/countries.json?page=1`,
      providesTags: ["LANDEN"],
    }),*/

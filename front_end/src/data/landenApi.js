import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "landenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api",
  }),
  tagTypes: ["LANDEN", "STEDEN", "MONUMENTEN"],
  endpoints: (builder) => ({
    //Get alle landen
    getAllLanden: builder.query({
      query: () => `/countries.json`,
      providesTags: ["LANDEN"],
    }),
    //Get 1 land
    getOneLand: builder.query({
      query: (id) => `/countries/${id}.json`,
      providesTags: ["LANDEN"],
    }),

    //Get 1 stad
    getOneStad: builder.query({
      query: (id) => ({ url: `/cities/${id}.json` }),
      providesTags: ["STEDEN"],
    }),
    //Get 1 monument
    getOneMonument: builder.query({
      query: (id) => ({ url: `/monuments/${id}.json` }),
      providesTags: ["MONUMENTEN"],
    }),
    //Post een land
    AddOneLand: builder.mutation({
      query: (name) => ({
        url: `/countries.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Post een stad
    AddOneStad: builder.mutation({
      query: ({ countryId, name }) => ({
        url: `/cities.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { country: `/api/countries/${countryId}`, name },
      }),
      invalidatesTags: ["STEDEN", "LANDEN"],
    }),
    //Post een monument
    AddOneMonument: builder.mutation({
      query: ({ cityId, name }) => ({
        url: `/monuments.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { city: `/api/cities/${cityId}`, name },
      }),
      invalidatesTags: ["STEDEN", "MONUMENTEN"],
    }),
    //Delete een land
    removeOneLand: builder.mutation({
      query: (id) => ({
        url: `/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Delete een stad
    removeOneCity: builder.mutation({
      query: (id) => ({
        url: `/cities/${id}.json`,
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
        url: `/monuments/${id}.json`,
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
        url: `/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, flag },
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Wijzig een stad
    updateOneCity: builder.mutation({
      query: ({
        id,
        name = "",
        latidude = null,
        longitude = null,
        img = null,
      }) => ({
        url: `/cities/${id}.json`,
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
      query: ({ id, name = "", description = "", img = "" }) => ({
        url: `/monuments/${id}.json`,
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
  useGetStedenLandQuery,
  useGetOneStadQuery,
  useGetOneMonumentQuery,
  useAddOneLandMutation,
  useAddOneStadMutation,
  useAddOneMonumentMutation,
  useRemoveOneLandMutation,
  useRemoveOneCityMutation,
  useRemoveOneMonumentMutation,
  useUpdateOneLandMutation,
  useUpdateOneCityMutation,
  useUpdateOneMonumentMutation,
} = api;

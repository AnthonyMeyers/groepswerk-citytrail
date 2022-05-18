import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "landenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api",
  }),
  tagTypes: ["Post"],
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    //Get alle landen
    getAllLanden: builder.query({
      query: () => ({ url: `/countries.json` }),
      providesTags: ["Post"],
    }),
    //Get 1 land
    getOneLand: builder.query({
      query: (id) => ({ url: `/countries/${id}.json` }),
    }),

    //Get 1 stad
    getOneStad: builder.query({
      query: (id) => ({ url: `/cities/${id}.json` }),
    }),
    //Get 1 monument
    getOneMonument: builder.query({
      query: (id) => ({ url: `/monuments/${id}.json` }),
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
      invalidatesTags: ["Post"],
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
      invalidatesTags: ["Post"],
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
    }),
    //Wijzig een monument
    updateOneMonument: builder.mutation({
      query: ({ id, name = "", description = "", img = null }) => ({
        url: `/cities/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, description, img },
      }),
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "landenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api.php/records",
  }),
  endpoints: (builder) => ({
    getAllLanden: builder.query({
      query: () => ({ url: `/gw2_land` }),
    }),
    getOneLand: builder.query({
      query: (id) => ({ url: `/gw2_land/${id}` }),
    }),
    getStedenLand: builder.query({
      query: (id) => ({ url: `/gw2_stad/filter=std_lan_id,${id}` }),
    }),
    getOneStad: builder.query({
      query: (id) => ({ url: `/gw2_stad/${id}` }),
    }),
  }),
});

export default api;
export const {
  useGetAllLandenQuery,
  useGetOneLandQuery,
  useGetStedenLandQuery,
  useGetOneStadQuery,
} = api;

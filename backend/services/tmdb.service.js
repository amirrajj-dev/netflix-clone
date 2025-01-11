import axios from "axios";
const authorizationKey = process.env.TMDB_API_KEY

const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${authorizationKey}`
    }
  };

//get a trending movie
export const fetchFromTmdb = async (url)=>{
    const response = await axios.get(url , options)
    if (response.status !== 200){
      throw new Error('Failed to fetch data from API')
    }
    return response.data;
}
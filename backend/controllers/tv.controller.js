import {fetchFromTmdb} from '../services/tmdb.service.js'

export const getTrendingTv = async (req , res)=>{
    try {
        const trendingMovies = await fetchFromTmdb("https://api.themoviedb.org/3/trending/tv/day?language=en-US'")
    const movies = trendingMovies.results
    const movie = movies[Math.floor(Math.random()*movies.length)]
    return res.status(200).json({message : 'fetched trending movie successfully',success : true,data : movie})
    } catch (error) {
        return res.status(500).json({message : 'error fetching trending movie',success : false})
    }
}

export const getTvTrailers = async (req , res)=>{
    try {
        const movieId = req.params.id
        const trailers = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`)
        return res.status(200).json({message : 'fetched trailers successfully',success : true,data : trailers})
    } catch (error) {
        return res.status(500).json({message : 'error fetching trailers',success : false})
    }
}

export const getTvDetails = async (req , res)=>{
    try {
        const movieId = req.params.id
        const movieDetails = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`)
        return res.status(200).json({message : 'fetched movie details successfully',success : true,data : movieDetails})
    } catch (error) {
        return res.status(500).json({message : 'error fetching movie details',success : false})
    }
}

export const getSimillarTvs = async (req , res)=>{
    try {
        const movieId = req.params.id
        const similarMovies = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${movieId}/similar?language=en-US&page=1`)
        return res.status(200).json({message : 'fetched similar movies successfully',success : true,data : similarMovies})
    } catch (error) {
        return res.status(500).json({message : 'error fetching similar movies',success : false})
    }
}

export const getTvsByCategory = async (req , res)=>{
    try {
        const category = req.params.category
        console.log(category);
        
        const movies = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        return res.status(200).json({message : 'fetched movies by category successfully',success : true,data : movies})
    } catch (error) {
        return res.status(500).json({message : 'error fetching movies by category',success : false})
    }
}
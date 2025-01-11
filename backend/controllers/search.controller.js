import { fetchFromTmdb } from "../services/tmdb.service.js";
import usersModel from "../models/user.model.js";
export const searchPerson = async (req, res) => {
    try {
        const personName = req.params.query
        const user = await usersModel.findOne({_id : req.user._id})
        const person = await fetchFromTmdb(`https://api.themoviedb.org/3/search/person?query=${personName}&include_adult=false&language=en-US&page=1`)
        
        if (!person){
            return req.status(404).json({message : "person not found"})
        }else{
            // Add person to user's search history
            user.searchHistory.push({
                id : person.results[0].id ,
                image : person.results[0].profile_path,
                title : person.results[0].name,
                searchType : 'person',
                createdAt : new Date(),
            })
            await user.save()
            return res.status(200).json({message : "person fetched succesfully" , data : person.results , success : true})
        }
    } catch (error) {
        return res.status(500).json({message : "error fetching person", error : error})
    }
};

export const searchMovie = async (req, res) => {
    try {
        const movieName = req.params.query
        const user = await usersModel.findOne({_id : req.user._id})
        const movie = await fetchFromTmdb(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`)
        
        if (!movie){
            return req.status(404).json({message : "movie not found" , success : false})
        }else{
            // Add movie to user's search history
            user.searchHistory.push({
                id : movie.results[0].id ,
                image : movie.results[0].backdrop_path,
                title : movie.results[0].title,
                searchType : 'movie',
                createdAt : new Date(),
            })
            await user.save()
            return res.status(200).json({message : "movie fetched succesfully" , data : movie.results , success : true})
        }
    } catch (error) {
        return res.status(500).json({message : "error fetching movie", error : error , success : false})
    }
};

export const searchTv = async (req, res) => {
    try {
        const tvName = req.params.query
        const user = await usersModel.findOne({_id : req.user._id})
        const tv = await fetchFromTmdb(`https://api.themoviedb.org/3/search/tv?query=${tvName}&include_adult=false&language=en-US&page=1`)
        
        if (!tv){
            return req.status(404).json({message : "tv not found" , success : false})
        }else{
            // Add tv to user's search history
            user.searchHistory.push({
                id : tv.results[0].id ,
                image : tv.results[0].backdrop_path,
                title : tv.results[0].original_name,
                searchType : 'tv',
                createdAt : new Date(),
            })
            await user.save()
            return res.status(200).json({message : "tv fetched succesfully" , data : tv.results , success : true})
        }
    } catch (error) {
        return res.status(500).json({message : "error fetching tv", error : error , success : false})
    }
};

export const getSearchHistory = async (req , res)=>{
   try {
    const user = await usersModel.findById(req.user._id)
    return res.status(200).json({message : "search history fetched succesfully" , success : true , data : user.searchHistory.reverse()})
   } catch (error) {
    res.status(500).json({message : "error fetching search history" , error : error.message , success : false})
   }
}

export const deleteOneItemFromSearchHistory = async (req , res)=>{
    try {
        const {id} = req.params
        const user = await usersModel.findById(req.user._id)
        //delete item from user search history array
        user.searchHistory = user.searchHistory.filter(item => item.id.toString() !== id.toString())
        await user.save()
        user.password = null
        res.status(200).json({message : "item deleted from searchHistory successfully" , success : true , data : user})
    } catch (error) {
        res.status(500).json({message : "error deleting item from searchHistory" , error : error , success : false})
    }
}
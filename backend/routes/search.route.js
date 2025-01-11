import express from 'express'
import {searchMovie , searchPerson , searchTv , deleteOneItemFromSearchHistory , getSearchHistory} from '../controllers/search.controller.js'
const router = express.Router()

router.get('/person/:query' , searchPerson)
router.get('/movie/:query' , searchMovie)
router.get('/tv/:query' , searchTv)

router.get('/history' , getSearchHistory)
router.delete('/history/:id' , deleteOneItemFromSearchHistory)
export default router;
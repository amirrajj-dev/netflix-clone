import {create} from 'zustand'

export const useContentType = create((set)=>({
    contentType : 'movies',
    setContentType : (type)=>{
        set({contentType : type})
    }
}))

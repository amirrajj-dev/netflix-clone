import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useContentType } from '../../store/useContentType';

const useGetContentByCategory = (categories) => {
    const { contentType } = useContentType();
    const [categoryContent, setCategoryContent] = useState({});
    const [errors, setErrors] = useState(null);
    const fetchByCategory = useCallback(async () => {
        if (Object.keys(categoryContent).length > 0) return
        try {
            const fetchPromises = categories.map(category => 
                axios.get(`/api/${contentType}/${category}`)
                    .then(({ data }) => ({ category, data: data.data.results }))
            );

            const results = await Promise.all(fetchPromises);
            
            const content = results.reduce((acc, result) => {
                acc[result.category] = result.data;
                return acc;
            }, {});

            setCategoryContent(content);
        } catch (error) {
            setErrors(error);
        }
    }, [categories, contentType]);

    useEffect(() => {
        fetchByCategory();
    }, [fetchByCategory]);

    useEffect(()=>{
        setCategoryContent({})
    } , [contentType])

    return {
        categoryContent, errors
    };
}

export default useGetContentByCategory;
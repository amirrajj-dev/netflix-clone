import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
  return (
    <div className='capitalize p-4 text-white bg-black'>built by <span className='underline font-bold'>amirrajj-dev</span> the source code is available in my <Link to={'https://github.com/amirrajj-dev'} className='font-bold underline'>github</Link></div>
  )
}

export default footer
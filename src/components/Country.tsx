import React from 'react'
import { Link } from 'react-router-dom'



type CountrypropsType = {
  population: number | undefined
  name: any | undefined
  region: string
  capital: string[]
  flags: {
    alt:string
    png:string
    svg:string
  }
}

export const Country = ({name,population,capital,region,flags}:CountrypropsType) => {

  
  return (
    <Link to={`/country/${name.common}`} className='my-6 dark:bg-darkColor' >
     <div className='bg-white shadow-md w-full dark:bg-darkColor dark:text-darkTextColor '>
      <img src={flags.png} alt='img' className='shadow-lg w-full md:h-44 '/>
      <div className='p-3 flex flex-col gap-2'>
       <p className='font-bold text-lg py-2'>{name.common}</p>
       <p className='text-sm'><span className='font-bold'>Population: </span>{population?.toLocaleString("en-US")}</p>
       <p className='text-sm'><span className='font-bold'>Region: </span>{region}</p>
       <p className='text-sm'><span className='font-bold'>Capital: </span>{capital}</p>
      </div>
     </div>
      {/* testing */}
    </Link>
  )
}

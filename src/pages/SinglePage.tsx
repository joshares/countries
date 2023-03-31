import React from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useCountryContext } from '../context/context'


export const SinglePage = () => {
  const {id} = useParams()
  const {fetchSingleCountry,state} = useCountryContext()
  const {single_country:country, single_loading:loading , error} = state

  useEffect(()=>{
    fetchSingleCountry(`https://restcountries.com/v3.1/name/${id}?fullText=true`)
  },[id])
  if(loading === true){
    return (
      <main className='p-6 flex items-center justify-center text-3xl font-nunito'>
      <div>loading...</div>
      </main>
    )
  }
  if(error){
    return (
      <main className='p-6 flex items-center justify-center text-3xl'>
      <div>Error loading data... check connection or reload page</div>
      </main>
    )
  }
  const {name,population,region,subregion,capital,currencies,languages,tld,flags,borders} = country
  const {nativeName} = name
  const nativeNames = Object.values<any |undefined>(nativeName)[0].common
  const cur = Object.values<any | undefined>(currencies)[0].name;
  const lang = Object.values(languages).join(", ")  

  return (
    <main className='  text-xl p-6 font-nunito'>
     <Link to='/countries' className='my-5 p-2 shadow-xl flex w-max justify-center items-center gap-3 rounded-lg dark:bg-darkColor dark:text-darkTextColor '>
      <HiOutlineArrowLeft/>
      <p>back</p>
     </Link>
     <main className='flex flex-col mt-8  md:flex-row dark:text-darkTextColor '>
     <section className='md:w-2/4 md:p-8'>
       <img src={flags.png} alt="img" className='w-full h-full md:h-72 shadow-lg'/>
     </section>
     <section className='md:w-1/2 md:p-8'>
      <p className='py-2 pt-6 font-bold text-2xl'>{name.common}</p>
      <div>
       <article className='flex flex-col gap-5 md:flex-row md:justify-between md:items-start'>
        <div >
         <p className='text-lg'><span className=' font-bold'>Native name: </span>{nativeNames}</p>
         <p className='text-lg'><span className=' font-bold text-lg'>Population: </span>{population.toLocaleString("en-US")}</p>
         <p className='text-lg'><span className=' font-bold '>Region: </span>{region}</p>
         <p className='text-lg'><span className=' font-bold'>sub Region: </span>{subregion}</p>
         <p className='text-lg'><span className=' font-bold '>Capital: </span>{capital}</p>
        </div>
        <div>
         <p className='text-lg'><span className=' font-bold '>Top level Domain :</span>{tld[0] || tld}</p>
         <p className='text-lg'><span className=' font-bold '>Currencies: </span>{cur}</p>
         <p className='text-lg'> <span className=' font-bold '>Languages: </span>{lang}</p>
        </div>
       </article>
      </div>
      <div className='md:flex  gap-4 my-4'>
       <p className=' font-bold  text-xl'>Border Countries:</p>
       <div className='flex gap-2'>
        {borders?.map((border:string) => {
          return (
            <p className='p-1 px-3 md:px-1 bg-white shadow-md text-sm dark:bg-darkColor dark:text-darkTextColor '>{border}</p>
          )
        })}
       </div>
      </div>
     </section>
    </main>
    </main>
  )
}

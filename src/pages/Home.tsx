import React from 'react'
import { Search } from '../components/Search'
import { Country } from '../components/Country'
import { useCountryContext } from '../context/context'

export const Home = () => {
  const {state} = useCountryContext()
  const {countries_loading:loading, filtered_country:countries, error} = state

  if(loading === true){
    return (
      <main className='p-6 flex items-center justify-center text-3xl'>
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

  if(countries){
    if(countries?.length < 1){
    return (
      <main className='p-6 font-nunito'>
        <Search/>
        <div className='flex flex-col  justify-center items-center text-2xl  my-10'>
        <p>Country cannot be found</p>
        <p>check spelling well or try another</p>
      </div>
      </main>
    )
  }else {
    return (
    <main className='p-6 font-nunito'>
     <Search/>
     <div className='md:grid grid-cols-4 gap-8 w-full flex flex-col justify-center items-center'>
     {countries?.map((country, index) =>{
      const {population,region,name,capital,flags}  = country
      return(
        <Country population={population} region={region} name={name} capital={capital} flags={flags} />
      )
     })}
     </div>
    </main>
  )
  }
  
  }
  return (
    <div>
      <p>error</p>
    </div>
  )
}

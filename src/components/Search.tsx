import React from 'react'
import { useState} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { useCountryContext } from '../context/context'

export const Search = () => {
  const {
   state,
   SearchCountry,
   filterCountry,
   SearchResult,
  } = useCountryContext()

  const {searchvalue} = state

 const [open, setOpen] = useState<boolean>(false)
 

 const handleClick = (e?:React.FormEvent<HTMLFormElement>)=> {
  if(e){
    e.preventDefault()
  }
  SearchResult()
  console.log(searchvalue)
 }


  return (
    <main className='flex flex-col gap-5 md:flex-row md:justify-between '>
     <form className='flex items-center dark:bg-darkColor dark:text-darkTextColor  md:w-1/3 shadow-md h-10' onSubmit={(e) => {
      handleClick(e)
     }}>
      <button  type='submit' className='w-1/12 flex justify-center items-center'>
       <AiOutlineSearch onClick={() =>handleClick()}/>
      </button>
      <input className='w-full outline-none h-10 dark:bg-darkColor dark:text-darkTextColor' type='text' value={searchvalue} placeholder='search for any country...'
      onChange={(e) => SearchCountry(e)}
      
      />
     </form>
     <div>
      <div className='flex items-center gap-5 shadow-md  p-3 w-52 dark:bg-darkColor dark:text-darkTextColor'>
       <p>Filter by Region</p>
       { open ? (
        <IoIosArrowUp className='mt-1' onClick={ () => setOpen(!open)}/>
       ) : 
       (
        <IoIosArrowDown className='mt-1' onClick={ () => setOpen(!open)}/>
       )
       }
      </div>
      {open && (
       <div className='shadow-md p-3 flex flex-col gap-2 cursor-pointer w-52 absolute z-10 bg-white dark:bg-darkColor dark:text-darkTextColor'>
       <button onClick={() =>{
        filterCountry('Africa')
        setOpen(!open)
       }} >Africa</button>
       <button onClick={() =>{
        filterCountry('Americas')
        setOpen(!open)
       }} >America</button>
       <button onClick={() =>{
        filterCountry('Asia')
        setOpen(!open)
       }}>Asia</button>
       <button onClick={() =>{
        filterCountry('Europe')
        setOpen(!open)
       }}>Europe</button>
       <button onClick={() =>{
        filterCountry('Oceania')
        setOpen(!open)
       }}>Oceania</button>
      </div>
      )}
     </div>
    </main>
  )
}

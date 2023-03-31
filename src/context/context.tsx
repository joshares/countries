import { createContext, useContext,useReducer,useEffect } from "react";
import { reducer } from "../reducer/reducer";

export type initialStateType = {
 error:boolean
 countries: {}[] | undefined
 countries_loading: boolean
 filtered_country: any[] | undefined,
 single_country: any |undefined,
 single_loading: boolean
  searchvalue: string
}


const initialState:initialStateType = {
 error:false,
 countries: [],
 countries_loading: false,
 filtered_country: [],
 single_country: [],
 single_loading: false,
 searchvalue: '',
}


type ContextProviderProps = {
 children: React.ReactNode
}
type ContextType = {
 state:initialStateType
 fetchSingleCountry: (url:string)=>Promise<void>
 filterCountry:(e:string) => void
 SearchCountry: (e:React.ChangeEvent<HTMLInputElement>)=> void
 SearchResult: (e?:React.FormEvent<HTMLFormElement>) => void
}

export const CountryContext = createContext<ContextType>({
  state: initialState,
  fetchSingleCountry: async()=> {},
  filterCountry: (e:string)=> {},
  SearchCountry:(e)=> {},
  SearchResult: (e) =>{},
});

const url:string = 'https://restcountries.com/v3.1/all'

export const ContextProvider = ({
 children,
}: ContextProviderProps) => {
  const [state,dispatch] = useReducer(reducer, initialState)

  const fetchCountries = async(url:string) => {
   dispatch({type:'GET_COUNTRY_BEGIN'})
    try{
     const resp = await fetch(url)
     const data = await resp.json()
    dispatch({type:"GET_COUNTRY_SUCCESS",payload:data})
    }catch(err){
     dispatch({type:"GET_ERROR"})
    }
  }

  const fetchSingleCountry = async(url:string) => {
    dispatch({type:'GET_SINGLE_BEGIN'})
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      const country = data[0]
      dispatch({type:'GET_SINGLE_SUCCESS',payload:country})
    } catch (error) {
      dispatch({type:"GET_ERROR"})
    }
  }

  const filterCountry = (e:string) => {
    dispatch({type:"FILTER_COUNTRY", payload:e})
  }

  const SearchCountry = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    let value = e.target.value.toLowerCase()  
    dispatch({type:"GET_SEARCH_COUNTRY", payload:value})
  }
  const SearchResult = (e?:React.FormEvent<HTMLFormElement>) => {
   dispatch({type:"GET_SEARCH_RESULT"})
  }

  useEffect(()=> {
    fetchCountries(url)
    fetchSingleCountry(`https://restcountries.com/v3.1/name/nigeria?fullText=true`)
  },[])
 

 return <CountryContext.Provider 
 value={{
  state,
  fetchSingleCountry,
  filterCountry,
  SearchCountry,
  SearchResult,
 }}
 >{children}</CountryContext.Provider>
}

export const useCountryContext = () => {
  return useContext(CountryContext)
}
import { initialStateType } from '../context/context'

export type ReducerAction = {
 type: 'GET_COUNTRY_BEGIN' | 'GET_COUNTRY_SUCCESS'|'GET_SINGLE_BEGIN' | 'GET_SINGLE_SUCCESS' | 'FILTER_COUNTRY' | 'GET_SEARCH_COUNTRY' | 'GET_SEARCH_RESULT'|'GET_ERROR'
 payload?: any
}



export function reducer(state:initialStateType , action:ReducerAction):initialStateType {
 switch(action.type){
  case 'GET_COUNTRY_BEGIN':
   return {...state, countries_loading:true}
  case 'GET_COUNTRY_SUCCESS':
    return {...state, countries_loading:false, filtered_country:action.payload, countries:action.payload}
  case 'GET_SINGLE_BEGIN':
    return{...state, single_loading:true}
  case 'GET_SINGLE_SUCCESS':
    return {...state, single_loading:false,single_country:action.payload}
  case 'FILTER_COUNTRY':
    const temp = state.countries?.filter((c:any)=> c.region === action.payload)
    return{
      ...state,
     filtered_country:temp
    }
  case 'GET_SEARCH_COUNTRY':
    const value = action.payload
    return {
      ...state,
      searchvalue:value,
    }
  case 'GET_SEARCH_RESULT':
    const trial = state.countries?.filter((d:any) => d.name.common.toLowerCase() === state.searchvalue)
    return {
      ...state,
      filtered_country:trial
    }
  case 'GET_ERROR':
    return {
      ...state,
      error:true
    }
  default:
    throw new Error('not working')
 }
}

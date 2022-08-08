import { createContext, useContext } from 'react'


const Currency = createContext()

const CurrencyContext = ({children}) => {
  return(
    <Currency.Provider>
      {children}
    </Currency.Provider>
  )
}


export default CurrencyContext

export const CurrencyState = () => {
  return useContext(Currency)    
}
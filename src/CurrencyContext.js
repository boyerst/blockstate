import { createContext } from 'react'


const Currency = createContext()

const CurrencyContext = ({children}) => {
  return(
    <Currency.Provider>
      {children}
    </Currency.Provider>
  )
}


export default CurrencyContext
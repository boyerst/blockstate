import { createContext, useContext, useState, useEffect } from 'react'


const Currency = createContext()

const CurrencyContext = ({children}) => {

  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  useEffect(() => {
    if (currency === "USD") setSymbol("$")
    else if (currency === "BTC") setSymbol("₿")
  })


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
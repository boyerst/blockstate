import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { CurrencyState } from "../../CurrencyContext"
import { TrendingCoins } from "../../config/api"
import AliceCarousel from "react-alice-carousel"



const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center"
  }
}))

const Carousel = () => {

  const [trending, setTrending] = useState([])

  const classes = useStyles()

  const { currency, setCurrency } = CurrencyState()

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()    
  }, [currency])


  console.log(trending)

  return (
    <div className={classes.carousel}>
      Carousel
      <AliceCarousel />
    </div>

  )    
}

export default Carousel
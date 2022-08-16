import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { CurrencyState } from "../../CurrencyContext"
import { TrendingCoins } from "../../config/api"
import AliceCarousel from "react-alice-carousel"
import { Link } from "react-router-dom"



const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center"
  }
}))



const Carousel = () => {

  const [trending, setTrending] = useState([])
  
  const { currency, symbol } = CurrencyState()

  const classes = useStyles()


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()    
  }, [currency])


  console.log(trending)

  const items = trending.map((coin) => {

    return (
      <Link
        to={`/coins/${coin.id}`}
        className={classes.carouselItem}
      >
        <img src={coin?.image} alt=""/>

      </Link>
    )
  })



  const responsive = {
    0: {
      items: 2, 
    },
    512: {
      items: 4, 
    }
  }


  return (
    <div className={classes.carousel}>
      Carousel
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoplay
        items={items}
      />
    </div>

  )    
}

export default Carousel
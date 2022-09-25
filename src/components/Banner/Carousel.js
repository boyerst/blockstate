import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { CurrencyState } from "../../CurrencyContext"
import { TrendingCoins } from "../../config/api"
import AliceCarousel from "react-alice-carousel"
import { Link } from "react-router-dom"
import { numberWithCommas } from "../../utils/utils"



const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    padding: 40
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase"
  }
}))



const Carousel = () => {

  const [trending, setTrending] = useState([])
  

  const classes = useStyles()

  const { currency, symbol } = CurrencyState()

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()    
  }, [currency])


  // console.log("TrendingCoins: ", trending)

  const items = trending.map((coin) => {

    let profit = coin?.price_change_percentage_24h >= 0

    return (
      <Link
        to={`/coins/${coin.id}`}
        className={classes.carouselItem}
      >
        <img 
          src={coin?.image} 
          alt={coin.name}
          height="80"
          style={{marginBottom: 10}}
        />
        <span> {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 700
            }}
          > 
            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
          {
            currency === "USD" ? <>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</>
            : coin.id === "bitcoin" && currency === "BTC" ? <>{symbol} {coin?.current_price.toFixed(2)}</>
            : <>{symbol} {coin?.current_price.toFixed(9)}</>
          }
        </span>
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
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>

  )    
}

export default Carousel
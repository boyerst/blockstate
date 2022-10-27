import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import AliceCarousel from "react-alice-carousel"
import axios from "axios"
import { TrendingCoins } from "../../config/api"




const useStyles = makeStyles(() => ({
  carousel: {
    height: "20%",
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



function TrendingCarousel() {

  const [trending, setTrending] = useState([])

  const classes = useStyles()


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins())
    const { coins, exchanges } = data
    setTrending(coins)
  }


  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  console.log("🟢trending: ", trending)
  // console.log("🟢trending[0]: ", trending[0].item.id)

  const items = trending.map((coin) => {

    return (
      <Link
        to={`/coins/${coin.item.id}`}
        className={classes.carouselItem}
      >
        <span style={{ fontSize: 18, fontWeight: 500 }}>
          {coin.item.symbol}
        </span>
        <span>
          ₿ {coin.item.price_btc.toFixed(8)}
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
        autoPlayInterval={4000}
        animationDuration={1500}
        autoPlayDirection="rtl"
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>

  )


}





export default TrendingCarousel

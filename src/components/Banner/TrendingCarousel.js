import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { makeStyles, Box } from "@material-ui/core"
import AliceCarousel from "react-alice-carousel"
import axios from "axios"
import { TrendingCoins, SimplePrices  } from "../../config/api"
// import { } from "../../config/api"




const useStyles = makeStyles(() => ({
  carousel: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 60
  },
  carouselItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  carouselData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase"
  }
}))



function TrendingCarousel() {

  const classes = useStyles()

  const [trending, setTrending] = useState([])
  const [ids, setIds] = useState([])
  const [prices, setPrices] = useState([])
  // const [trendingLoading, setTrendingLoading] = useState(false)


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins())
    const { coins, exchanges } = data
    setTrending(coins)
    const coinIds = coins.map((coin) => coin.item.id)
    setIds(coinIds)
  }


  const fetchSimplePrices = async () => {
    console.log("🌞🌞🌞🌞FETCH SIMPLE PRICES!")
    // setSimpleLoading(true)
    const { data } = await axios.get(SimplePrices(ids))
    setPrices(data)
    // setSimpleLoading(false)
    console.log("🔵🔵🔵SIMPLEPRICESDATA: ", data)
  }


  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  useMemo(() => {
    fetchSimplePrices()
  }, [ids])


  console.log("🟢trending: ", trending)
  console.log("🟢trending ID: ", trending[0]?.item.id)
  console.log("🇺🇸ids: ", ids)
  console.log("💰prices: ", prices)


  const items = trending.map((coin) => {

    return (
      <Link
        to={`/coins/${coin.item.id}`}
        className={classes.carouselItem}
      >
        <img
          src={coin?.item.small}
          alt={coin?.item.name}
          height="50"
          width="50"
          style={{ marginRight: 15 }}
        />
        <Box className={classes.carouselData}>
          
          <span style={{ fontSize: 18, fontWeight: 500 }}>
            {coin?.item.symbol}
          </span>
          <span>
            ₿ {coin?.item.price_btc.toFixed(8)}
          </span>
        </Box>
      </Link>
    )
  })


  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
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
        // paddingLeft={195}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>

  )


}





export default TrendingCarousel

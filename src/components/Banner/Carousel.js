import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AliceCarousel from "react-alice-carousel"
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { CurrencyState } from "../../CurrencyContext"
import { TopCoins } from "../../config/api"
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



function Carousel() {

  const [top, setTop] = useState([])

  const classes = useStyles()

  const { currency, symbol } = CurrencyState()

  const fetchTopCoins = async () => {
    const { data } = await axios.get(TopCoins(currency))
    setTop(data)
  }

  useEffect(() => {
    fetchTopCoins()
  }, [currency])

  console.log("top: ", top)

  const items = top.map((coin) => {

    const profit = coin?.price_change_percentage_24h >= 0

    return (
      <Link
        to={`/coins/${coin.id}`}
        className={classes.carouselItem}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 23 }}
        />
        <span style={{ marginBottom: 10 }}>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}
            %
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
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

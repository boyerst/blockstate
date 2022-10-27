// import React from "react"
import "../../App.css"
import { makeStyles, Container, Typography } from "@material-ui/core"
import TopCarousel from "./TopCarousel"
import TrendingCarousel from "./TrendingCarousel"




const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    paddingBottom: 60,
    justifyContent: "space-around"
  },
  titleType: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
}))


function Banner() {

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.bannerContent}>
        <div className={classes.titleType}>
{/*          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Open Sans"
            }}
          >
            BlockState
          </Typography>*/}
          <Typography
            variant="h6"
            style={{
              marginLeft: 20,
              fontWeight: 700,
              fontFamily: "Open Sans",
              textAlign: "left"
            }}
          >
            Trending Coins
          </Typography>
          <TrendingCarousel />
          <Typography
            variant="h6"
            style={{
              marginLeft: 20,
              fontWeight: 700,
              fontFamily: "Open Sans",
              textAlign: "left",
              paddingTop: 70
            }}
          >
            Top Coins
          </Typography>
          <TopCarousel />
        </div>
      </Container>
    </div>
  )
}


export default Banner

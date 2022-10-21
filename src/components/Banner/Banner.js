import React from "react"
import "../../App.css"
import { makeStyles, Container } from "@material-ui/core"
import Carousel from "./Carousel"



const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    paddingBottom: 140,
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
{/*          <Typography
            variant="h5"
            style={{
              // color: "",
              marginBottom: 20,
              fontFamily: "Open Sans"
            }}
          >
            The State of The Blockchain
          </Typography>*/}
          <Carousel />
        </div>
      </Container>
    </div>
  )
}


export default Banner

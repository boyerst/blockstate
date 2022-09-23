import "../../App.css"
import Carousel from "./Carousel"
import { makeStyles, Container, Typography } from "@material-ui/core"



const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400, 
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    paddingBottom: 40, 
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


const Banner = () => {

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.bannerContent}>
        <div className={classes.titleType}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Open Sans"
            }}
          >
            BlockState
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              // color: "",
              marginBottom: 20,
              fontFamily: "Open Sans"
            }}
          >
            The State of The Blockchain
          </Typography>
          <Carousel />
          
        </div>
      </Container>
    </div>
  )
}


export default Banner
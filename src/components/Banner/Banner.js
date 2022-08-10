import "../../App.css"
import { makeStyles, Container, Typography } from "@material-ui/core"


const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400, 
    display: "flex",
    flexDirection: "column",
    paddingTop: 25, 
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
              marginBottom: 15,
              fontFamily: "Open Sans"
            }}
          >
            BlockState
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              // color: "",
              fontFamily: "Open Sans"
            }}
          >
            The State of The Blockchain
          </Typography>
          
        </div>
      </Container>
    </div>
  )
}


export default Banner
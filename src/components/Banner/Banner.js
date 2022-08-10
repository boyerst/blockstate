import "../../App.css"
import { makeStyles, Container, Typography } from "@material-ui/core"


const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400, 
    display: "flex",
    flexDirection: "column",
    paddingTop: 25, 
    justifyContent: "space-around",
  }
}))


const Banner = () => {

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.bannerContent}>
        <div>
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
          
        </div>
      </Container>
    </div>
  )
}


export default Banner
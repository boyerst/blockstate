import { makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem } from "@material-ui/core"


const useStyles = makeStyles(() => ({
  title: {
    flex: 1, 
    color: "blue",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    cursor: "pointer"
  }
  
}))




const Header = () => {

  const classes = useStyles()

  return(
    <AppBar color='transparent' position='static' >
      <Container>
        <Toolbar>
          <Typography className={classes.title}>
            BlockState
          </Typography>
          <Select 
            variant="outlined"
            style={{
              width: 100,
              height: 40, 
              marginLeft: 15
            }}
            >
            <MenuItem>USD</MenuItem>
            <MenuItem>BTC</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header


 
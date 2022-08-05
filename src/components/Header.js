import { AppBar, Container, Toolbar, Typography } from "@material-ui/core"


const Header = () => {
  return(
    <AppBar color='transparent' position='static' >
      <Container>
        <Toolbar>
          <Typography>
            BlockState
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header
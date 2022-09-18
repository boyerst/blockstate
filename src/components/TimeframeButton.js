import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles(() => ({
      
}))

const TimeframeButton = ({children, onClick, selected}) => {


  return(
    <span onClick={onClick}>
      {children}
    </span>
  )
}

export default TimeframeButton
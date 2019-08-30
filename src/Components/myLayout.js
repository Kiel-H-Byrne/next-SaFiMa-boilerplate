import React from 'react'
import Appbar from './Nav/AppBar'
import EnhancedSnackbar from './HOCs/EnhancedSnackbar'
import {useSelector} from 'react-redux'

const layoutStyle = {
    margin: 0,
    padding: 0
  };
  
  const Layout = props => {
    const app = useSelector(state => state.app)
    return (
    <div style={layoutStyle}>
      <Appbar router={props.router} />
      <EnhancedSnackbar open={app.snackbarOpen}/>
      {props.children}
    </div>
  )
}
  
  export default Layout;
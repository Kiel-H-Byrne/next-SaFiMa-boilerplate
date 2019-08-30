import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

//Auth
import { doLogOut } from './../../DB/auth';
import * as ACTIONS from './../../Actions/actionConstants';
//Router
import * as ROUTE from './../../Routes';
//DB
import { auth } from './../../DB/firebase';
//Components
import Cart from './../../Components/Cart/Cart';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  linkStyle: {
    marginRight: 15
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //selectors
  const authUser = useSelector(state => state.session.authUser);
  const dispatch = useDispatch();

  //dispatches
  const resetApp = () => {
    dispatch({
      type: ACTIONS.RESET_APP
    });
  }
  //effects
  useEffect(() => {
    const onSetAuthUser = authUser => {
      dispatch({
        type: 'AUTH_USER_SET',
        authUser
      });
    };

    const triggerSnackbar = data => {
      dispatch({
        type: ACTIONS.UPDATE_APP_REDUCER,
        payload: data
      });
    }
    //If Signing up, bypass AuthStateChanged
    auth.onAuthStateChanged(authUser => {
      authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
      if (!authUser) {
        Router.push(ROUTE.LOGIN, { open: true, path: router.route });
        triggerSnackbar({
          snackbarOpen: true,
          message: 'Please sign in',
          variant: 'info'
        });
      }
    });
  }, [authUser, router.route, dispatch]);

  //events

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href={ROUTE.ABOUT} as={ROUTE.ABOUT}>
              <Button variant="text" className={classes.linkStyle}>
                About
              </Button>
            </Link>

            {/* SHOPPING CART / SHOPPING CART */}
            {authUser && router.route !== '/' ? <Cart /> : null}

            {authUser ? (
              <div>
              <Link href={ROUTE.SERVICES} as={ROUTE.SERVICES}>
                <Button variant="text" className={classes.linkStyle}>
                  Services
                </Button>
              </Link>
              <Link href={ROUTE.MY_PROFILE} as={ROUTE.MY_PROFILE}>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={() => {}}
                  color="inherit"
                >
                  <PersonIcon />
                </IconButton>
              </Link>
              </div>
            ) : (
              router.route !== ROUTE.LOGIN && (
                <Link href={ROUTE.LOGIN} as={ROUTE.LOGIN}>
                  <Button variant="contained" color="secondary">
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import CodeIcon from '@material-ui/icons/Code';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useHandleLight, useMode, useLoggedInUserId, useSetLoggedInUserId } from '../../hooks';
import { SIGN_OUT } from '../../lib/graphql/mutations';
import { signOut as SignOutData } from '../../lib/graphql/mutations/SignOut/__generated__/signOut';

export const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const loggedInUserId = useLoggedInUserId();
  const setLoggedInUserId = useSetLoggedInUserId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleLight = useHandleLight();
  const mode = useMode();
  const [signOut] = useMutation<SignOutData>(SIGN_OUT, {
    onCompleted: (data) => {
      if (data && data.signOut) {
        setLoggedInUserId(data.signOut);
        sessionStorage.removeItem("token");
      }
    }
  });

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLink = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
        <Container className={classes.nav}>
          <Link to="/" className="anchor">
            <Typography variant="h5" className={classes.title} color="secondary">
              <div style={{ display: "flex", alignItems: "center" }}>
                <CodeIcon color="secondary" fontSize="large"/> Codecamp
              </div>
            </Typography>
          </Link>
            <>
              <Link to="/bootcamps">
                <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
                  <LocationCityIcon color="secondary" fontSize="large"/>
                </IconButton>
              </Link>
              <Link to="/search">
                <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
                  <SearchIcon color="secondary" fontSize="large"/>
                </IconButton>
              </Link>
              <IconButton onClick={handleLight} edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
                { mode === "dark" ? (
                  <Brightness4Icon color="secondary" fontSize="large" />
                ) : (
                  <Brightness7Icon color="secondary" fontSize="large" />
                )}
              </IconButton>
            </>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
              >
                <AccountCircle color="secondary" fontSize="large"/>
              </IconButton>
              {loggedInUserId !== null ? (
                <>
                  <Menu
                    color="secondary"
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleLink}
                  >
                    <MenuItem onClick={() => handleLink('/profile')} color="secondary">Profile</MenuItem>
                    <MenuItem onClick={handleSignOut} color="secondary">Sign Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                <Menu
                  color="secondary"
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleLink}
                >
                  <MenuItem color="secondary" onClick={() => handleLink('/signin')}>Sign In</MenuItem>
                  <MenuItem color="secondary" onClick={() => handleLink('/signup')}>Sign Up</MenuItem>
                </Menu>
              </>
              )}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none'
    },
    nav: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }),
);

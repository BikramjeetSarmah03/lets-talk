import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { notify } from "redux/reducers/notificationReducer";
import { logoutUser } from "redux/reducers/userReducer";
import DesktopUserMenu from "../menus/DesktopUserMenu";
import MobileUserMenu from "../menus/MobileUserMenu";
import SearchBar from "./SearchBar";

import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RedditIcon from "@material-ui/icons/Reddit";
import SearchIcon from "@material-ui/icons/Search";
import { useNavStyles } from "styles/muiStyles";

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useNavStyles();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(notify(`u/${user.username} logged out`, "success"));
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar disableGutters={isMobile}>
        {!searchOpen && (
          <>
            <div className={classes.leftPortion}>
              <div className={classes.logoWrapper}>
                <Button
                  className={classes.logo}
                  color="primary"
                  component={RouterLink}
                  to="/"
                  startIcon={<RedditIcon fontSize="large" />}
                  size="large"
                >
                  Let's Talk
                </Button>
                <Typography variant="caption" color="secondary">
                  Made with <FavoriteIcon style={{ fontSize: 12 }} /> by
                  <Link
                    href={"https://github.com/bikramjeetSarmah03"}
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>{` bikramjeet`}</strong>
                  </Link>
                </Typography>
              </div>
              {!isMobile && <SearchBar />}
            </div>
            {isMobile ? (
              <>
                <IconButton
                  color="primary"
                  className={classes.searchBtn}
                  onClick={() => setSearchOpen((prevState) => !prevState)}
                >
                  <SearchIcon />
                </IconButton>
                <MobileUserMenu user={user} handleLogout={handleLogout} />
              </>
            ) : (
              <DesktopUserMenu user={user} handleLogout={handleLogout} />
            )}
          </>
        )}
        {searchOpen && isMobile && (
          <SearchBar isMobile={true} setSearchOpen={setSearchOpen} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

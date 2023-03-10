import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { notify } from "redux/reducers/notificationReducer";
import { toggleSubscribe } from "redux/reducers/subReducer";
import getErrorMsg from "utils/getErrorMsg";
import storageService from "utils/localStorage";
import LoadingSpinner from "../others/LoadingSpinner";
import SubFormModal from "./SubFormModal";

import {
  Button,
  Link,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { useSubPanelStyles } from "styles/muiStyles";

const TopSubsPanel = () => {
  const { subs, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down("md"));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = storageService.loadUser() || user;

  const loadingSubs = !subs || !subs.topSubs;

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy;

      if (subscribedBy.includes(user.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = subscribedBy.includes(user.id)
        ? `Unsubscribed from c/${subredditName}`
        : `Subscribed to c/${subredditName}!`;
      dispatch(notify(message, "success"));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
          Top Communities
        </Typography>
        {loadingSubs ? (
          <LoadingSpinner text="Fetching community data..." />
        ) : (
          subs.topSubs.map((s, i) => (
            <div key={s.id} className={classes.listWrapper}>
              <Typography variant="body2" className={classes.listItem}>
                {`${i + 1}. `}
                <Link
                  component={RouterLink}
                  to={`/c/${s.subredditName}`}
                  color="primary"
                >
                  c/{s.subredditName}
                </Link>
                {` - ${s.subscriberCount} members `}
              </Typography>
              {loggedUser && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={
                    isSubscribed(s.subscribedBy, user) ? (
                      <CheckIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
                  onClick={() =>
                    handleJoinSub(s.id, s.subscribedBy, s.subredditName)
                  }
                >
                  {isSubscribed(s.subscribedBy, user) ? "Joined" : "Join"}
                </Button>
              )}
            </div>
          ))
        )}
      </Paper>
      {loggedUser && <SubFormModal />}
    </Paper>
  );
};

export default TopSubsPanel;

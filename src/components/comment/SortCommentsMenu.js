import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortComments } from "redux/reducers/postCommentsReducer";

import { MenuItem, Select, Typography } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { useSortCommentsStyles } from "styles/muiStyles";

const SortCommentsMenu = () => {
  const classes = useSortCommentsStyles();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("old");

  const handleSortComments = (value) => {
    setSortBy(value);
    dispatch(sortComments(value));
  };

  return (
    <div className={classes.root}>
      <Typography variant="button" className={classes.label}>
        <SortIcon style={{ marginRight: "8px" }} color="primary" />
        Sort By
      </Typography>
      <form>
        <Select value={sortBy}>
          <MenuItem value="old" onClick={() => handleSortComments("old")}>
            Old
          </MenuItem>
          <MenuItem value="new" onClick={() => handleSortComments("new")}>
            New
          </MenuItem>
          <MenuItem
            value="upvoted"
            onClick={() => handleSortComments("upvoted")}
          >
            Most Upvoted
          </MenuItem>
          <MenuItem
            value="downvoted"
            onClick={() => handleSortComments("downvoted")}
          >
            Most Downvoted
          </MenuItem>
          <MenuItem
            value="replied"
            onClick={() => handleSortComments("replied")}
          >
            Most Replied
          </MenuItem>
        </Select>
      </form>
    </div>
  );
};

export default SortCommentsMenu;

import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlines,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friends from "../../components/Friends";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
  key,
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state)=>state.user._id);
  const isLiked  = Boolean(likes[loggedInUserId]);

  const { palette } = useTheme();
  const primmaryLight = palette.primary.light;
  const primmaryDark = palette.primary.dark;
  const main = palette.primary.main;
  const medium = palette.primary.medium;

  return <div>PostWidget</div>;
};

export default PostWidget;

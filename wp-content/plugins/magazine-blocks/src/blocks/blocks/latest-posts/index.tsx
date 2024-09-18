import React from "react";
import { Icon } from "../../components";
import "../assets/sass/blocks/latest-posts/style.scss";
import metadata from "./block.json";
import Edit from "./Edit";
export const name = metadata.name;

export const settings = {
	...metadata,
	icon: <Icon type="blockIcon" name="latestPosts" size={24} />,
	edit: Edit,
};

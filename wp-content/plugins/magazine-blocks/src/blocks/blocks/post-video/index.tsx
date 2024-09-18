import React from "react";
import { Icon } from "../../components";
import "../assets/sass/blocks/post-video/style.scss";
import attributes from "./attributes";
import metadata from "./block.json";
import Edit from "./Edit";

export const name = metadata.name;

export const settings = {
	...metadata,
	icon: <Icon type="blockIcon" name="postVideo" size={24} />,
	attributes,
	edit: Edit,
};

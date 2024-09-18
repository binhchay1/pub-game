import { Button, Flex, FlexItem } from "@wordpress/components";
import { useSelect, withSelect } from "@wordpress/data";
import { dateI18n, __experimentalGetSettings } from "@wordpress/date";
import { Fragment } from "@wordpress/element";
import { EditProps } from "blocks/types";
import classnames from "classnames";
import React from "react";

import { useBlockStyle } from "../../hooks";

import { useClientId, useCopyPasteStyles, useDeviceType } from "@blocks/hooks";

import { Icon } from "../../components";
import "../assets/sass/blocks/grid-module/style.scss";
import InspectorControls from "./components/InspectorControls";

interface Props extends EditProps<any> {
	categories: Array<any>;
	posts: Array<any>;
	tags: Array<any>;
	numberOfPosts: number;
	page: number;
	author: Array<any>;
}

const Edit: React.ComponentType<Props> = (props) => {
	const {
		posts,
		className,
		attributes: {
			hoverAnimation,

			layout,
			layout1AdvancedStyle,
			layout2AdvancedStyle,
			category,
			column,
			size,
			label,
			enableHeading,
			headingLayout,
			headingLayout1AdvancedStyle,
			headingLayout2AdvancedStyle,
			headingLayout3AdvancedStyle,
			postCount,
			enableCategory,

			metaPosition,
			enablePostTitle,
			enableAuthor,
			enableDate,

			excerptLimit,
			enableExcerpt,
			enableReadMore,
			readMoreText,

			enablePagination,

			hideOnDesktop,
		},
		setAttributes,
		categories,
		tags,
		numberOfPosts,
		page,
	} = props;

	const { clientId } = useClientId(props);
	const { deviceType } = useDeviceType();
	const { CopyPasterStyleBlockControl } = useCopyPasteStyles();
	const { Style } = useBlockStyle({
		blockName: "grid-module",
		clientId,
		attributes: props.attributes,
		deviceType,
	});

	// @ts-ignore
	const authors = useSelect((select) => {
		const { getUsers } = select("core") as any;
		return getUsers({ per_page: -1 });
	}) as any[];

	const authorOptions = authors
		? authors.map((author) => ({
				value: author.id.toString(),
				label: author.name,
		  }))
		: [];

	const classNames = classnames(
		`mzb-grid-module mzb-grid-module-${clientId}`,
		size && `is-${size}`,
		className,
		hideOnDesktop && "magazine-blocks-hide-on-desktop",
		`mzb-post-heading mzb-${headingLayout}`,
		{
			[`mzb-${headingLayout1AdvancedStyle}`]:
				headingLayout === `heading-layout-1`,
			[`mzb-${headingLayout2AdvancedStyle}`]:
				headingLayout === `heading-layout-2`,
			[`mzb-${headingLayout3AdvancedStyle}`]:
				headingLayout === `heading-layout-3`,
		}
	);

	const classNames2 = classnames(`mzb-posts mzb-post-col--${column || "4"}`);

	const NumberedPagination = ({
		totalPages,
		currentPage,
		onPageChange,
	}: {
		totalPages: number;
		currentPage: number;
		onPageChange: (val: number) => void;
	}) => {
		if (totalPages < 2) {
			return null; // Don't render pagination if there's only one page
		}

		const pages = Array.from(
			{ length: totalPages },
			(_, index) => index + 1
		);

		return (
			<Flex>
				{pages.map((page) => (
					<FlexItem key={page}>
						<Button
							isPrimary={page === currentPage}
							onClick={() => onPageChange(page)}
						>
							{page}
						</Button>
					</FlexItem>
				))}
			</Flex>
		);
	};

	// Fetch the next page of posts
	const loadMorePosts = (nextPage: number) => {
		// Update the block's attributes to trigger a re-render with the next page
		setAttributes({ page: nextPage });
	};

	// Render numbered pagination
	const pagination = (
		<NumberedPagination
			totalPages={Math.ceil(numberOfPosts / postCount)}
			currentPage={page}
			onPageChange={loadMorePosts}
		/>
	);

	const selectedCategory =
		"all" !== category
			? categories.find((cat) => cat.id === parseInt(category))
			: null;

	return (
		<Fragment>
			<InspectorControls
				attributes={props.attributes}
				setAttributes={setAttributes}
				categories={categories}
				tags={tags}
				authorOptions={authorOptions}
			/>
			<CopyPasterStyleBlockControl withBlockControls />
			<Style />
			<div className={classNames}>
				{enableHeading === true && (
					<div
						className={classnames(
							`mzb-post-heading`,
							`mzb-${layout}`,
							{
								[`mzb-${layout1AdvancedStyle}`]:
									layout === `layout-1`,
								[`mzb-${layout2AdvancedStyle}`]:
									layout === `layout-2`,
							}
						)}
					>
						<h2> {label} </h2>
					</div>
				)}
				{
					<div className={classNames2}>
						<Fragment>
							{(posts || []).map((post, idx) => {
								const maxWords = excerptLimit;
								const excerpt = post.excerpt.rendered
									.split(" ")
									.slice(0, maxWords)
									.join(" ");
								return (
									<div className={`mzb-post`} key={idx}>
										{post
											?.magazine_blocks_featured_image_url
											?.full?.[0] && (
											<div
												className={`mzb-featured-image ${hoverAnimation}`}
											>
												<img
													src={
														post
															.magazine_blocks_featured_image_url
															.full[0]
													}
												/>
											</div>
										)}

										{(enableDate ||
											enableAuthor ||
											enablePostTitle ||
											enableCategory) && (
											<>
												<div className="mzb-post-content">
													{enableCategory && (
														<div className="mzb-post-categories">
															<p>
																{selectedCategory
																	? selectedCategory.name
																	: ""}
															</p>
														</div>
													)}

													{metaPosition ===
														"bottom" && (
														<>
															{enablePostTitle ===
																true && (
																<h3 className="mzb-post-title">
																	<a
																		href={
																			post.link
																		}
																	>
																		{
																			post
																				.title
																				.rendered
																		}
																	</a>
																</h3>
															)}
															{(enableAuthor ||
																enableDate) && (
																<>
																	<div className="mzb-post-entry-meta">
																		{enableAuthor ===
																			true && (
																			<span className="mzb-post-author">
																				<img
																					className="author-display-image"
																					src={
																						post.magazine_blocks_author_image
																					}
																				/>
																				<a
																					href={
																						post
																							.magazine_blocks_author
																							.author_link
																					}
																				>
																					{" "}
																					{
																						post
																							.magazine_blocks_author
																							.display_name
																					}{" "}
																				</a>
																			</span>
																		)}

																		{enableDate ===
																			true && (
																			<span className="mzb-post-date">
																				<Icon
																					type="blockIcon"
																					name="calendar"
																					size={
																						24
																					}
																				/>
																				<a href="#">
																					{" "}
																					{dateI18n(
																						__experimentalGetSettings()
																							.formats
																							.date,
																						post.date_gmt,
																						undefined
																					)}{" "}
																				</a>
																			</span>
																		)}
																	</div>
																</>
															)}
														</>
													)}

													{metaPosition === "top" &&
														(enableAuthor ||
															enableDate) && (
															<>
																<div className="mzb-post-entry-meta">
																	{enableAuthor ===
																		true && (
																		<span className="mzb-post-author">
																			<img
																				className="author-display-image"
																				src={
																					post.magazine_blocks_author_image
																				}
																			/>
																			<a
																				href={
																					post
																						.magazine_blocks_author
																						.author_link
																				}
																			>
																				{" "}
																				{
																					post
																						.magazine_blocks_author
																						.display_name
																				}{" "}
																			</a>
																		</span>
																	)}

																	{enableDate ===
																		true && (
																		<span className="mzb-post-date">
																			<Icon
																				type="blockIcon"
																				name="calendar"
																				size={
																					24
																				}
																			/>
																			<a href="#">
																				{" "}
																				{dateI18n(
																					__experimentalGetSettings()
																						.formats
																						.date,
																					post.date_gmt,
																					undefined
																				)}{" "}
																			</a>
																		</span>
																	)}
																</div>

																{enablePostTitle ===
																	true && (
																	<h3 className="mzb-post-title">
																		<a
																			href={
																				post.link
																			}
																		>
																			{
																				post
																					.title
																					.rendered
																			}
																		</a>
																	</h3>
																)}
															</>
														)}

													{(enableExcerpt ||
														enableReadMore) && (
														<div className="mzb-entry-content">
															{enableExcerpt && (
																<div
																	className="mzb-entry-summary"
																	dangerouslySetInnerHTML={{
																		__html: excerpt,
																	}}
																/>
															)}
															{enableReadMore && (
																<div className="mzb-read-more">
																	<a
																		href={
																			post
																				.excerpt
																				.rendered
																		}
																	>
																		{
																			readMoreText
																		}
																	</a>
																</div>
															)}
														</div>
													)}
												</div>
											</>
										)}
									</div>
								);
							})}
							{enablePagination && (
								<div className="mzb-pagination-numbers">
									{pagination}
								</div>
							)}
						</Fragment>
					</div>
				}
			</div>
		</Fragment>
	);
};

// @ts-ignore
export default withSelect((select, props) => {
	const { getEntityRecords } = select("core");
	const {
		attributes: {
			category,
			tag,
			order,
			postCount,
			orderBy,
			orderType,
			authorName,
			excludedCategory,
			page,
		},
	} = props;
	const query = {
		order,
	};

	return {
		posts: getEntityRecords("postType", "post", {
			...query,
			categories: "all" === category ? undefined : parseInt(category),
			tags: "all" === tag ? undefined : tag,
			per_page: postCount,
			page,
			orderby: orderBy,
			order: orderType,
			author: authorName,
			categories_exclude: "" === excludedCategory ? [] : excludedCategory,
		}),
		numberOfPosts:
			getEntityRecords("postType", "post", {
				per_page: -1,
				categories: "all" === category ? undefined : parseInt(category),
			})?.length || 0,
		categories:
			getEntityRecords("taxonomy", "category", { per_page: -1 }) || [],
		tags: getEntityRecords("taxonomy", "post_tag", { per_page: -1 }) || [],
	};
})(Edit);

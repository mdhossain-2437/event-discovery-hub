import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const Blog = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Set page title
	useEffect(() => {
		document.title = "Blog - Event Explorer";
	}, []);

	// Simple useEffect to refresh animations
	useEffect(() => {
		if (window.AOS) {
			window.AOS.refresh();
		}
	}, []);

	// State for search term
	const [searchTerm, setSearchTerm] = useState("");

	// State for blog data
	const [blogData, setBlogData] = useState({ blogs: [] });
	const [isLoading, setIsLoading] = useState(true);

	// Load blog data
	useEffect(() => {
		const fetchBlogData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/data/blogs.json");
				const data = await response.json();
				setBlogData(data);
			} catch (error) {
				console.error("Failed to load blogs.json", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBlogData();
	}, []);

	// Get page from URL query params
	const queryParams = new URLSearchParams(location.search);
	const pageParam = queryParams.get("page");
	const [currentPage, setCurrentPage] = useState(
		pageParam ? parseInt(pageParam, 10) : 1
	);

	// Number of posts per page
	const POSTS_PER_PAGE = 6;

	// Load blog posts from blogs.json
	const blogPosts = blogData.blogs;

	// Get all unique categories for filtering
	const categories = Array.from(
		new Set(blogPosts.map((post) => post.category))
	);

	// Use memoization to prevent unnecessary recalculation on each render
	const memoizedCategories = React.useMemo(() => categories, [categories]);

	// State for active filter category
	const [activeCategory, setActiveCategory] = useState(null);

	// Featured blog post (for each page)
	const featuredPost = React.useMemo(() => {
		// Rotate featured posts based on page number
		const featuredPostIds = [17, 12, 8, 5];
		const pageIndex = (currentPage - 1) % featuredPostIds.length;
		const featuredId = featuredPostIds[pageIndex];
		return blogPosts.find((post) => post.id === featuredId);
	}, [blogPosts, currentPage]);

	// Filter posts based on category and search term
	const filteredPosts = React.useMemo(() => {
		let filtered = blogPosts;

		// Apply category filter
		if (activeCategory) {
			filtered = filtered.filter((post) => post.category === activeCategory);
		}

		// Apply search filter (if search term exists)
		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(term) ||
					post.excerpt.toLowerCase().includes(term) ||
					post.author.toLowerCase().includes(term) ||
					post.category.toLowerCase().includes(term)
			);
		}

		return filtered;
	}, [activeCategory, searchTerm, blogPosts]);

	// Navigate to blog detail page
	const handleReadMore = (postId) => {
		navigate(`/blog/${postId}`);
	};

	return (
		<div className="min-h-screen py-4 md:py-8 lg:py-12">
			<div className="px-4 md:px-8 lg:px-[75px]">
				{/* Hero section */}
				<div
					className="glass-dark rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden"
					data-aos="fade-up"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-700/80 z-0"></div>
					<div className="absolute inset-0 opacity-20 z-0 bg-[url('https://images.unsplash.com/photo-1522158637959-30ab5e1e76b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-center bg-cover"></div>

					<div className="relative z-10 max-w-3xl">
						<h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
							Event <span className="gradient-text">Explorer</span> Blog
						</h1>
						<p className="text-xl text-gray-100 mb-6">
							Discover the latest trends, tips, and stories from the exciting
							world of events
						</p>
						<div className="flex flex-wrap gap-3">
							<button
								onClick={() => setActiveCategory(null)}
								className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition"
							>
								<i className="f-search mr-2"></i> Browse All
							</button>
							<button
								onClick={() => setSearchTerm("featured")}
								className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition"
							>
								<i className="f-star mr-2"></i> Featured Articles
							</button>
						</div>
					</div>
				</div>

				{/* Category filter tabs */}
				<div className="mb-8 overflow-x-auto pb-2" data-aos="fade-up">
					<div className="flex space-x-3 min-w-max">
						<button
							onClick={() => setActiveCategory(null)}
							className={`px-4 py-2 rounded-full transition-all ${
								activeCategory === null
									? "bg-primary text-white"
									: "bg-dark-light text-gray-300 hover:bg-gray-800"
							}`}
						>
							All Categories
						</button>
						{memoizedCategories.map((category) => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-4 py-2 rounded-full transition-all ${
									activeCategory === category
										? "bg-primary text-white"
										: "bg-dark-light text-gray-300 hover:bg-gray-800"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Search and sort bar */}
				<div
					className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 glass-dark p-4 rounded-xl"
					data-aos="fade-up"
				>
					<div className="flex items-center gap-2 relative w-full sm:w-auto">
						<span className="absolute left-3 text-gray-400">
							<i className="f-search"></i>
						</span>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search articles..."
							className="pl-10 pr-4 py-2 w-full sm:w-60 md:w-80 bg-dark-light/60 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
						/>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm("")}
								className="absolute right-3 text-gray-400 hover:text-white"
							>
								<i className="f-times"></i>
							</button>
						)}
					</div>
					<div className="flex items-center w-full sm:w-auto">
						<span className="text-gray-400 mr-2">Sort by:</span>
						<select className="bg-dark-light/60 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary">
							<option>Latest</option>
							<option>Popular</option>
							<option>Trending</option>
						</select>
					</div>
				</div>

				{/* Featured post */}
				{!activeCategory && !searchTerm && featuredPost && (
					<div
						className="mb-12 glass rounded-xl overflow-hidden"
						data-aos="fade-up"
						data-aos-once="true"
					>
						<div className="grid md:grid-cols-2">
							<div className="h-64 md:h-auto">
								<img
									src={featuredPost.image}
									alt={featuredPost.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-6 md:p-8 flex flex-col justify-center">
								<div className="mb-4 flex items-center">
									<span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
										Featured
									</span>
									<span className="ml-4 text-gray-400 text-sm">
										{featuredPost.date}
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-bold mb-4">
									{featuredPost.title}
								</h2>
								<p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
								<div className="flex items-center justify-between mt-auto">
									<div className="flex items-center">
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-3 overflow-hidden flex items-center justify-center text-white font-bold">
											{featuredPost.author
												.split(" ")
												.map((name) => name[0])
												.join("")}
										</div>
										<span className="text-sm">By {featuredPost.author}</span>
									</div>
									<button
										onClick={() => handleReadMore(featuredPost.id)}
										className="text-primary hover:text-primary/80 font-medium transition flex items-center"
									>
										Read Article <i className="f-arrow-right ml-2"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Blog post grid with pagination */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredPosts.length > 0 ? (
						// Apply pagination to the filtered posts
						filteredPosts
							.slice(
								(currentPage - 1) * POSTS_PER_PAGE,
								currentPage * POSTS_PER_PAGE
							)
							.map((post) => (
								<div
									key={post.id}
									className="glass rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
									data-aos="fade-up"
									data-aos-delay={(post.id % 6) * 50}
									data-aos-once="true"
								>
									<div className="h-48 overflow-hidden">
										<img
											src={post.image}
											alt={post.title}
											className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
										/>
									</div>
									<div className="p-6">
										<div className="flex items-center justify-between mb-4">
											<span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
												{post.category}
											</span>
											<span className="text-xs text-gray-400">
												{post.readTime || "5 min read"}
											</span>
										</div>
										<h3 className="text-xl font-bold mb-2 line-clamp-2">
											{post.title}
										</h3>
										<p className="text-gray-300 mb-4 line-clamp-3">
											{post.excerpt}
										</p>
										<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
											<span className="text-sm text-gray-400">
												By {post.author}
											</span>
											<button
												onClick={() => handleReadMore(post.id)}
												className="text-primary hover:text-primary/80 transition flex items-center"
											>
												Read More <i className="f-arrow-right ml-1"></i>
											</button>
										</div>
									</div>
								</div>
							))
					) : (
						<div className="col-span-3 text-center py-12">
							<div className="glass-dark rounded-xl p-8">
								<i className="f-search text-4xl text-gray-500 mb-4"></i>
								<h3 className="text-xl font-bold mb-2">No Results Found</h3>
								<p className="text-gray-400 mb-4">
									We couldn't find any blog posts matching your search criteria.
								</p>
								<button
									onClick={() => {
										setSearchTerm("");
										setActiveCategory(null);
										setCurrentPage(1);
										navigate("/blog");
									}}
									className="px-6 py-2 bg-primary hover:bg-primary/80 rounded-lg font-medium transition"
								>
									Reset Filters
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Pagination controls */}
				{filteredPosts.length > POSTS_PER_PAGE && (
					<div className="flex justify-center mt-12">
						<div className="flex items-center space-x-2" data-aos="fade-up">
							{/* Previous page button */}
							<button
								onClick={() => {
									if (currentPage > 1) {
										setCurrentPage(currentPage - 1);
										navigate(`/blog?page=${currentPage - 1}`);
										window.scrollTo(0, 0);
									}
								}}
								className={`w-10 h-10 rounded-lg glass flex items-center justify-center ${
									currentPage === 1
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-gray-800"
								}`}
								disabled={currentPage === 1}
							>
								<i className="f-chevron-left"></i>
							</button>

							{/* Generate page buttons */}
							{Array.from({
								length: Math.min(
									5,
									Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
								),
							}).map((_, index) => {
								// Logic to show correct page numbers around current page
								let pageNum = index + 1;
								const totalPages = Math.ceil(
									filteredPosts.length / POSTS_PER_PAGE
								);

								if (totalPages > 5) {
									// More complex pagination for many pages
									if (currentPage > 3 && currentPage < totalPages - 1) {
										// Middle range= currentPage - 2 + index;
										if (index === 0)
											return (
												<button
													key={1}
													onClick={() => {
														setCurrentPage(1);
														navigate("/blog?page=1");
														window.scrollTo(0, 0);
													}}
													className={`w-10 h-10 rounded-lg ${
														currentPage === 1
															? "bg-primary text-white"
															: "glass hover:bg-gray-800"
													} flex items-center justify-center`}
												>
													1
												</button>
											);
										if (index === 1)
											return (
												<span key="dots1" className="px-2">
													...
												</span>
											);
										if (index === 3)
											return (
												<span key="dots2" className="px-2">
													...
												</span>
											);
										if (index === 4)
											return (
												<button
													key={totalPages}
													onClick={() => {
														setCurrentPage(totalPages);
														navigate(`/blog?page=${totalPages}`);
														window.scrollTo(0, 0);
													}}
													className={`w-10 h-10 rounded-lg ${
														currentPage === totalPages
															? "bg-primary text-white"
															: "glass hover:bg-gray-800"
													} flex items-center justify-center`}
												>
													{totalPages}
												</button>
											);
										if (index === 2) pageNum = currentPage;
									} else if (currentPage <= 3) {
										// Near beginning
										pageNum = index + 1;
										if (index === 4)
											return (
												<button
													key={totalPages}
													onClick={() => {
														setCurrentPage(totalPages);
														navigate(`/blog?page=${totalPages}`);
														window.scrollTo(0, 0);
													}}
													className="w-10 h-10 rounded-lg glass hover:bg-gray-800 flex items-center justify-center"
												>
													{totalPages}
												</button>
											);
										if (index === 3)
											return (
												<span key="dots" className="px-2">
													...
												</span>
											);
									} else {
										// Near end
										pageNum = totalPages - 4 + index;
										if (index === 0)
											return (
												<button
													key={1}
													onClick={() => {
														setCurrentPage(1);
														navigate("/blog?page=1");
														window.scrollTo(0, 0);
													}}
													className="w-10 h-10 rounded-lg glass hover:bg-gray-800 flex items-center justify-center"
												>
													1
												</button>
											);
										if (index === 1)
											return (
												<span key="dots" className="px-2">
													...
												</span>
											);
									}
								}

								return (
									<button
										key={pageNum}
										onClick={() => {
											setCurrentPage(pageNum);
											navigate(`/blog?page=${pageNum}`);
											window.scrollTo(0, 0);
										}}
										className={`w-10 h-10 rounded-lg ${
											currentPage === pageNum
												? "bg-primary text-white"
												: "glass hover:bg-gray-800"
										} flex items-center justify-center`}
									>
										{pageNum}
									</button>
								);
							})}

							{/* Next page button */}
							<button
								onClick={() => {
									const totalPages = Math.ceil(
										filteredPosts.length / POSTS_PER_PAGE
									);
									if (currentPage < totalPages) {
										setCurrentPage(currentPage + 1);
										navigate(`/blog?page=${currentPage + 1}`);
										window.scrollTo(0, 0);
									}
								}}
								className={`w-10 h-10 rounded-lg glass flex items-center justify-center ${
									currentPage ===
									Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-gray-800"
								}`}
								disabled={
									currentPage ===
									Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
								}
							>
								<i className="f-chevron-right"></i>
							</button>
						</div>
					</div>
				)}

				{/* Newsletter subscription */}
				<div
					className="mt-20 glass-dark rounded-xl p-8 text-center"
					data-aos="fade-up"
					data-aos-once="true"
				>
					<h2 className="text-2xl md:text-3xl font-bold mb-4">
						Stay Updated with Event Explorer
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto mb-6">
						Get exclusive event tips, upcoming festivals, and early access to
						ticket sales delivered directly to your inbox.
					</p>
					<form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
						<input
							type="email"
							placeholder="Your email address"
							className="flex-grow px-5 py-3 rounded-lg glass-dark border border-gray-700 focus:border-primary focus:outline-none"
						/>
						<button
							type="submit"
							className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition"
						>
							Subscribe
						</button>
					</form>
					<p className="text-xs text-gray-400 mt-4">
						We respect your privacy. Unsubscribe at any time.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Blog;

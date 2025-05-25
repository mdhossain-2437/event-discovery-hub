import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const BlogDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [relatedPosts, setRelatedPosts] = useState([]);
	const [blogData, setBlogData] = useState({ blogs: [] });

	// Load blog data
	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const response = await fetch("/data/blogs.json");
				const data = await response.json();
				setBlogData(data);
			} catch (error) {
				console.error("Failed to load blogs.json", error);
			}
		};
		fetchBlogData();
	}, []);

	// Find the blog post with the given ID
	useEffect(() => {
		if (id && blogData.blogs.length > 0) {
			const blogId = parseInt(id);
			const foundBlog = blogData.blogs.find((post) => post.id === blogId);

			if (foundBlog) {
				setBlog(foundBlog);
				// Set page title
				document.title = `${foundBlog.title} - Event Explorer`;

				// Find related posts (same category)
				const related = blogData.blogs
					.filter(
						(post) => post.category === foundBlog.category && post.id !== blogId
					)
					.slice(0, 3);
				setRelatedPosts(related);
			}
			setLoading(false);

			// Refresh AOS animations
			if (window.AOS) {
				setTimeout(() => {
					window.AOS.refresh();
				}, 200);
			}
		}
	}, [id, blogData]);

	// Handle "go back" click
	const handleGoBack = () => {
		navigate("/blog");
	};

	// Navigate to related post
	const navigateToPost = (postId) => {
		navigate(`/blog/${postId}`);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center max-w-md glass-dark p-8 rounded-xl">
					<div className="text-5xl mb-4">😕</div>
					<h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
					<p className="text-gray-300 mb-6">
						The blog post you are looking for doesn't exist or has been removed.
					</p>
					<button
						onClick={handleGoBack}
						className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition"
					>
						Go Back to Blog
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-4 md:py-8 lg:py-12">
			<div className="px-4 md:px-8 lg:px-[125px]">
				{/* Breadcrumb navigation */}
				<div className="mb-6 flex items-center text-sm text-gray-400">
					<button
						onClick={handleGoBack}
						className="hover:text-white transition"
					>
						Blog
					</button>
					<span className="mx-2">/</span>
					<span className="text-gray-300">{blog.category}</span>
					<span className="mx-2">/</span>
					<span className="text-white truncate max-w-[200px]">
						{blog.title}
					</span>
				</div>

				{/* Blog header */}
				<div className="mb-10" data-aos="fade-up">
					<h1 className="text-3xl md:text-5xl font-bold mb-6">{blog.title}</h1>
					<div className="flex flex-wrap items-center gap-4 mb-8">
						<div className="flex items-center">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-3 overflow-hidden flex items-center justify-center text-white font-bold">
								{blog.author
									.split(" ")
									.map((name) => name[0])
									.join("")}
							</div>
							<div>
								<div className="font-medium">{blog.author}</div>
								<div className="text-sm text-gray-400">{blog.date}</div>
							</div>
						</div>
						<div className="flex items-center gap-4 ml-auto">
							<span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
								{blog.category}
							</span>
							<span className="text-sm text-gray-400">
								{blog.readTime || "5 min read"}
							</span>
						</div>
					</div>
				</div>

				{/* Featured image */}
				<div className="mb-10 rounded-2xl overflow-hidden" data-aos="fade-up">
					<img
						src={blog.image}
						alt={blog.title}
						className="w-full h-auto object-cover max-h-[500px]"
					/>
				</div>

				{/* Blog content */}
				<div className="grid grid-cols-12 gap-8">
					{/* Main content */}
					<div className="col-span-12 lg:col-span-8">
						<div
							className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-a:text-primary"
							dangerouslySetInnerHTML={{ __html: blog.content }}
							data-aos="fade-up"
						/>

						{/* Tags */}
						<div
							className="mt-10 pt-6 border-t border-gray-800"
							data-aos="fade-up"
						>
							<div className="flex flex-wrap gap-2">
								<span className="text-gray-400">Tags:</span>
								<span className="bg-dark-light text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer">
									{blog.category}
								</span>
								<span className="bg-dark-light text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer">
									Events
								</span>
								<span className="bg-dark-light text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer">
									Guide
								</span>
							</div>
						</div>

						{/* Share buttons */}
						<div className="mt-6 flex flex-wrap gap-4" data-aos="fade-up">
							<button className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition">
								<i className="fab fa-facebook-f"></i>
								<span>Share</span>
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition">
								<i className="fab fa-twitter"></i>
								<span>Tweet</span>
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition">
								<i className="fab fa-linkedin-in"></i>
								<span>Share</span>
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-dark-light text-white rounded-lg hover:bg-gray-800 transition ml-auto">
								<i className="f-link"></i>
								<span>Copy Link</span>
							</button>
						</div>

						{/* Author bio */}
						<div className="mt-10 glass-dark p-6 rounded-xl" data-aos="fade-up">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
									{blog.author
										.split(" ")
										.map((name) => name[0])
										.join("")}
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold mb-2">
										About {blog.author}
									</h3>
									<p className="text-gray-300 mb-4">
										{blog.author} is an experienced writer and event specialist
										with a passion for creating memorable experiences. With
										years of expertise in the field, they share insights and
										advice to help readers discover and enjoy the best events
										around the world.
									</p>
									<div className="flex gap-3">
										<a
											href="#"
											className="text-gray-400 hover:text-primary transition"
										>
											<i className="fab fa-twitter"></i>
										</a>
										<a
											href="#"
											className="text-gray-400 hover:text-primary transition"
										>
											<i className="fab fa-linkedin-in"></i>
										</a>
										<a
											href="#"
											className="text-gray-400 hover:text-primary transition"
										>
											<i className="fab fa-instagram"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="col-span-12 lg:col-span-4">
						{/* Related posts */}
						<div className="glass-dark p-6 rounded-xl mb-8" data-aos="fade-up">
							<h3 className="text-xl font-bold mb-4">Related Posts</h3>
							<div className="space-y-4">
								{relatedPosts.length > 0 ? (
									relatedPosts.map((post) => (
										<div
											key={post.id}
											className="flex gap-3 group cursor-pointer"
											onClick={() => navigateToPost(post.id)}
										>
											<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
												<img
													src={post.image}
													alt={post.title}
													className="w-full h-full object-cover transition group-hover:scale-110"
												/>
											</div>
											<div>
												<h4 className="font-medium line-clamp-2 group-hover:text-primary transition">
													{post.title}
												</h4>
												<div className="text-xs text-gray-400 mt-1">
													{post.date}
												</div>
											</div>
										</div>
									))
								) : (
									<div className="text-gray-400 text-center py-6">
										No related posts found
									</div>
								)}
							</div>
						</div>

						{/* Categories */}
						<div className="glass-dark p-6 rounded-xl mb-8" data-aos="fade-up">
							<h3 className="text-xl font-bold mb-4">Categories</h3>
							<div className="space-y-2">
								{Array.from(
									new Set(blogData.blogs.map((post) => post.category))
								).map((category) => (
									<div
										key={category}
										className="flex items-center justify-between p-3 rounded-lg hover:bg-dark-light transition cursor-pointer"
										onClick={() => navigate("/blog")}
									>
										<span>{category}</span>
										<span className="bg-dark-light px-2 py-1 rounded-full text-xs">
											{
												blogData.blogs.filter(
													(post) => post.category === category
												).length
											}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Newsletter */}
						<div className="glass-dark p-6 rounded-xl" data-aos="fade-up">
							<h3 className="text-xl font-bold mb-4">
								Subscribe to Newsletter
							</h3>
							<p className="text-gray-300 mb-4">
								Get the latest posts and updates delivered directly to your
								inbox.
							</p>
							<form className="space-y-3">
								<input
									type="email"
									placeholder="Your email address"
									className="w-full px-4 py-3 rounded-lg glass-dark border border-gray-700 focus:border-primary focus:outline-none"
								/>
								<button
									type="submit"
									className="w-full px-4 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition"
								>
									Subscribe
								</button>
							</form>
							<div className="text-xs text-gray-400 mt-3">
								We respect your privacy. Unsubscribe at any time.
							</div>
						</div>
					</div>
				</div>

				{/* Back to top button */}
				<div className="fixed bottom-8 right-8">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition"
					>
						<i className="f-arrow-up"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogDetail;

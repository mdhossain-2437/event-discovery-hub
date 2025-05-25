import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Initialize Swiper with modules
Swiper.use([Navigation, Pagination, Autoplay]);

// Slide data
const slides = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080",
		title:
			'Find Your Next <span class="gradient-text">Unforgettable</span> Experience',
		subtitle:
			"Discover exciting events happening in your city. From music concerts to tech conferences, we've got you covered.",
		primaryButton: {
			text: "Explore Events",
			link: "/all-events",
			color: "bg-primary hover:bg-primary/80",
		},
		secondaryButton: {
			text: "How It Works",
			link: "/about",
			icon: "fas fa-play",
		},
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080",
		title: 'Connect With <span class="gradient-text">Industry</span> Leaders',
		subtitle:
			"Attend workshops, conferences, and networking events that help you grow professionally.",
		primaryButton: {
			text: "Tech Events",
			link: "/all-events?category=Technology",
			color: "bg-secondary hover:bg-secondary/80",
		},
		secondaryButton: {
			text: "View Calendar",
			link: "/all-events",
			icon: "fas fa-calendar-alt",
		},
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080",
		title: 'Experience <span class="gradient-text">Creative</span> Inspiration',
		subtitle:
			"Immerse yourself in the local art scene with exhibitions, performances, and interactive installations.",
		primaryButton: {
			text: "Art Events",
			link: "/all-events?category=Art",
			color: "bg-accent hover:bg-accent/80",
		},
		secondaryButton: {
			text: "Nearby Venues",
			link: "/all-events",
			icon: "fas fa-map-marker-alt",
		},
	},
];

const Slider = () => {
	const swiperRef = useRef(null);

	useEffect(() => {
		if (!swiperRef.current) return;

		const swiper = new Swiper(swiperRef.current, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});

		// Cleanup swiper instance on component unmount
		return () => {
			swiper.destroy();
		};
	}, []);

	return (
		<div className="relative">
			<div className="swiper" ref={swiperRef}>
				<div className="swiper-wrapper">
					{slides.map((slide) => (
						<div
							key={slide.id}
							className="swiper-slide relative h-[500px] md:h-[600px]"
						>
							<div
								className="absolute inset-0 bg-cover bg-center filter brightness-50"
								style={{ backgroundImage: `url('${slide.image}')` }}
							></div>
							<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
							<div className="px-[75px] h-full flex items-center relative z-10">
								<div className="max-w-3xl lg:max-w-2xl xl:max-w-3xl">
									<h1
										className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-4"
										dangerouslySetInnerHTML={{ __html: slide.title }}
									></h1>
									<p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8">
										{slide.subtitle}
									</p>
									<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
										<Link
											to={slide.primaryButton.link}
											className={`px-6 sm:px-8 py-3 ${slide.primaryButton.color} rounded-lg font-bold transition duration-300 shadow-lg neon-button text-center`}
										>
											{slide.primaryButton.text}
										</Link>
										<Link
											to={slide.secondaryButton.link}
											className="px-6 sm:px-8 py-3 glass hover:bg-dark-light rounded-lg font-bold transition duration-300 text-center"
										>
											<i className={`${slide.secondaryButton.icon} mr-2`}></i>{" "}
											{slide.secondaryButton.text}
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="swiper-pagination"></div>

				{/* Navigation buttons */}
				<div className="swiper-button-next"></div>
				<div className="swiper-button-prev"></div>
			</div>
		</div>
	);
};

export default Slider;

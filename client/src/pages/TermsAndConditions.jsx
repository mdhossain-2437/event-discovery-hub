import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const TermsAndConditions = () => {
	// Set page title
	useTitle("Terms & Conditions");

	// Initialize animation on component mount
	useEffect(() => {
		if (window.AOS) {
			window.AOS.refresh();
		}
	}, []);

	return (
		<div className="bg-dark min-h-screen">
			<div className="container mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
				{/* Header Section */}
				<div className="text-center mb-12" data-aos="fade-up">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading">
						Terms & <span className="gradient-text">Conditions</span>
					</h1>
					<p className="text-gray-400 max-w-3xl mx-auto">
						Please read these terms and conditions carefully before using our
						service.
					</p>
				</div>

				{/* Main Content */}
				<div
					className="glass-dark rounded-xl p-6 sm:p-8 md:p-10 mb-10"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					<div className="space-y-8">
						{/* Introduction */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								1. Introduction
							</h2>
							<p className="text-gray-300 mb-4">
								Welcome to Event Explorer. These Terms and Conditions govern
								your use of our website and services. By accessing or using our
								platform, you agree to be bound by these Terms.
							</p>
							<p className="text-gray-300">
								If you disagree with any part of these terms, you may not access
								our service. We reserve the right to modify these terms at any
								time, and such modifications shall be effective immediately upon
								posting on this website.
							</p>
						</section>

						{/* User Accounts */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								2. User Accounts
							</h2>
							<p className="text-gray-300 mb-4">
								When you create an account with us, you must provide accurate,
								complete, and current information. Failure to do so constitutes
								a breach of the Terms, which may result in immediate termination
								of your account.
							</p>
							<p className="text-gray-300 mb-4">
								You are responsible for safeguarding the password that you use
								to access the service and for any activities or actions under
								your password. We encourage you to use "strong" passwords
								(passwords that use a combination of upper and lower case
								letters, numbers, and symbols) with your account.
							</p>
							<p className="text-gray-300">
								You agree not to disclose your password to any third party. You
								must notify us immediately upon becoming aware of any breach of
								security or unauthorized use of your account.
							</p>
						</section>

						{/* Event Listings */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								3. Event Listings
							</h2>
							<p className="text-gray-300 mb-4">
								Event Explorer provides a platform for users to discover and
								explore events. We do not guarantee the accuracy, completeness,
								or quality of any events listed on our platform.
							</p>
							<p className="text-gray-300 mb-4">
								Event organizers are solely responsible for the information they
								provide about their events, including but not limited to dates,
								times, locations, prices, and descriptions.
							</p>
							<p className="text-gray-300">
								We reserve the right to remove any event listing from our
								platform at our sole discretion, without prior notice.
							</p>
						</section>

						{/* Intellectual Property */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								4. Intellectual Property
							</h2>
							<p className="text-gray-300 mb-4">
								The Service and its original content, features, and
								functionality are and will remain the exclusive property of
								Event Explorer and its licensors. The Service is protected by
								copyright, trademark, and other laws.
							</p>
							<p className="text-gray-300">
								Our trademarks and trade dress may not be used in connection
								with any product or service without the prior written consent of
								Event Explorer.
							</p>
						</section>

						{/* User Content */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								5. User Content
							</h2>
							<p className="text-gray-300 mb-4">
								Our Service allows you to post, link, store, share and otherwise
								make available certain information, text, graphics, videos, or
								other material. You are responsible for the content that you
								post to the Service, including its legality, reliability, and
								appropriateness.
							</p>
							<p className="text-gray-300 mb-4">
								By posting content to the Service, you grant us the right to
								use, modify, publicly perform, publicly display, reproduce, and
								distribute such content on and through the Service. You retain
								any and all of your rights to any content you submit, post or
								display on or through the Service and you are responsible for
								protecting those rights.
							</p>
							<p className="text-gray-300">
								You represent and warrant that: (i) the content is yours or you
								have the right to use it and grant us the rights and license as
								provided in these Terms, and (ii) the posting of your content on
								or through the Service does not violate the privacy rights,
								publicity rights, copyrights, contract rights or any other
								rights of any person.
							</p>
						</section>

						{/* Limitation of Liability */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								6. Limitation of Liability
							</h2>
							<p className="text-gray-300 mb-4">
								In no event shall Event Explorer, nor its directors, employees,
								partners, agents, suppliers, or affiliates, be liable for any
								indirect, incidental, special, consequential or punitive
								damages, including without limitation, loss of profits, data,
								use, goodwill, or other intangible losses, resulting from your
								access to or use of or inability to access or use the Service.
							</p>
							<p className="text-gray-300">
								Event Explorer assumes no responsibility for errors or omissions
								in the contents on the Service, including event listings, user
								content, or any other information provided through the Service.
							</p>
						</section>

						{/* Governing Law */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								7. Governing Law
							</h2>
							<p className="text-gray-300 mb-4">
								These Terms shall be governed and construed in accordance with
								the laws of Bangladesh, without regard to its conflict of law
								provisions.
							</p>
							<p className="text-gray-300">
								Our failure to enforce any right or provision of these Terms
								will not be considered a waiver of those rights. If any
								provision of these Terms is held to be invalid or unenforceable
								by a court, the remaining provisions of these Terms will remain
								in effect.
							</p>
						</section>

						{/* Contact Us */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								8. Contact Us
							</h2>
							<p className="text-gray-300 mb-4">
								If you have any questions about these Terms, please contact us
								at:
							</p>
							<ul className="text-gray-300 list-disc pl-6">
								<li>Email: info@eventexplorer.com</li>
								<li>Phone: +880 123 456 7890</li>
								<li>Address: 123 Event Street, Dhaka, Bangladesh</li>
							</ul>
						</section>
					</div>
				</div>

				{/* Back to Home Button */}
				<div className="text-center" data-aos="fade-up" data-aos-delay="200">
					<Link
						to="/"
						className="inline-block px-8 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 shadow-lg neon-button"
					>
						<i className="f-home mr-2"></i> Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TermsAndConditions;

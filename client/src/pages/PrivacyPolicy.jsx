import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const PrivacyPolicy = () => {
	// Set page title
	useTitle("Privacy Policy");

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
						Privacy <span className="gradient-text">Policy</span>
					</h1>
					<p className="text-gray-400 max-w-3xl mx-auto">
						Your privacy is important to us. This Privacy Policy explains how we
						collect, use, disclose, and safeguard your information.
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
								Event Explorer ("we", "our", or "us") is committed to protecting
								your privacy. This Privacy Policy explains how we collect, use,
								and share information about you when you use our website, mobile
								applications, and other online products and services
								(collectively, the "Services").
							</p>
							<p className="text-gray-300">
								By using our Services, you agree to the collection, use, and
								sharing of your information as described in this Privacy Policy.
								If you do not agree with our policies and practices, do not use
								our Services.
							</p>
						</section>

						{/* Information We Collect */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								2. Information We Collect
							</h2>
							<p className="text-gray-300 mb-4">
								We collect several types of information from and about users of
								our Services, including:
							</p>
							<ul className="text-gray-300 list-disc pl-6 space-y-2 mb-4">
								<li>
									<strong>Personal Information:</strong> This includes
									information that can be used to identify you, such as your
									name, email address, postal address, phone number, and other
									identifiers.
								</li>
								<li>
									<strong>Account Information:</strong> When you create an
									account, we collect your username, password, and other
									registration information.
								</li>
								<li>
									<strong>Profile Information:</strong> This includes your
									preferences, interests, and any other information you choose
									to provide in your user profile.
								</li>
								<li>
									<strong>Transaction Information:</strong> If you make a
									purchase through our Services, we collect information about
									the transaction, such as the event details, purchase amount,
									and payment information.
								</li>
								<li>
									<strong>Usage Information:</strong> We collect information
									about how you use our Services, such as the pages you visit,
									the time and duration of your visits, and the links you click.
								</li>
								<li>
									<strong>Device Information:</strong> We collect information
									about the device you use to access our Services, including the
									hardware model, operating system, unique device identifiers,
									and mobile network information.
								</li>
								<li>
									<strong>Location Information:</strong> With your consent, we
									may collect information about your precise location to provide
									location-based services.
								</li>
							</ul>
							<p className="text-gray-300">
								We collect this information directly from you when you provide
								it to us, automatically as you navigate through our Services,
								and from third parties, such as our business partners and other
								third parties that provide us with services.
							</p>
						</section>

						{/* How We Use Your Information */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								3. How We Use Your Information
							</h2>
							<p className="text-gray-300 mb-4">
								We use the information we collect about you for various
								purposes, including to:
							</p>
							<ul className="text-gray-300 list-disc pl-6 space-y-2 mb-4">
								<li>Provide, maintain, and improve our Services</li>
								<li>
									Process transactions and send related information, including
									confirmations and receipts
								</li>
								<li>
									Send you technical notices, updates, security alerts, and
									support and administrative messages
								</li>
								<li>Respond to your comments, questions, and requests</li>
								<li>
									Communicate with you about products, services, offers,
									promotions, and events, and provide other news or information
									about us and our partners
								</li>
								<li>
									Monitor and analyze trends, usage, and activities in
									connection with our Services
								</li>
								<li>
									Detect, investigate, and prevent fraudulent transactions and
									other illegal activities and protect the rights and property
									of Event Explorer and others
								</li>
								<li>
									Personalize and improve the Services and provide content or
									features that match user profiles or interests
								</li>
							</ul>
							<p className="text-gray-300">
								We may combine information we collect about you with information
								we receive from third parties to help us improve our Services
								and provide a better user experience.
							</p>
						</section>

						{/* Sharing of Information */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								4. Sharing of Information
							</h2>
							<p className="text-gray-300 mb-4">
								We may share information about you as follows or as otherwise
								described in this Privacy Policy:
							</p>
							<ul className="text-gray-300 list-disc pl-6 space-y-2 mb-4">
								<li>
									With vendors, consultants, and other service providers who
									need access to such information to carry out work on our
									behalf
								</li>
								<li>
									With event organizers when you register for an event or
									purchase a ticket
								</li>
								<li>
									In response to a request for information if we believe
									disclosure is in accordance with any applicable law,
									regulation, or legal process
								</li>
								<li>
									If we believe your actions are inconsistent with our user
									agreements or policies, or to protect the rights, property,
									and safety of Event Explorer or others
								</li>
								<li>
									In connection with, or during negotiations of, any merger,
									sale of company assets, financing, or acquisition of all or a
									portion of our business by another company
								</li>
								<li>
									Between and among Event Explorer and our current and future
									parents, affiliates, subsidiaries, and other companies under
									common control and ownership
								</li>
								<li>With your consent or at your direction</li>
							</ul>
							<p className="text-gray-300">
								We may also share aggregated or de-identified information, which
								cannot reasonably be used to identify you.
							</p>
						</section>

						{/* Data Security */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								5. Data Security
							</h2>
							<p className="text-gray-300 mb-4">
								We take reasonable measures to help protect information about
								you from loss, theft, misuse, unauthorized access, disclosure,
								alteration, and destruction. However, no internet or electronic
								communications service is ever completely secure or error-free.
							</p>
							<p className="text-gray-300">
								You are responsible for taking precautions to protect your
								personal information, such as keeping your account credentials
								confidential and using strong, unique passwords for your
								accounts.
							</p>
						</section>

						{/* Your Choices */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								6. Your Choices
							</h2>
							<p className="text-gray-300 mb-4">
								You have several choices regarding the information we collect
								and how it is used:
							</p>
							<ul className="text-gray-300 list-disc pl-6 space-y-2 mb-4">
								<li>
									<strong>Account Information:</strong> You may update, correct,
									or delete your account information at any time by logging into
									your account or contacting us. Note that we may retain certain
									information as required by law or for legitimate business
									purposes.
								</li>
								<li>
									<strong>Location Information:</strong> You can prevent us from
									collecting precise location information by denying or revoking
									permission at the device level.
								</li>
								<li>
									<strong>Cookies:</strong> Most web browsers are set to accept
									cookies by default. If you prefer, you can usually choose to
									set your browser to remove or reject browser cookies. Please
									note that if you choose to remove or reject cookies, this
									could affect the availability and functionality of our
									Services.
								</li>
								<li>
									<strong>Promotional Communications:</strong> You may opt out
									of receiving promotional emails from us by following the
									instructions in those emails. If you opt out, we may still
									send you non-promotional emails, such as those about your
									account or our ongoing business relations.
								</li>
							</ul>
						</section>

						{/* Children's Privacy */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								7. Children's Privacy
							</h2>
							<p className="text-gray-300 mb-4">
								Our Services are not intended for children under 13 years of
								age. We do not knowingly collect personal information from
								children under 13. If you are a parent or guardian and you
								believe your child has provided us with personal information,
								please contact us.
							</p>
						</section>

						{/* Changes to This Privacy Policy */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								8. Changes to This Privacy Policy
							</h2>
							<p className="text-gray-300 mb-4">
								We may update this Privacy Policy from time to time. If we make
								material changes, we will notify you by email or through a
								notice on our Services prior to the change becoming effective.
								We encourage you to review the Privacy Policy whenever you
								access our Services to stay informed about our information
								practices.
							</p>
						</section>

						{/* Contact Us */}
						<section>
							<h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">
								9. Contact Us
							</h2>
							<p className="text-gray-300 mb-4">
								If you have any questions about this Privacy Policy, please
								contact us at:
							</p>
							<ul className="text-gray-300 list-disc pl-6">
								<li>Email: privacy@eventexplorer.com</li>
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

export default PrivacyPolicy;

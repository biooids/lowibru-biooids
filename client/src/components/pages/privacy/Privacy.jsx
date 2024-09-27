import React from "react";

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4">
          At Lowbru, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, and safeguard your data when you use our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect the following types of information when you interact with
          our platform:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Personal Identification Information (e.g., Name, Email, Phone
            Number)
          </li>
          <li>Profile Data (e.g., Username, Profile Picture, Preferences)</li>
          <li>Usage Data (e.g., Browsing History, Clicks, Log Data)</li>
          <li>Device Information (e.g., IP Address, Browser Type)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          Your information is used to improve our platform and provide a
          personalized experience, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Providing and improving our services</li>
          <li>Personalizing content and recommendations</li>
          <li>
            Communicating with you for updates, promotions, and notifications
          </li>
          <li>Ensuring platform security and preventing fraud</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          How We Protect Your Data
        </h2>
        <p className="text-gray-700 mb-4">
          We implement various security measures, such as encryption and secure
          storage systems, to protect your personal information from
          unauthorized access.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Third-Party Services
        </h2>
        <p className="text-gray-700 mb-4">
          We may share your information with trusted third-party partners to
          improve our services. These third parties are obligated to ensure the
          privacy and security of your data.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Your Rights
        </h2>
        <p className="text-gray-700 mb-4">
          You have the right to access, update, or delete your personal
          information. If you have any concerns regarding your data, please
          contact us at privacy@lowbru.com.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Changes to Our Privacy Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to update this policy at any time. Please check
          this page periodically for updates.
        </p>

        <p className="text-gray-700 mb-4">Last updated: September 2024</p>
      </div>
    </div>
  );
}

export default Privacy;

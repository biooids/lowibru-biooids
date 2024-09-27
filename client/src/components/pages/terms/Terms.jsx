import React from "react";

function Terms() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          By using Lowbru, you agree to the following Terms and Conditions.
          These terms are designed to ensure a safe, respectful, and meaningful
          experience for everyone on our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Account Creation
        </h2>
        <p className="text-gray-700 mb-4">
          When you create an account on Lowbru, you are responsible for
          maintaining the confidentiality of your login credentials and are
          fully responsible for any activities that occur under your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          User Conduct
        </h2>
        <p className="text-gray-700 mb-4">As a user of Lowbru, you agree to:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Not engage in harmful or illegal activities</li>
          <li>Respect other users and avoid harassment or abusive language</li>
          <li>Not upload or distribute malicious software or spam</li>
          <li>Comply with all applicable laws</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Content Ownership
        </h2>
        <p className="text-gray-700 mb-4">
          Users retain ownership of the content they post. By uploading content,
          you grant Lowbru the right to use, display, and distribute your
          content on the platform. We reserve the right to remove any content
          that violates our guidelines.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Termination
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to terminate or suspend your account if you
          violate these terms, engage in harmful behavior, or breach our
          community guidelines.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Disclaimers
        </h2>
        <p className="text-gray-700 mb-4">
          Lowbru is provided "as is" and we make no warranties, whether express
          or implied, regarding the platform’s reliability, availability, or
          suitability for your needs.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          Lowbru will not be held liable for any damages arising from the use of
          our platform, including but not limited to lost profits, data loss, or
          unauthorized access to your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4">
          We may update these terms from time to time. Continued use of the
          platform after any changes means you accept the new terms.
        </p>

        <p className="text-gray-700 mb-4">Last updated: September 2024</p>
      </div>
    </div>
  );
}

export default Terms;

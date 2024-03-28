import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-5">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Your privacy is very important to us. Accordingly, we have developed this Policy to inform you about our use of cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this Policy.
      </p>
      <ol className="list-decimal ml-6 text-gray-700 dark:text-gray-300">
        <li className="mb-2">
          <strong>What are Cookies:</strong> Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and more useful to you.
        </li>
        <li className="mb-2">
          <strong>How We Use Cookies:</strong> We use cookies for various purposes including to analyze traffic, personalize content, and provide social media features. We may also share information about your use of our site with our social media, advertising, and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
        </li>
        <li className="mb-2">
          <strong>Your Consent:</strong> By using our website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our website.
        </li>
        <li className="mb-2">
          <strong>Types of Cookies:</strong> We use both session and persistent cookies on our website. Session cookies are temporary files that are erased when you close your browser, whereas persistent cookies remain on your device for a set period of time or until you delete them.
        </li>
        <li className="mb-2">
          <strong>Managing Cookies:</strong> You can control and manage cookies in various ways, including by adjusting your browser settings. Please note that disabling cookies may affect the functionality of our website and your user experience.
        </li>
      </ol>
    </div>
  );
};

export default CookiePolicy;

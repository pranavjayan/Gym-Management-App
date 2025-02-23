import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">Contact FitTrack</h1>
        <p className="text-lg mb-6">
          We're here to help you on your fitness journey! Reach out to us via email or phone, 
          or follow us on social media for the latest updates and fitness tips.
        </p>
        <div className="flex flex-col space-y-6 items-center">
          {/* Social Media Links with Icons */}
          <div className="text-lg space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <FaFacebook className="text-yellow-400 text-2xl" />
              <span className="text-yellow-400 font-semibold">@FitTrackOfficial</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaInstagram className="text-yellow-400 text-2xl" />
              <span className="text-yellow-400 font-semibold">@FitTrackFitness</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaTwitter className="text-yellow-400 text-2xl" />
              <span className="text-yellow-400 font-semibold">@FitTrackHQ</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-lg">
            <p className="mb-2">
              Visit our website:{" "}
              <span className="text-yellow-400 font-semibold">www.fittrackdemo.com</span>
            </p>
            <p className="mb-2">
              Email us at:{" "}
              <span className="text-yellow-400 font-semibold">support@fittrackdemo.com</span>
            </p>
            <p>
              Call us at:{" "}
              <span className="text-yellow-400 font-semibold">+1 (234) 567-890</span>
            </p>
          </div>
        </div>
        <p className="text-lg mt-8">
          Follow us on social media for fitness inspiration, tips, and community stories. 
          We're here to support you every step of the way!
        </p>
      </div>
    </section>
  );
};

export default ContactUs;

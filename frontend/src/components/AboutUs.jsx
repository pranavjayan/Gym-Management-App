import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">About FitTrack</h1>
        <p className="text-lg mb-6">
          Welcome to <span className="text-yellow-400 font-semibold">FitTrack</span>, your ultimate fitness companion. 
          We are dedicated to helping you achieve your health and fitness goals through our comprehensive gym management platform.
        </p>
        <p className="text-lg mb-6">
          Whether you're a <span className="text-yellow-400 font-semibold">user</span> seeking personalized workout and diet plans,
          a <span className="text-yellow-400 font-semibold">trainer</span> managing client progress, or an <span className="text-yellow-400 font-semibold">admin</span>
          handling gym operations, FitTrack has everything you need to succeed.
        </p>
        <p className="text-lg mb-6">
          Our platform offers expertly crafted diet plans, structured workout routines, and a transformation tracking system
          to keep you on the right path. With FitTrack, you can monitor your progress, stay motivated, and celebrate every milestone.
        </p>
        <p className="text-lg mb-6">
          <span className="text-yellow-400 font-semibold">Why choose FitTrack?</span> We combine cutting-edge technology with expert guidance 
          to deliver results. Whether you're aiming to lose weight, build muscle, or simply lead a healthier lifestyle, FitTrack makes 
          fitness simple, effective, and enjoyable.
        </p>
        <p className="text-lg mb-6">
          Join thousands of users who have transformed their lives with FitTrack. Your journey to a healthier, stronger, and more confident 
          you starts here.
        </p>
        <p className="text-lg font-semibold text-yellow-400">
          Take the first step today and let FitTrack guide you toward your fitness goals!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
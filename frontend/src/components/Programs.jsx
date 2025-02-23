import { Check } from "lucide-react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Programs = () => {
  const programs = [
    {
      imgUrl: "https://articles-1mg.gumlet.io/articles/wp-content/uploads/2016/10/weight-loss.jpg?compress=true&quality=80&w=640&dpr=2.6",
      title: "WEIGHT LOSS",
    },
    {
      imgUrl: "https://t3.ftcdn.net/jpg/04/85/64/08/360_F_485640894_Ek9L59TH3BBBCNhFDjNNEMibaxOzK3Cj.jpg",
      title: "STRENGTH TRAINING",
    },
    {
      imgUrl: "https://www.itl.cat/pngfile/big/22-221870_crossfit.jpg",
      title: "CROSSFIT",
    },
    {
      imgUrl: "https://assets.myworkouts.io/images/musclegrowthmeasurement.webp",
      title: "WEIGHT GAIN",
    },
    {
      imgUrl: "https://w0.peakpx.com/wallpaper/304/155/HD-wallpaper-yoga-gym-yoga-class-postures-exercises-healthy-lifestyle.jpg",
      title: "YOGA",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white py-16 px-6">
      <h1 className="text-yellow-400 text-4xl font-bold text-center mb-12">
        WHAT WE OFFER
      </h1>
      <div className="max-w-8xl mx-auto">
        <Slider {...settings}>
          {programs.map((element) => (
            <div
              key={element.title}
              className="bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden mx-4"
            >
              <img
                src={element.imgUrl}
                alt={element.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-yellow-400">{element.title}</h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-8">
  <div className="flex flex-col items-center gap-6">
    {[
      "Personalized Workout Plans",
      "Expert Guidance",
      "Flexible Workout Schedules",
      "24/7 Access to Workout Plans",
      "Guaranteed Results",
    ].map((item, index) => (
      <p
        key={index}
        className="flex items-center gap-3 text-gray-200 text-[1.375rem] font-semibold transition-all duration-300 hover:scale-105 hover:text-yellow-400"
      >
        <span className="">
          <Check size={24} />
        </span>
        <span className="text-center">{item}</span>
      </p>
    ))}
  </div>
</div>

    </section>
  );
};

export default Programs;

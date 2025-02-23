import React from "react";

const Gallery = () => {
  const gallery = [
    "https://c1.wallpaperflare.com/preview/121/736/870/boxer-workout-portrait-man.jpg", // Image 1
    "https://wallpapercat.com/w/full/2/c/e/1130949-1600x2398-mobile-hd-calisthenics-wallpaper-photo.jpg", // Image 2
    "https://wallpapersok.com/images/hd/athletic-workout-black-and-white-portrait-66uu32fbdepftov3.jpg", // Image 3
    "https://i.pinimg.com/736x/ec/ea/4e/ecea4eb39ddd864a9696a85cc77b35e8.jpg", // Image 4
    "https://i.pinimg.com/564x/67/8d/93/678d93e8d80cd343a1e71d62331e800e.jpg", // Image 5
    "https://www.shutterstock.com/image-photo/muscular-crossfit-fitness-girl-lifting-600nw-1581121021.jpg", // Image 6
    "https://www.shutterstock.com/image-photo/crossfit-athlete-climbing-rope-gym-600nw-531747814.jpg", // Image 7
    "https://images.pexels.com/videos/5320011/pexels-photo-5320011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", // Image 8
    "https://e0.pxfuel.com/wallpapers/685/100/desktop-wallpaper-girl-gym-bodybuilding-girl.jpg" // Image 9
  ];

  return (
    <section className="bg-gray-900 py-12 px-4 text-center">
      <h1 className="text-4xl text-yellow-400 font-bold mb-12">
        GALLERY
      </h1>
      <div className="space-y-12">
        <div className="flex justify-between gap-4">
          {gallery.slice(0, 3).map((element, index) => (
            <div
              key={index}
              className="relative w-1/3 overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-[-5px]"
            >
              <img
                src={element}
                alt={`galleryImage-${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          {gallery.slice(3, 6).map((element, index) => (
            <div
              key={index}
              className="relative w-1/3 overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-[-5px]"
            >
              <img
                src={element}
                alt={`galleryImage-${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          {gallery.slice(6, 9).map((element, index) => (
            <div
              key={index}
              className="relative w-1/3 overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-[-5px]"
            >
              <img
                src={element}
                alt={`galleryImage-${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

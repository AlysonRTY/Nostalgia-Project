import ToTopBtn from "../components/ToTopBtn";
import { useEffect, useState } from "react";

function Homepage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            FIFA 17 Trailer
          </h1>
          <div className="relative aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/l1FJfr_spJQ?si=9365aQ0UQ4LbVhZd"
              title="FIFA 17 Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div> */}
      <h1>hello homepage</h1>
    </>
  );
}
export default Homepage;

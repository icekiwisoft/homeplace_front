import "./news_later.scss";
import React from "react";
export default function News_later() {
  return (
    <div className="flex flex-col items-center  content-center py-10 md:py-36 ">
      <h2 className="content-center text-#001122 p-5 mb-5  text-[2.4rem] font-bold ">
        News letter
      </h2>
      <div className="flex px-3 flex-col sm:flex-row md:w-min w-full max-w-96     gap-4">
        <input
          type="email"
          placeholder="email@gmail.com"
          id="large-input"
          className="block outline-0 rounded-lg  p-4 bg-gray-300 max-w-full w-full sm:w-80"
        />
        <button
          type="button"
          className=" bg-gray-900 text-white rounded-lg p-4  border"
        >
          subscribe
        </button>
      </div>
    </div>
  );
}

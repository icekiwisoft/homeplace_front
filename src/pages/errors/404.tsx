import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Header/Nav/Nav";

export default function Error404() {
  return (
    <>
      <Nav />
      <div className="mt-16 w-screen  flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-7xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p className="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            

            <Link to={"/"}>
            <button className="px-4 inline py-3 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-gray-900">
              back to homepage
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

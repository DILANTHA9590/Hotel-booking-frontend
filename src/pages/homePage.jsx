import { Link, Routes } from "react-router";

import Navigationbar from "../component/navigationbar";
import { Route } from "react-router";
import About from "../component/about";
import Header from "../component/header";

export default function HomePage() {
  return (
    <>
      <div className="w-full h-screen bg-[url('/headerbackground.jpg')] bg-cover bg-center relative   ">
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-0"></div>

        <section>
          <Navigationbar />
        </section>

        <div className="w-full h-[calc(100vh-20vh)]">
          <Header />
        </div>
      </div>
    </>
  );
}

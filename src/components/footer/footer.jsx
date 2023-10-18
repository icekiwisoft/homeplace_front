import {FaGithub, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";

export default function footer() {
  return (
    <footer className="bg-black w-full text-white lg:px-48 pt-7 pr-10 pb-1 pl-14 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold flex py-2">D <HiHomeModern className="h-auto"/> milis</h2>
          <ul className="text-[16px] my-4">
            <li className="my-2 text-[16px]">Contact</li>
            <li className="my-2 text-[16px]">A propos</li>
          </ul>
        </div>
        <div>
          <h2 className="text-[22px] font-semibold text-white py-2 ">En savoir plus</h2>
          <ul className="text-[16px] my-4">
            <li className="my-2 text-[16px]">Localisation: Simbok Etok-koss (Yaounde)</li>
            <li className="my-2 text-[16px]">Email: domilis@gmail.com</li>
            <li className="my-2 text-[16px]">Phone: +237 610101010 </li>
          </ul>
        </div>
        <div className="pl-8">
          <h2 className="text-[22px] font-semibold text-white py-2">Suivez-nous</h2>
          <div className="flex space-x-4">
            <a className="text-neutral-800 bg-white border rounded-full h-8 w-8 text-xl flex justify-center items-center hover:text-fuchsia-800  transition-all duration-150 ease-in-out" href="">
                <FaGithub/>
            </a>
            <a className="text-neutral-800 bg-white border rounded-full h-8 w-8 text-xl flex justify-center items-center hover:text-fuchsia-800  transition-all duration-150 ease-in-out" href="">
                <FaLinkedinIn/>
            </a>
            <a className="text-neutral-800 bg-white border rounded-full h-8 w-8 text-xl flex justify-center items-center hover:text-fuchsia-800  transition-all duration-150 ease-in-out" href="">
                <FaTwitter/>
            </a>
            <a className="text-neutral-800 bg-white border rounded-full h-8 w-8 text-xl flex justify-center items-center hover:text-fuchsia-800  transition-all duration-150 ease-in-out" href="">
                <FaInstagram/>
            </a>
          </div>
        </div>
      </div>
      <span className="w-fit mt-4 mx-auto flex justify-center h-9 text-white text-[16px] items-center">Developpé par ICEKIWI. Tous droits réservés © 2023</span>
    </footer>
  )
}

 
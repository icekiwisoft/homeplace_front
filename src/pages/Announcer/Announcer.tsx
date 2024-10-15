import ArticlePostDialog from "@components/ArticlePostDialog/ArticlePostDialog";
import Nav2 from "@components/Nav2/Nav2";
import ProductCard from "@components/ProductCard/ProductCard";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import { HiCheck, HiChevronUpDown, HiMagnifyingGlass, HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdOutlineCampaign } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import Cover from "@assets/bg_img/cover_annonceur.jpg"
import Domilix from "@assets/domilix_icon.png"

const people = [
  { name: "most popular" },
  { name: "news " },
  { name: "pricing" }
];
export default function Announcer() {
  const [selected, setSelected] = useState(people[0]);
  const options = [
    "announces",
    "about",
    "parametre"
  ]
  const [urlSearchParam] = useSearchParams();
  const [option, setOption] = useState("announces")

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  return (
    <>
      <Nav2 />
      <div className=" px-2 bg-gray-200 py-20 sm:py-28 xl:px-40 lg:px-28 md:px-10 ">
        {/* Profile Header */}
        <header className="rounded-xl relative bg-white overflow-hidden items-center justify-between mb-3 sm:mb-8">
          <div className="h-40 sm:h-80 bg-gray-600 "><img src={Cover} className="h-full w-full" /></div>
          <div className="flex gap-2 w-full items-start sm:gap-6 pr-4 pl-4 sm:pl-10 sm:items-center py-3 h-16 sm:h-20">
            <img
              alt="Domilix"
              src={Domilix}
              className=" bottom-10 sm:bottom-14 relative size-16 sm:size-28 rounded-lg bg-gray-100"
            />

            <div>
              <h1 className="text-lg font-bold">Domilix</h1>
              <p className="text-gray-500 absolute left-5 sm:left-0 sm:relative  text-[10px] sm:text-sm">
                annonceur depuis plus de 5 ans
              </p>
            </div>

            <div className="flex ml-auto sm:ml-20 sm:space-x-4 gap-1">
              <div className="flex flex-row sm:flex-col h-fit sm:h-auto items-end text-gray-500 text-sm">
                <strong className="sm:font-bold h-fit text-[15px] sm:text-lg text-orange-500">
                  450
                </strong>
                <BiLike className="sm:hidden ml-1 size-5 mb-[2px] sm:mb-0"/>
                <span className="hidden sm:flex">Likes</span>
              </div>

              <div className=" bg-gray-400 w-[1px] flex-grow "></div>

              <div className="flex flex-row sm:flex-col h-fit sm:h-auto items-end text-gray-500 text-sm">
                <strong className="sm:font-bold h-fit text-[15px] sm:text-lg text-orange-500">
                  377
                </strong>
                <span className="hidden sm:flex">Annonces</span>
                <GrAnnounce className="sm:hidden size-5 ml-1 mb-[2px] sm:mb-0"/>
              </div>
            </div>

            <button className="hidden lg:block ml-auto text-sm text-gray-600 bg-gray-200 border px-4 py-2 rounded border-gray-600">
              Editer le profil
            </button>
          </div>
          <button className="absolute top-2 right-2 lg:hidden text-gray-600 bg-white bg-opacity-65 border p-2 rounded border-gray-500">
            <FiEdit/>
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-1 mb-8  ">
          {options.map((menuItem) => {
            return (
              <button
                key={menuItem}
                className={
                  "  text-black text-[14px] rounded sm:rounded-lg mr-4" +
                  (option === menuItem ? " bg-orange-500 text-white  px-4 py-2" : "")
                }
                onClick={() => setOption(menuItem)}
              >
                {menuItem}
              </button>
            );
          })}

          <button
            className="bg-orange-500 text-white px-2 sm:px-4 py-2 z-50 rounded ml-auto flex gap-2 items-center fixed -right-2 sm:right-0 top-[160px] sm:top-1/3 rounded-l-3xl"
            onClick={toggleDialog}
          >
            <MdOutlineCampaign size={28} className="-rotate-45" /> <span className="hidden lg:block">Annonces</span>
          </button>
        </div>
        {option === "announces" && (
          <>
            <div className="mb-8 lg:flex md:flex justify-between ">
              {/* Search Bar */}
              <div className="flex w-full 2xl:w-[35rem]  lg:w-96 md:w-80  rounded-lg px-3 py-1.5 bg-white ring-2 ring-gray-300 items-center  ">
                <HiMagnifyingGlass size={28} className="text-gray-800" />

                <input
                  type="text"
                  placeholder="search ...."
                  defaultValue={urlSearchParam.get("search")!}
                  className="  outline-none flex-1 bg-transparent px-2  text-[1rem]  text-gray-600  font-normal"
                />
              </div>
              <div className=" w-full  lg:w-96 md:w-80 ">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {people.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4  ${active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"
                                    }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <HiCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* Apartment Listings */}
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2  grid-cols-1 gap-4">
              {Array(20)
                .fill(0)
                .map(() => {
                  return <ProductCard />;
                })}
            </div>
          </>
        )}
        {option === "about" && (
          <div className="sm:mt-20 min-h-52 py-10 text-sm text-gray-600 rounded-lg px-10 bg-white">
            <h2 className=" font-semibold text-lg text-black mb-3">bio</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Viverra tortor volutpat
              tortor fermentum odio sed aliquam odio sit. Dignissim orci augue
              magnis suspendisse aliquam enim fermentum. Sed ac tincidunt nec
              aliquet malesuada egestas. At lacus orci libero faucibus elit amet
              egestas. Morbi condimentum mi sollicitudin neque. At magnis diam
              quam quisque elit. Curabitur at senectus cras arcu vulputate
              faucibus. Sed ut imperdiet tristique vel montes enim nunc at. Enim
              vestibulum id integer sagittis dignissim tellus cursus. Eu massa
              nunc viverra elit ultricies commodo non. Duis ut eget sed semper
              proin. Et ac quis vestibulum blandit fermentum. Nisl sed nulla
              ipsum vel adipiscing ac semper enim at. Luctus at eget sit
              venenatis in ut. Vestibulum nunc vitae ullamcorper egestas
              scelerisque sapien vitae mauris ornare. Pharetra id et ultrices
              consequat amet gravida aliquet. Nulla mi ipsum viverra a etiam
              diam. Neque amet at velit euismod odio sed ante pharetra. Et
              faucibus dolor congue rutrum.
            </p>
          </div>
        )}

        {isDialogOpen && <ArticlePostDialog toggleDialog={toggleDialog} />}
      </div>
    </>
  );
}


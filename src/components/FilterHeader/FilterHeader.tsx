import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Option, Select } from "@material-tailwind/react";
import React, { useContext } from "react";

const filterButton = ["house", "furniture", "discover"];
import AuthContext from "../../context/AuthContext";

export default function FilterHeader(): React.ReactElement {
  return (
    <div>
      <div className="mt-10  flex items-center ">
        <div className="flex   rounded-full px-3 py-2 bg-blue-gray-50 border-solid items-center  ">
          <input
            type="text"
            placeholder="search ...."
            defaultValue={UrlSearchParam.get("search")!}
            className="  outline-none w-[200px] bg-transparent   text-[1rem]  text-gray-600  font-normal"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                navigate({
                  pathname: "/announces",
                  search: createSearchParams({
                    search: e.currentTarget.value,
                  }).toString(),
                });
              }
            }}
          />
          <HiMagnifyingGlass size={28} className="text-gray-800" />
        </div>
        <div className="">
          <Select
            placeholder={"sort by"}
            className=" !border h-full  !border-gray-300"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{
              className: "w-36 min-w-[142px]",
            }}
            variant="outlined"
            value={filterBy?.orderBy}
            onChange={(v) => {
              setFilterBy &&
                setFilterBy({
                  ...filterBy,
                  orderBy: v,
                });
            }}
            label="sort by"
          >
            <Option value={"description"}>name</Option>
            <Option value={"price"}>pricing</Option>
            <Option value={"created_at"}>news</Option>
          </Select>
        </div>

        <div className="flex ml-20  gap-2 ">
          {filterButton.map((b, i) => {
            const activeClassname = filterBy?.type === i ? "bg-gray-100" : "";
            return (
              <button
                key={i}
                className={
                  "  font-medium text-sm border border-gray-400 px-4 py-1.5 rounded-lg " +
                  activeClassname
                }
                onClick={() =>
                  setFilterBy({
                    ...filterBy,
                    type: i,
                  })
                }
              >
                {b}
              </button>
            );
          })}
        </div>

        <button className=" flex gap-2  items-center       font-medium text-sm border  ml-auto border-gray-400 px-4 py-1.5 rounded-lg ">
          <AdjustmentsHorizontalIcon className="h-5" />
          <span>filter</span>
        </button>
      </div>
    </div>
  );
}

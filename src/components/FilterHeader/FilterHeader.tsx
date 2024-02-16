import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Option, Select } from "@material-tailwind/react";
import React, { useContext } from "react";


const filterButton=[
 
  'house',
  'furniture', 
  'discover',

]
import AuthContext from "../../context/AuthContext";
export default function FilterHeader(): React.ReactElement {
  const { filterBy, setFilterBy } = useContext(AuthContext);
  
  return (
    <div className="mt-10  flex items-center justify-between">
      <div className="max-h-28">
        <Select
          className=" !border !border-gray-300"
          labelProps={{
            className: "hidden",
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

      <div className="flex  gap-2 ">
        {
          filterButton.map((b,i)=>
          {
            const activeClassname=filterBy?.type===i?'bg-gray-100':''
            return(
          <button key={i} className={"hover:bg-gray-100  font-semibold text-sm  px-4 py-1 rounded-full "+ activeClassname} onClick={()=>setFilterBy(
            {
              ...filterBy,
              type:i
            }
          )}>
          {b}
          </button>)
          }
          )
        }
  
      </div>

      <button className=" flex gap-2 border items-center  text-sm font-medium   px-4 py-2 border-gray-300 rounded-full">
        <AdjustmentsHorizontalIcon className="h-5" />
        <span>filter</span>
      </button>
    </div>
  );
}

import { Interface } from "readline";
import "./ProductCard.scss";
import React from "react";
import defaultFurnitureImg from "../../assets/default-img/furnitures.jpg";
import defaultHouseImg from "../../assets/default-img/houses.jpg";
interface Product {
  name: string;
  price: number;
  description: string;
  media;
}
export default function ProductCard(
  props: Product | undefined
): React.ReactElement {
  return (
    <div className="shadow-md rounded-lg overflow-hidden ">
      <div className="h-48 ">
        <img
          className="object-fill max-w-full max-h-full  w-full"
          src={defaultHouseImg}
        />
      </div>

      <div className="py-3 px-5">
        <h3 className="font-semibold my-2">element 1</h3>
        <p className="font-thin h-16">
          cet element vest assez particulier vous verrez !
        </p>
        <span className="">5000 frcfa</span>
      </div>
    </div>
  );
}

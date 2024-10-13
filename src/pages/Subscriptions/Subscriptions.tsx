import Nav2 from "@components/Nav2/Nav2";
import { FaCheck, FaPlus } from "react-icons/fa";
import Validity from "@assets/img/4336711 1.png";
import Domicoint from "@assets/img/Domicoint.png";
import ChoiseMode from "@components/Cards/Paiement/ChoiseMode";
import { useState } from "react";
import { PricingProps } from "utils/types";

const options = [
  "Voir les informations de base d’une annonce.",
  "Partagez les annonces avec vos contacts.",
];

const PricingCard: React.FC<PricingProps> = ({
  title,
  credits,
  validity,
  price,
  features,
  isActive,
  onChoose
}) => {
  return (
    <div className={`p-6 rounded-2xl min-w-[250px] shadow-lg relative ${isActive ? "bg-indigo-950 text-white lg:bottom-10" : "bg-white"}`}>
      {isActive && (
        <div className="top-1 flex items-center px-1.5 justify-center absolute right-1 aspect-square size-min rounded-full whitespace-nowrap bg-gray-200 text-orange-800 font-bold rotate-12 text-xs">
          -12 %
        </div>
      )}
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <p className="mb-4 flex flex-row gap-2"><img className="size-6" src={Domicoint} />{credits}</p>
      <p className="mb-6 flex flex-row gap-2"><img className="size-6" src={Validity} />{validity}</p>
      <ul className={`mb-6 ${isActive ? ' text-gray-400' : 'text-gray-600'} `}>
        {options.map((feature, index) => (
          <li key={index} className="flex mb-4">
            <span className="mr-2 mt-1">{(features.includes(feature)) ? <FaCheck size={10} /> : <FaPlus size={10} className="rotate-45" />}</span>
            <span className="text-sm font-normal">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold mb-6">{price}</div>
      <button
        onClick={onChoose}
        className={`px-4 py-2 font-bold rounded-xl w-full ${isActive ? "bg-orange-500 text-white" : "bg-orange-50 border text-orange-700"}`}>
        Choisir
      </button>
    </div>
  );
};

export default function Subscriptions() {
  const [selectedOffer, setSelectedOffer] = useState(null); // State to track selected offer

  const handleChooseOffer = (offer:any) => {
    setSelectedOffer(offer); // Set the selected offer to show in the popup
  };

  const handleClosePopup = () => {
    setSelectedOffer(null); // Close the popup
  };

  return (
    <>
      <Nav2 />
      <div className="min-h-screen bg-gray-50 flex mt-6 flex-col items-center justify-center py-10">
        <h1 className="mb-2 mt-3 lg:text-5xl sm:text-4xl text-3xl text-black text-center font-semibold">
          Le bon plan pour votre recherche
        </h1>
        <p className="mb-28 sm:w-[85%] w-[125%] text-gray-800 lg:text-sm text-xs text-center px-[15%]">
          Nous mettons à votre disposition plusieurs plans puissants pour vous
          aider à trouver un logement et un espace de bureau à un prix
          abordable. Tout ce dont vous avez besoin.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:px-28 px-8">
          <PricingCard
            title="Offre Standard"
            credits="20 credits"
            validity="1 semaine de validité"
            price="1000 XAF"
            features={["Voir les informations de base d’une annonce."]}
            isActive={false}
            onChoose={() => handleChooseOffer({
              title: "Offre Standard",
              credits: "20 credits",
              validity: "1 semaine de validité",
              price: "1000 XAF",
              features: ["Voir les informations de base d’une annonce."]
            })}
          />
          <PricingCard
            title="Offre Avantage"
            credits="50 credits"
            validity="2 semaines de validité"
            price="2000 XAF"
            features={["Voir les informations de base d’une annonce."]}
            isActive={false}
            onChoose={() => handleChooseOffer({
              title: "Offre Avantage",
              credits: "50 credits",
              validity: "2 semaines de validité",
              price: "2000 XAF",
              features: ["Voir les informations de base d’une annonce."]
            })}
          />
          <PricingCard
            title="Offre Premium"
            credits="100 credits"
            validity="3 semaines de validité"
            price="3500 XAF"
            features={[
              "Voir les informations de base d’une annonce.",
              "Partagez les annonces avec vos contacts.",
            ]}
            isActive={true}
            onChoose={() => handleChooseOffer({
              title: "Offre Premium",
              credits: "100 credits",
              validity: "3 semaines de validité",
              price: "3500 XAF",
              features: [
                "Voir les informations de base d’une annonce.",
                "Partagez les annonces avec vos contacts.",
              ]
            })}
          />
          <PricingCard
            title="Offre Ultime"
            credits="150 credits"
            validity="4 semaines de validité"
            price="5000 XAF"
            features={[
              "Voir les informations de base d’une annonce.",
              "Partagez les annonces avec vos contacts.",
            ]}
            isActive={false}
            onChoose={() => handleChooseOffer({
              title: "Offre Ultime",
              credits: "150 credits",
              validity: "4 semaines de validité",
              price: "5000 XAF",
              features: [
                "Voir les informations de base d’une annonce.",
                "Partagez les annonces avec vos contacts.",
              ]
            })}
          />
        </div>
      </div>

      {selectedOffer && (
        <ChoiseMode
          title={selectedOffer.title}
          credits={selectedOffer.credits}
          validity={selectedOffer.validity}
          price={selectedOffer.price}
          features={selectedOffer.features}
          isActive={true}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}
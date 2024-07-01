import Nav2 from "@components/Nav2/Nav2";
import { FaCheck, FaMarkdown, FaPlus, FaWindowClose } from "react-icons/fa";

const options = [
  "Voir les informations de base d’une annonce.",
  "Partagez les annonces avec vos contacts.",
];
const PricingCard = ({
  title,
  credits,
  validity,
  price,
  features,
  isActive,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg relative ${
        isActive ? "bg-indigo-950 text-white bottom-10" : "bg-white"
      }`}
    >
      {isActive && (
        <div className="top-1 flex items-center px-1.5 justify-center absolute right-1 aspect-square size-min  rounded-full whitespace-nowrap bg-gray-200 text-orange-800 -rotate-12 text-xs">
          -12 %
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="mb-2">{credits}</p>
       <p className="mb-4">{validity}</p>
      <ul className={`mb-4 ${isActive ? ' text-gray-400':'text-gray-600' } `}>
        {options.map((feature, index) => (
          <li key={index} className="flex mb-2    ">
            <span className="mr-2 mt-1">
              {
                (features.includes(feature))?
                <FaCheck  size={10} />:
                <FaPlus size={10} className="rotate-45"/>
                
              }
              
            </span>
            <span className="text-sm font-normal">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold mb-4">{price}</div>
      <button
        className={`px-4 py-2 rounded-xl w-full ${
          isActive
            ? "bg-orange-500 text-white"
            : "bg-orange-50 border  text-orange-700"
        }`}
      >
        Choisir
      </button>
    </div>
  );
};

export default function Subscriptions() {
  return (
    <>
      <Nav2 />
      <div className="min-h-screen bg-gray-50 flex mt-16 flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold  text-center mb-2">
          Le bon plan pour votre recherche
        </h1>
        <p className="text-center mb-28 w-[656px] text-sm text-gray-700">
          Nous mettons à votre disposition plusieurs plans puissants pour vous
          aider à trouver un logement et un espace de bureau à un prix
          abordable. Tout ce dont vous avez besoin.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-16 ">
          <PricingCard
            title="Offre Standard"
            credits="20 credits"
            validity="1 semaine de validité"
            price="1000 XAF"
            features={["Voir les informations de base d’une annonce."]}
            isActive={false}
          />
          <PricingCard
            title="Offre Avantage"
            credits="50 credits"
            validity="2 semaines de validité"
            price="2000 XAF"
            features={["Voir les informations de base d’une annonce."]}
            isActive={false}
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
          />
        </div>
      </div>
    </>
  );
}

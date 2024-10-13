import React, { useState } from 'react';
import { OfferDetailsProps } from 'utils/types';
import MTN_money from '@assets/img/MTN-Money.png';
import Orange_money from '@assets/img/orange-Money.png';
// import Paypal from '@assets/img/Paypal.png';
import Alert from '../Alert/AlertNotifs';

const ChoiseMode: React.FC<OfferDetailsProps> = ({ title, credits, validity, price, features, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const paymentImages: Record<string, string> = {
    'MTN Mobile Money': MTN_money,
    'Orange Money': Orange_money,
    // 'PayPal': Paypal,
  };
  const [state, setstate] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handlePayment = () => {
    // Simulate successful payment and show alert
    setShowSuccessAlert(true);

    // Optionally hide the alert after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000); // 3 seconds
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  const handleBack = () => {
    setSelectedPayment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    {showSuccessAlert && (
      <Alert type="success" message="Votre paiement a été effectué avec succès !" />
    )}
      <div className="bg-white px-4 py-10 lg:p-12 shadow-lg rounded-md max-w-[93%] sm:max-w-[75%] lg:max-w-[52%] w-full relative">
        <button
          onClick={onClose}
          className="absolute rounded-full size-8 flex justify-center items-center font-bold hover:bg-gray-500/35 top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
        <h2 className="text-xl text-center font-bold text-indigo-900">Merci de nous faire confiance !</h2>
        <div className="mt-5 sm:mt-8 flex flex-col lg:flex-row justify-center sm:px-20 lg:px-0 lg:items-start">
          {!selectedPayment ? (
            <div className="lg:space-y-4 sm:w-full lg:h-full lg:w-auto sm:px-4 lg:px-0 lg:ml-8 flex flex-row lg:flex-col items-center justify-center gap-8">
              <img
                src={MTN_money}
                alt="MTN Mobile Money"
                className="h-9 sm:h-10 lg:h-14 hover:cursor-pointer"
                onClick={() => handlePaymentSelect('MTN Mobile Money')}
              />
              <img
                src={Orange_money}
                alt="Orange Money"
                className="h-9 sm:h-10 lg:h-14 hover:cursor-pointer"
                onClick={() => handlePaymentSelect('Orange Money')}
              />
              {/* <img
                src={Paypal}
                alt="PayPal"
                className="h-9 sm:h-10 lg:h-14 hover:cursor-pointer"
                onClick={() => handlePaymentSelect('PayPal')}
              /> */}
            </div>
          ) : (
            <div className="animate-slide-up transition-all duration-500 ease-in-out lg:w-[55%] lg:mb-[0%]">
              <div className="flex flex-col items-center">
                <button onClick={handleBack} className="mr-4 absolute top-3 left-3 text-sm text-indigo-600 hover:text-indigo-800">
                  &#x2190; Retour
                </button>
                <h3 className="text-base font-semibold text-indigo-900 w-full mb-4">
                  Vous avez sélectionné : 
                </h3>
                <div className="flex items-center gap-4"> <span className="text-base text-orange-600">{selectedPayment}</span> <img src={paymentImages[selectedPayment]} alt={selectedPayment} className="h-8 sm:h-10 ml-3"/>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                    Numéro de téléphone
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="number"
                    type="text"
                    placeholder="Entrez votre numéro"
                  />
                </div>
                <button className="bg-orange-600 w-full mt-8 text-white font-bold py-2 px-6 rounded hover:bg-orange-700" onClick={handlePayment}>
                  Payer maintenant
                </button>
              </div>
            </div>
          )}
          {!selectedPayment ? (<div className="lg:border-l border-t border-gray-300 relative lg:pl-12 lg:ml-12 text-center mt-6 pt-4 flex-1">
            <p className="text-[#3D3D3D] w-full text-sm font-semibold absolute lg:-top-7 lg:w-4/5 mt-2">
              Vous êtes sur le point de profiter de tous les avantages de notre offre !
            </p>
            <h3 className="mt-14 sm:mt-10  text-left text-sm font-semibold underline underline-offset-1">Détails de l’offre :</h3>
            <ul className="mt-3 pl-9 lg:w-2/3 text-left text-[#0E0559] flex flex-col gap-2 text-xs">
              <li>📈 {credits}</li>
              <li>⏳ {validity}</li>
              {features.map((feature, index) => (
                <li key={index} className="flex items-center mt-1">
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <span className="text-sm flex flex-row gap-2 mt-6 items-end">
              <p>Montant : </p>
              <p className="text-xl font-bold text-orange-600">{price}</p>
            </span>
            <p className="text-orange-600 text-sm mt-6">
              Pour compléter votre paiement, veuillez sélectionner votre méthode de paiement dans les options présentées.
            </p>
          </div>):(<></>)}
        </div>
      </div>
    </div>
  );
};

export default ChoiseMode;

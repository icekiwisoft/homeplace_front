import MTN_money from '@assets/img/MTN-Money.png';
import Orange_money from '@assets/img/orange-Money.png';
import React, { useState } from 'react';
import { OfferDetailsProps } from 'utils/types';

import Alert from '../Alert/AlertNotifs';

import 'react-international-phone/style.css';
import { Phone } from '@components/Phone/Phone';
import { startCreditPurchase } from '@services/SubscriptionApi';

const ChoiseMode: React.FC<OfferDetailsProps> = ({
  title,
  credit,
  validity,
  price,
  features,
  onClose,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const paymentImages: Record<string, string> = {
    'MTN Mobile Money': MTN_money,
    'Orange Money': Orange_money,
  };
  const [isFetching, setIsFetching] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Pour les erreurs générales
  const [phone, setPhone] = useState('+237');

  // Démarre l'achat de crédits avec validation du numéro
  const handlePurchase = async () => {
    console.log(title, phone, selectedPayment);
    setIsFetching(true);
    if (selectedPayment) {
      try {
        await startCreditPurchase?.(title, phone, selectedPayment);
        setIsFetching(false);
        setShowSuccessAlert(true); // Affiche l'alerte de succès
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 1000);
      } catch (error) {
        setShowErrorAlert(true); // Affiche l'alerte d'échec
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 1000);
      }
    }
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  const handleBack = () => {
    setSelectedPayment(null);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
      {showSuccessAlert && (
        <Alert
          type='success'
          message='Votre paiement a été effectué avec succès !'
        />
      )}
      {showErrorAlert && (
        <Alert
          type='error'
          message='Une erreur est survenue lors du paiement.'
        />
      )}

      <div className='bg-white px-4 py-10 lg:p-12 shadow-lg rounded-md max-w-[93%] sm:max-w-[75%] lg:max-w-[52%] w-full relative'>
        <button
          onClick={onClose}
          className='absolute rounded-full size-8 flex justify-center items-center font-bold hover:bg-gray-500/35 top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          &#x2715;
        </button>
        <h2 className='text-xl text-center font-bold text-indigo-900'>
          Merci de nous faire confiance !
        </h2>
        <div className='mt-5 sm:mt-8 flex flex-col lg:flex-row justify-center sm:px-20 lg:px-0 lg:items-start'>
          {!selectedPayment ? (
            <div className='lg:space-y-4 sm:w-full lg:h-full lg:w-auto sm:px-4 lg:px-0 lg:ml-8 flex flex-row lg:flex-col items-center justify-center gap-8'>
              <img
                src={MTN_money}
                alt='MTN Mobile Money'
                className='h-9 sm:h-10 lg:h-14 hover:cursor-pointer'
                onClick={() => handlePaymentSelect('MTN Mobile Money')}
              />
              <img
                src={Orange_money}
                alt='Orange Money'
                className='h-9 sm:h-10 lg:h-14 hover:cursor-pointer'
                onClick={() => handlePaymentSelect('Orange Money')}
              />
            </div>
          ) : (
            <div className='animate-slide-up transition-all duration-500 ease-in-out lg:w-[55%] lg:mb-[0%]'>
              <div className='flex flex-col items-center'>
                <button
                  onClick={handleBack}
                  className='mr-4 absolute top-3 left-3 text-sm text-indigo-600 hover:text-indigo-800'
                >
                  &#x2190; Retour
                </button>
                <h3 className='text-base font-semibold text-indigo-900 w-full mb-4'>
                  Vous avez sélectionné :
                </h3>
                <div className='flex items-center gap-4'>
                  <span className='text-base text-orange-600'>
                    {selectedPayment}
                  </span>
                  <img
                    src={paymentImages[selectedPayment]}
                    alt={selectedPayment}
                    className='h-8 sm:h-10 ml-3'
                  />
                </div>
              </div>
              <div className='mt-6'>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='number'
                  >
                    Numéro de téléphone
                  </label>
                  <div className='flex items-center'>
                    <Phone value={phone} onChange={setPhone} />
                    {isFetching && (
                      <div role='status' className='ml-auto'>
                        <svg
                          aria-hidden='true'
                          className='inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className='bg-orange-600 w-full mt-8 text-white font-bold py-2 px-6 rounded hover:bg-orange-700'
                  onClick={handlePurchase}
                >
                  Payer maintenant
                </button>
              </div>
            </div>
          )}

          {!selectedPayment && (
            <div className='lg:border-l border-t border-gray-300 relative lg:pl-12 lg:ml-12 text-center mt-6 pt-4 flex-1'>
              <p className='text-[#3D3D3D] w-full text-sm font-semibold absolute lg:-top-7 lg:w-4/5 mt-2'>
                Vous êtes sur le point de profiter de tous les avantages de
                notre offre !
              </p>
              <h3 className='mt-14 sm:mt-10 text-left '>
                <span className='text-sm font-semibold underline underline-offset-1'>
                  Détails de l’offre :
                </span>
                <span className='text-indigo-900 font-semibold ml-1'>
                  {' '}
                  {title}
                </span>
              </h3>
              <ul className='mt-3 pl-9 lg:w-2/3 text-left text-[#0E0559] flex flex-col gap-2 text-xs'>
                <li>📈 {credit}</li>
                <li>⏳ {validity}</li>
                {features.map((feature, index) => (
                  <li key={index} className='flex items-center mt-1'>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <span className='text-sm flex flex-row gap-2 mt-6 items-end'>
                <p>Montant : </p>
                <p className='text-xl font-bold text-orange-600'>{price}</p>
              </span>
              <p className='text-orange-600 text-sm mt-6'>
                Pour compléter votre paiement, veuillez sélectionner votre
                méthode de paiement dans les options présentées.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoiseMode;

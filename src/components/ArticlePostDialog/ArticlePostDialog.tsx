import { Listbox, Transition } from "@headlessui/react";
import { Category } from "@utils/types";
import useAxios, { baseURL } from "@utils/useAsios";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { MdMyLocation } from "react-icons/md";

interface SelectData {
  key: string;
  name: string;
}

// Component principal pour créer une annonce avec un dialogue
export default function ArticlePostDialog({ toggleDialog }: { toggleDialog: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedType, setSelectedType] = useState<SelectData | null>(null);
  const [selectedAdType, setSelectedAdType] = useState<SelectData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectData | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // Étape actuelle dans le processus de création d'annonce
  const totalSteps = 4; // Nombre total d'étapes
  const [selectedCurrency, setSelectedCurrency] = useState<SelectData | null>(null); // Devise par défaut

  const axios = useAxios();
  const [formData, setFormData] = useState({
    category_id: '',
    price: '',
    type: 'realestate',
    ad_type: '',
    bedroom: 0,
    mainroom: 0,
    toilet: 0,
    kitchen: 0,
    medias: [] as File[],
    gate: false,
    pool: false,
    garage: false,
    furnitured: false,
    localization: [0, 0] as [number, number],
    period: '',
    description: '',
    devise: ''
  });

  let priorityMediaIndex : number = 0;

  // Données pour le type et la période
  const Type = [
    { key: "realestate", name: "Immobilier" }
  ];
  const Period = [
    { key: "hour", name: "Heure" },
    { key: "day", name: "Jour" },
    { key: "month", name: "Mois" }
  ];
  const Currency = [
    {
      key: "XAF",
      name: "FCFA"
    },
    {
      key: "EUR",
      name: "EUR"
    }
  ]
  const adType = [
    {
      key: "location",
      name: "Location"
    },
    {
      key: "Sale",
      name: "Vente"
    }
  ]

  // Initialisation par défaut des types et périodes sélectionnés, et chargement des catégories
  useEffect(() => {
    setSelectedType(Type[0]);
    setSelectedPeriod(Period[2]);
    setSelectedCurrency(Currency[0]);
    setSelectedAdType(adType[0]);
    fetchCategories(formData?.type == "realestate" ? "house" : "furniture");
  }, []);

  // Mise à jour de formData en fonction de la catégorie, du type et de la période sélectionnés
  useEffect(() => {
    // fetchCategories(formData?.type == "realestate" ? 0 : 1);
    setFormData((prev) => ({
      ...prev,
      category_id: selectedCategory?.id || '',
      period: selectedPeriod?.key || '',
      ad_type: selectedAdType?.key || '',
      devise: selectedCurrency?.key || ''
    }));
  }, [selectedCategory, selectedPeriod, selectedAdType, selectedCurrency]);

  useEffect(() => {    
    fetchCategories(formData?.type == "realestate" ? "house" : "furniture");
    setFormData((prev) => ({
      ...prev,
      type: selectedType?.key || 'realestate',
    }));
  }, [selectedType]);

  // Récupération des catégories à partir de l'API
  const fetchCategories = async (type : string) => {
    try {
      const response = await axios.get(`${baseURL}/categories`, {
        params: { type }
      });
      console.log(response)
      setCategories(response.data.data);
      setSelectedCategory(response.data.data[0]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleLocalizationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseFloat(e.target.value) || 0; // Convert input to a number
    setFormData((prev) => ({
      ...prev,
      localization: index === 0
        ? [value, prev.localization[1]] // Update longitude
        : [prev.localization[0], value]  // Update latitude
    }));
  };
  
  const handlePriorityChange = (index:any) => {
    setFormData((prevData) => {
      const updatedMedias = [...prevData.medias];
      const [selectedMedia] = updatedMedias.splice(index, 1);
      priorityMediaIndex= index;
      updatedMedias.unshift(selectedMedia); // Place le média prioritaire en première position
      return {
        ...prevData,
        medias: updatedMedias, // Met à jour l'index de priorité
      };
    });
  };

  // Gestion des changements de formulaire (entrées texte et cases à cocher)
  const handleChange = (e: FormEvent) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'localization') {
      const [latitude, longitude] = value.split(',').map(Number);
      setFormData((prev) => ({ ...prev, localization: [latitude, longitude] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gestion du changement d'image avec upload multiple
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, medias: [...prev.medias, ...files] }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    // Créez une instance de FormData
    const data = new FormData();
  
    // Ajoutez les champs du formulaire au FormData
    data.append("category_id", formData.category_id);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("ad_type", formData.ad_type);
    data.append("bedroom", formData.bedroom.toString());
    data.append("mainroom", formData.mainroom.toString());
    data.append("toilet", formData.toilet.toString());
    data.append("kitchen", formData.kitchen.toString());
    data.append("gate", formData.gate ? "1" : "0");
    data.append("pool", formData.pool ? "1" : "0");
    data.append("garage", formData.garage ? "1" : "0");
    data.append("furnitured", formData.furnitured ? "1" : "0");
    data.append("period", formData.period);
    data.append("description", formData.description);
    data.append("devise", formData.devise);
  
    // Ajoutez les coordonnées de localisation
    data.append("localization[]", formData.localization[0].toString());
    data.append("localization[]", formData.localization[1].toString());
  
    // Ajoutez les fichiers (images) au FormData
    formData.medias.forEach((file) => {
      data.append("medias[]", file);
    });
  
    try {
      // console.log(formData);
      // for (let [key, value] of data.entries()) { 
      //   console.log(key, value);
      // }
      // Envoyez la requête avec Axios
      const response = await axios.post(`${baseURL}/ads`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Réponse de l'API :", response.data);
      toggleDialog(); // Ferme la boîte de dialogue après validation
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  // Rendu des étapes sous forme de bulles numérotées
  const renderSteppers = () =>
    Array.from({ length: totalSteps }, (_, i) => (
      <span
        key={i}
        className={`size-8 inline-flex items-center justify-center rounded-full mr-2 ${currentStep === i + 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
          }`}
      >
        {i + 1}
      </span>
    ));

  // Rendu du contenu pour chaque étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            {/* Sélection du type et de la catégorie */}
            <div className="flex flex-row gap-3 justify-between">
              <div className="my-4 w-1/2">
                <label className="block text-gray-700">Genre</label>
                <Listbox value={selectedType} onChange={setSelectedType}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border">
                      <span className="block truncate">{selectedType ? selectedType.name : "Select a Type"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                        {Type.map((type) => (
                          <Listbox.Option key={type.key} value={type} className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
                          >
                            {type.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="my-4 w-1/2">
                <label className="block text-gray-700">Catégorie</label>
                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border">
                      <span className="block truncate">{selectedCategory ? selectedCategory.name : "Select a category"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                        {categories.map((category) => (
                          <Listbox.Option key={category.id} value={category} className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
                          >
                            {category.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
              <div className="my-4 w-1/2">
                <label className="block text-gray-700">Type d'annonce</label>
                <Listbox value={selectedAdType} onChange={setSelectedAdType}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border">
                      <span className="block truncate">{selectedAdType ? selectedAdType.name : "Select a category"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                        {adType.map((at) => (
                          <Listbox.Option key={at.key} value={at} className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
                          >
                            {at.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
          </div>
        );
      case 2:
        return (
          <div className="py-3 flex flex-col gap-3">
            {/* Information sur l'annonce */}
            <div className="flex flex-row gap-3">
              <div>
                <label className="block text-gray-700">Chambres</label>
                <input
                  type="number"
                  name="bedroom"
                  value={formData.bedroom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Pièces principales</label>
                <input
                  type="number"
                  name="mainroom"
                  value={formData.mainroom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div>
                <label className="block text-gray-700">Toilette</label>
                <input
                  type="number"
                  name="toilet"
                  value={formData.toilet}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Cuisine</label>
                <input
                  type="number"
                  name="kitchen"
                  value={formData.kitchen}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                <label className="block text-gray-700">Balcon :</label>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center">
                    <input type="radio" value="" name="balcon-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                  </div>
                  <div className="flex items-center">
                    <input checked type="radio" value="" name="balcon-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <label className="block text-gray-700">Parking :</label>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center">
                    <input type="radio" value="" name="parking-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                  </div>
                  <div className="flex items-center">
                    <input checked type="radio" value="" name="parking-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <label className="block text-gray-700">Clôture :</label>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center">
                    <input type="radio" value="" name="cloture-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                  </div>
                  <div className="flex items-center">
                    <input checked type="radio" value="" name="cloture-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="py-3">
            <div className="mb-4 flex space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.localization[0]}
                  onChange={(e) => handleLocalizationChange(e, 0)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="long..."
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.localization[1]}
                  onChange={(e) => handleLocalizationChange(e, 1)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="lat..."
                />
              </div>
              <div className="w-auto flex items-end">
                <button
                  type="button"
                  className="p-2 size-8 bg-gray-300  rounded-lg"
                  title="Use current location"
                >
                  <MdMyLocation />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative overflow-hidden">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, or JPEG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  multiple
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {formData.medias.length > 0 && (
              <div className="flex flex-col mt-4 justify-center w-full">
                <span className="text-gray-500 text-[12px] mb-1 text-center">Cliquer sur le media de couverture 🛈</span>
                <div className="flex flex-row gap-3 justify-center">
                  {formData.medias.map((image, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        className={`w-[45px] h-[45px] rounded object-cover ${priorityMediaIndex == index ? 'border-2 border-orange-500' : ''
                          }`}
                        onClick={() => handlePriorityChange(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="py-3">
            <div className="my-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 min-h-24 border border-gray-300 rounded-lg resize-none"
                placeholder="Rédigez une desiption..."
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-700">Période de paiement</label>
              <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300">
                    <span className="block truncate">{selectedPeriod ? selectedPeriod.name : "Select a Type"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 border border-gray-300">
                      {Period.map((period) => (
                        <Listbox.Option key={period.key} value={period} className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                        }>
                          {period.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="my-4">
              <label className="block text-gray-700">Prix</label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-10 pl-3 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-gray-300 rounded-lg px-3 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
                  placeholder="1,000"
                />
                <div className="absolute top-2 right-0 flex items-center pr-3">
                  <div className="h-6 border-l border-gray-300 mr-2"></div>
                  <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
                    <div className="">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10 text-left border border-none">
                        <span className="block truncate">{selectedCurrency ? selectedCurrency.name : "Select a Type"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 border border-gray-300">
                          {Currency.map((currency) => (
                            <Listbox.Option key={currency.key} value={currency} className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                            }>
                              {currency.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[480px] shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleDialog}>
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Créer une annonce</h2>
        <div className="flex gap-4 w-full justify-center items-center">{renderSteppers()}</div>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button type="button" onClick={() => setCurrentStep((step) => step - 1)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Précédent
              </button>
            )}
            {currentStep < totalSteps && (
              <button type="button" onClick={() => setCurrentStep((step) => step + 1)} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg">
                Suivant
              </button>
            )}
            {currentStep == totalSteps && (
              <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg">
                Valider
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
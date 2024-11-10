import { Listbox, Transition } from "@headlessui/react";
import useAxios, { baseURL } from "@utils/useAsios";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { MdMyLocation } from "react-icons/md";

interface Category {
  id: string;
  name: string;
}

export default function ArticlePostDialog({ toggleDialog }: { toggleDialog: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const axios = useAxios();
  const [formData, setFormData] = useState({
    category_id: '',
    price: '',
    type: '',
    ad_type: '',
    bedroom: 0,
    mainroom: 0,
    medias: [] as File[],
    gate: false,
    pool: false,
    garage: false,
    toilet: false,
    furnitured: false,
    localization: [0, 0] as [number, number],
    period: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Update category_id whenever selected changes
    if (selected) {
      setFormData((prev) => ({ ...prev, category_id: selected.id }));
    }
  }, [selected]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories`);
      setCategories(response.data.data);
      setSelected(response.data.data[0]); // Set first category as default
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, medias: [...prev.medias, ...files] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toggleDialog();
  };

  const renderSteppers = () =>
    Array.from({ length: totalSteps }, (_, i) => (
      <span
        key={i}
        className={`size-8 inline-flex items-center justify-center rounded-full mr-2 ${currentStep === i + 1
          ? "bg-orange-600 text-white"
          : "bg-gray-200 text-gray-500"
          }`}
      >
        {i + 1}
      </span>
    ));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="flex flex-row gap-3 justify-between">
  <div className="my-4 w-1/2">
                <label className="block text-gray-700">Category</label>
                <Listbox value={selected} onChange={setSelected} >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border">
                      <span className="block truncate">{selected ? selected.name : "Select a category"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                        {categories.map((category) => (
                          <Listbox.Option key={category.id} value={category} className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4  ${active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                            }`
                          }>
                            {category.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="my-4 w-1/2">
                <label className="block text-gray-700">Ad Type</label>
                <input
                  type="text"
                  name="ad_type"
                  value={formData.ad_type}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Ad Type"
                />
              </div>
            </div>
            
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-gray-700">Bedrooms</label>
            <input
              type="number"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Number of Bedrooms"
            />
            <label className="block text-gray-700">Main Room</label>
            <input
              type="number"
              name="mainroom"
              value={formData.mainroom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Number of Main Rooms"
            />
          </div>
        );
      case 3:
        return (
          <div>
            {/* <label className="block text-gray-700">Localization</label>
              <input
                type="text"
                name="localization"
                value={formData.localization.join(',')}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Latitude, Longitude"
              /> */}
            <div className="mb-4 flex space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="long..."
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
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
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" multiple type="file" className="hidden" onChange={handleImageChange} />
                {formData.medias.length > 0 && (
                  <div className="flex gap-4">
                    {formData.medias.map((image, index) => (
                      <img key={index} src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-[45px] h-[45px] object-cover" />
                    ))}
                  </div>
                )}
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block text-gray-700">Period</label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Rental Period"
            />
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Price"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[480px] shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleDialog}>
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <div className="flex gap-4 w-full justify-center items-center">{renderSteppers()}</div>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button type="button" onClick={() => setCurrentStep((step) => step - 1)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Back
              </button>
            )}
            {currentStep < totalSteps && (
              <button type="button" onClick={() => setCurrentStep((step) => step + 1)} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg">
                Next
              </button>
            )}
            {currentStep == totalSteps && (
              <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}




// import { Listbox, Transition } from "@headlessui/react";
// import { FormEvent, Fragment, useState } from "react";
// import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
// import { MdMyLocation } from "react-icons/md";

// export default function ArticlePostDialog ({ toggleDialog }:{toggleDialog:()=>void})  {
//   const categories = [
//   { name: "appartement" },
//   { name: "chambre " },
//   { name: "studio" },

// ];
//   const [formData, setFormData] = useState({
//     description: "",
//     room: "",
//     bathroom: "",
//     kitchen: "",
//     label: "",
//     category: "",
//     images: [],
//   });
//   const [selected, setSelected] = useState(categories[0]);
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 4; // Assuming 3 total steps

//   const handleChange = (e:FormEvent) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e:FormEvent) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, images: [...formData.images, ...files] });
//   };

//   const handleSubmit = (e:FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//     // Handle form submission logic here
//     toggleDialog();
//   };

//   const handleNext = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div>
//             <div className="my-4">
//               <label className="block text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg resize-none"
//                 rows="3"
//                 placeholder="Write a caption..."
//               />
//             </div>
//             <div className="flex items-center justify-center w-full">
//               <label
//                 for="dropzone-file"
//                 class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative overflow-hidden"
//               >
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <svg
//                     className="w-10 h-10 mb-3 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                     ></path>
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span> or
//                     drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     SVG, PNG, JPG or GIF (MAX. 800x400px)
//                   </p>
//                 </div>
//                 <input
//                   id="dropzone-file"
//                   multiple
//                   type="file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//                 {formData.images.length > 0 && (
//                   <img
//                     src={URL.createObjectURL(formData.images[0])}
//                     alt="preview"
//                     className="w-full object-cover "
//                   />
//                 )}
//               </label>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Room</label>
//               <input
//                 type="text"
//                 name="room"
//                 value={formData.room}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Number of rooms"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Bathroom</label>
//               <input
//                 type="text"
//                 name="bathroom"
//                 value={formData.bathroom}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Number of bathrooms"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Kitchen</label>
//               <input
//                 type="text"
//                 name="kitchen"
//                 value={formData.kitchen}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Number of kitchens"
//               />
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Label</label>
//               <input
//                 type="text"
//                 name="label"
//                 value={formData.label}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Post label"
//               />
//             </div>
//             <div className="mb-4 flex space-x-2">
//               <div className="w-full">
//                 <label className="block text-gray-700">Longitude</label>
//                 <input
//                   type="text"
//                   name="longitude"
//                   value={formData.longitude}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   placeholder="long..."
//                 />
//               </div>
//               <div className="w-full">
//                 <label className="block text-gray-700">Latitude</label>
//                 <input
//                   type="text"
//                   name="latitude"
//                   value={formData.latitude}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   placeholder="lat..."
//                 />
//               </div>
//               <div className="w-auto flex items-end">
//                 <button
//                   type="button"
//                   className="p-2 size-8 bg-gray-300  rounded-lg"
//                   title="Use current location"
//                 >
//                   <MdMyLocation />
//                 </button>
//               </div>
//             </div>
//             <div className="w-full">
//               <label className="block text-gray-700">Categorie</label>
//               <Listbox value={selected} onChange={setSelected}>
//                 <div className="relative mt-1">
//                   <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
//                     <span className="block truncate">{selected.name}</span>
//                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                       <HiChevronUpDown
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </span>
//                   </Listbox.Button>
//                   <Transition
//                     as={Fragment}
//                     leave="transition ease-in duration-100"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                   >
//                     <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                       {categories.map((person, personIdx) => (
//                         <Listbox.Option
//                           key={personIdx}
//                           className={({ active }) =>
//                             `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                               active
//                                 ? "bg-amber-100 text-amber-900"
//                                 : "text-gray-900"
//                             }`
//                           }
//                           value={person}
//                         >
//                           {({ selected }) => (
//                             <>
//                               <span
//                                 className={`block truncate ${
//                                   selected ? "font-medium" : "font-normal"
//                                 }`}
//                               >
//                                 {person.name}
//                               </span>
//                               {selected ? (
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                   <HiCheck
//                                     className="h-5 w-5"
//                                     aria-hidden="true"
//                                   />
//                                 </span>
//                               ) : null}
//                             </>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </Transition>
//                 </div>
//               </Listbox>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//   const renderSteppers = () => {
//     const steps = [];
//     for (let i = 1; i <= totalSteps; i++) {
//       steps.push(
//         <span
//           key={i}
//           className={`size-8 inline-flex items-center justify-center rounded-full mr-2 text-center ${
//             currentStep === i
//               ? "bg-orange-600 text-white"
//               : "bg-gray-200 text-gray-500"
//           }`}
//         >
//           {i}
//         </span>
//       );
//     }
//     return steps;
//   };

//   return (
//     <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-[480px] shadow-lg relative">
//         <button
//           className="absolute top-2 right-2 text-gray-500"
//           onClick={toggleDialog}
//         >
//           ✖
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Create Post</h2>
//         <div className="flex gap-4 w-full rela justify-center items-center">{renderSteppers()}</div>
//         <form onSubmit={handleSubmit} className="mt-10 pb-10">
//           {renderStepContent()}
//           <div className="flex justify-between relative align-rigth mt-4">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-4 py-2 left-0 absolute bg-gray-300 rounded-lg"
//               >
//                 Back
//               </button>
//             )}
//             {currentStep < 3 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-4 py-2 right-0 absolute text-black font-semibold rounded-lg"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 className="px-4 py-2  right-0 absolute  text-black font-semibold rounded-lg"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

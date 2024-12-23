import React, { useState } from 'react';
import { AuthData } from '@utils/types';
import usePulsy from 'pulsy';
import { PiLinkSimple } from "react-icons/pi";
import { TbMail } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";

interface ProfileProps {
    onClose: () => void;
    onSave: (data: { firstName: string; email: string; username: string; profilePhoto?: string }) => void;
    onDelete: () => Promise<void>; // Assume que la suppression retourne une promesse
}

const ProfileModal: React.FC<ProfileProps> = ({ onClose, onSave, onDelete }) => {
    const [authData] = usePulsy<AuthData>('authData');
    const [firstName, setFirstName] = useState(authData.user?.name || '');
    const [emailAddress, setEmailAddress] = useState(authData.user?.email || '');
    const [userName, setUserName] = useState(authData.user?.name || '');
    const [photo, setPhoto] = useState<string | undefined>();
    const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loader pour la suppression

    // Validation des champs
    const validateFields = () => {
        if (!firstName.trim()) return { valid: false, message: "First name is required" };
        if (!emailAddress.trim() || !/\S+@\S+\.\S+/.test(emailAddress))
            return { valid: false, message: "Please enter a valid email address" };
        return { valid: true };
    };

    const handleSave = () => {
        const { valid, message } = validateFields();
        if (!valid) {
            alert(message); // Affichage d'un message d'erreur
            return;
        }
        onSave({ firstName, email: emailAddress, username: userName, profilePhoto: photo });
    };

    // Gestion de la suppression
    const handleDelete = () => setDeleteConfirmVisible(true);

    const confirmDelete = async () => {
        setIsLoading(true);
        try {
            await onDelete();
            setDeleteConfirmVisible(false);
        } catch (error) {
            alert("Failed to delete user. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const cancelDelete = () => setDeleteConfirmVisible(false);

    // Gestion de la mise à jour de la photo
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string); // Met à jour l'image avec la base64
            };
            reader.readAsDataURL(file); // Lit le fichier et le convertit en base64
        }
    };
    

    // Composant de confirmation de suppression
    const renderDeleteConfirmation = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[1000000]">
            <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-sm text-center">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                <p className="text-sm text-gray-600 mt-2">
                    Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={cancelDelete}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white relative rounded-[15px] shadow-lg w-full max-w-lg pb-6 border-[3px] border-gray-200">
                <div className="w-full relative flex flex-col">
                    <span className="bg-gray-100 w-full absolute rounded-t-[15px] z-[10] h-20"></span>
                    <div className="flex flex-row justify-between mt-12 px-6 z-50">
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-4 mb-4 relative">
                                <img
                                    src={photo || 'https://img.freepik.com/vecteurs-libre/jeune-homme-barbu_24877-82119.jpg?ga=GA1.1.1184333758.1732266226&semt=ais_hybrid'}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-[0.5px] border-gray-100 shadow"
                                />
                                <img src={'/certificate.png'} alt='coin' className='size-6 absolute -bottom-1 left-8' />
                            </div>
                            <span>
                                <strong>{firstName}</strong>
                                <p className="text-gray-500 text-sm">{emailAddress}</p>
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <span className="flex flex-row gap-2">
                                <img src={'/dom.png'} alt="coin" className="size-5" />
                                <strong className="text-yellow-800">20</strong>
                            </span>
                            <span className="border flex flex-row border-gray-300 text-gray-600 rounded-md gap-1 px-3 py-1.5 text-[12px]">
                                <PiLinkSimple size={16} /> Copy link
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-6 mt-6">
                    <div className="flex flex-row justify-between border-t-[1px] py-3">
                        <label className="block text-sm font-medium text-black">Nom</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="py-1.5 pl-3 text-[13px] w-[70%] rounded-md border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-row justify-between border-t-[1px] py-3">
                        <label className="block text-sm font-medium text-black">Adress mail</label>
                        <div className="relative w-[70%]">
                            <input
                                type="text"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                className="py-1.5 pl-7 text-[13px] w-full rounded-md border-[1px] border-gray-300"
                            />
                            <TbMail className="absolute left-2 top-2 text-gray-500" />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between border-t-[1px] py-3'>
                        <label className="block text-sm font-medium text-black">Username</label>
                        <span className='flex flex-row gap-0 w-[70%] relative'>
                            <span className="py-1.5 pl-3 text-[13px] w-[45%] flex items-center rounded-l-md border-[1px] text-gray-600 border-gray-300">domilix.com/</span>
                            <span className="flex flex-row justify-between items-center py-1.5 pl-3 text-[13px] w-full rounded-r-md border-[1px] border-gray-300">{firstName}
                                <img src={'/certificate.png'} alt='coin' className='size-5' /></span>
                        </span>
                    </div>

                    <div className='flex flex-row justify-between border-t-[1px] py-3'>
                        <label className="block text-sm font-medium text-black">Photo de profil</label>
                        <span className='flex flex-row gap-3 w-[70%] relative items-center'>
                            <img
                                src={photo || 'https://img.freepik.com/vecteurs-libre/jeune-homme-barbu_24877-82119.jpg?ga=GA1.1.1184333758.1732266226&semt=ais_hybrid'} // Photo par défaut
                                alt="Profile"
                                className="w-16 h-16 rounded-full border-[0.5px] border-gray-100 shadow"
                            />
                            {/* Input caché et label comme bouton */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                                id="upload-photo"
                            />
                            <label
                                htmlFor="upload-photo"
                                className="border-gray-300 border-[1px] h-fit text-[13px] text-black hover:bg-gray-200 px-3 py-1.5 rounded-md cursor-pointer"
                            >
                                Changer de photo
                            </label>
                        </span>
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t-[1px] py-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Empêche la fermeture du modal
                                handleDelete();
                            }}
                            className="flex flex-row gap-2 items-center text-red-700 bg-red-50 text-[12px] hover:bg-red-50 px-4 py-1.5 rounded-md"
                        >
                            <IoTrashOutline />
                            Delete user
                        </button>
                        <div className="flex space-x-2">
                            <button
                                onClick={onClose}
                                className="border-gray-300 border-[1px] text-[13px] text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-black text-white hover:bg-gray-800 px-4 py-1.5 text-[13px] rounded-md"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isDeleteConfirmVisible && renderDeleteConfirmation()}
        </div>
    );
};

export default ProfileModal;

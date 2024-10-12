import React, { FormEvent, useContext, useState } from "react";

export default function Settings (){
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(prev => !prev);
    };

    const handleSave = () => {
        alert('Settings saved!');
    };
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={toggleNotifications}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">Enable Notifications</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Theme:
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Language:
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                    </select>
                </label>
            </div>
            <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Save Settings
            </button>
        </div>
    );
};
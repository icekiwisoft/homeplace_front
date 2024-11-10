import { useState, useContext } from "react";
import BlockInputs from "@components/OTP/BlockInputs";
import { EncodedEmailProps } from "utils/types";
import AuthContext from "../../context/AuthContext"; // Assurez-vous de spécifier le bon chemin vers AuthContext
import { Phone } from "@components/Phone/Phone";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import des icônes de validation

export default function SigninDialog({ toggleModal }: any) {
  const { loginUser, registerUser } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [phone_number, setPhone] = useState("");
  const randomCode = "123456"; // Code OTP attendu pour vérification
  const [rememberMe, setRememberMe] = useState(false);

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  // Soumettre le code OTP pour vérification
  const handleSubmitOTP = (otp: string[]) => {
    console.log("OTP saisi :", otp.join(""));
    alert("Code OTP validé !");
  };

  // Basculer entre les modes d'inscription et de connexion
  const toggleForm = () => setIsRegistering(!isRegistering);

  // Envoyer un code de vérification par email
  const sendVerificationCode = (email: string) => {
    console.log(`Code de validation envoyé à ${email}`);
    setIsVerifyingEmail(true);
  };

  // Gérer l'inscription et envoyer le code de vérification
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (registerUser) {
      await registerUser(username, email, password, phone_number);
    } else {
      console.error("La fonction d'inscription n'est pas disponible.");
    }
  };

  // Gérer la connexion
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loginUser) {
      await loginUser(email, password);
      toggleModal(); // Fermer le modal après connexion réussie
    } else {
      console.error("La fonction de connexion n'est pas disponible.");
    }
  };

  // Vérifier si le code OTP entré est correct
  const handleVerifyCode = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredCode = otpValues.join("");
    if (enteredCode === randomCode) {
      console.log("Email vérifié avec succès !");
      setIsVerifyingEmail(false);
    } else {
      console.error("Code de validation incorrect !");
    }
  };

  // Encodage de l'email pour affichage masqué
  const encodeEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    return `${localPart.slice(0, 3)}***${localPart.slice(-1)}@${domain}`;
  };

  const EncodedEmail: React.FC<EncodedEmailProps> = ({ email }) => (
    <span className="font-semibold text-orange-500">{encodeEmail(email)}</span>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={toggleModal}
    >
      <div
        className="bg-white w-96 rounded-lg p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-lg text-gray-700" onClick={toggleModal}>
          ✖
        </button>

        {isVerifyingEmail ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Vérification de l'Email</h2>
            <p className="text-sm mb-5 rounded-lg">
              Un code de vérification a été envoyé à votre adresse <EncodedEmail email={email} />
            </p>
            <form onSubmit={handleVerifyCode} className="text-center">
              <BlockInputs randomCode={randomCode} handleSubmit={handleSubmitOTP} />
              <button type="submit" className="w-full py-2 mt-5 bg-black text-white rounded-lg">
                Vérifier
              </button>
              <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">{isRegistering ? "S'inscrire" : "Se connecter"}</h2>
            <p className="text-sm mb-5 rounded-lg">
              {isRegistering ? (
                <>
                  Vous avez déjà un compte ?{" "}
                  <span className="text-sm font-bold underline cursor-pointer text-orange-500" onClick={toggleForm}>
                    Se connecter
                  </span>
                </>
              ) : (
                <>
                  Vous n'avez pas encore de compte ?{" "}
                  <span className="text-sm font-bold underline cursor-pointer text-orange-500" onClick={toggleForm}>
                    S'inscrire
                  </span>
                </>
              )}
            </p>

            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="text-center">
              {isRegistering && (
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 mb-5 border-b border-gray-800 focus:outline-none focus:border-black"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 mb-5 border-b border-gray-800 focus:outline-none focus:border-black"
              />

              {isRegistering && (
                <input
                  type="text"
                  placeholder="Telephone"
                  value={phone_number}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 mb-5 border-b border-gray-800 focus:outline-none focus:border-black"
                />
              )}

              <div className={`${isRegistering ? 'flex gap-4 ':''}`}>
                <div className={`flex items-center mb-5 ${isRegistering ? 'gap-4' : ''}`}>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`py-2 border-b border-gray-800 focus:outline-none focus:border-black ${isRegistering ? "w-full" : "w-full" // Prend toute la largeur lorsqu'on n'est pas en mode inscription
                      }`}
                  />
                  {/* Affiche l'icône de validation si les mots de passe correspondent en mode inscription */}
                  {isRegistering && (
                    passwordsMatch ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      confirmPassword && <FaTimesCircle className="text-green-500" />
                    )
                  )}
                </div>

                {/* Champ de confirmation de mot de passe, uniquement en mode inscription */}
                {isRegistering && (
                  <div className="flex gap-4 items-center mb-5">
                    <input
                      type="password"
                      placeholder="Confirmation"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full py-2 border-b border-gray-800 focus:outline-none focus:border-black"
                    />
                    {/* Affiche l'icône de validation ou d'erreur */}
                    {passwordsMatch ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      confirmPassword && <FaTimesCircle className="text-red-500" />
                    )}
                  </div>
                )}
              </div>

              {!isRegistering && (
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center" onChange={() => setRememberMe(!rememberMe)}>
                    <input type="checkbox" checked={rememberMe} className="mr-2 border-gray-300 rounded focus:ring-0 text-orange-500 checked:bg-orange-500 checked:border-transparent" />
                    <span className="text-sm text-gray-700">Se souvenir de moi</span>
                  </label>
                  <a href="#" className="font-semibold text-xs">
                    Mot de passe oublié ?
                  </a>
                </div>
              )}
              <button type="submit" className="w-full py-2 bg-black text-white rounded-lg">
                {isRegistering ? "Continuer" : "Connexion"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

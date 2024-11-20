export default function SigninDialog({ toggleModal }) {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50  z-50  flex items-center justify-center'
      onClick={toggleModal}
    >
      <div
        className='bg-white w-96 rounded-lg p-6  shadow-lg relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-2 right-2 text-lg text-gray-700'
          onClick={toggleModal}
        >
          ✖
        </button>
        <h2 className='text-2xl font-bold mb-6'>Se connecter</h2>
        <p className=' text-sm mb-5 rounded-lg'>
          Vous n'avez pas encore de compte ?{' '}
          <span className='text-sm font-semibold'>S'inscrire</span>
        </p>
        <form className='text-center'>
          <div className='mb-5'>
            <input
              type='email'
              placeholder='Email'
              className='w-full py-2 border-b border-gray-800 focus:outline-none focus:border-black'
            />
          </div>
          <div className='mb-5'>
            <input
              type='password'
              placeholder='Password'
              className='w-full py-2 border-b border-gray-800 focus:outline-none focus:border-black '
            />
          </div>
          <div className='flex items-center justify-between mt-5  mb-4'>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2 bg-gray-800' />
              <span className='text-sm text-gray-700'>Se souvenir de moi</span>
            </label>
            <a href='#' className='font-semibold text-xs'>
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type='submit'
            className='w-full py-2 mt-5 bg-black max-w-56 text-white rounded-lg'
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

import './news_later.css'

export default function News_later() {
  return (
    <div class="w-auto flex flex-col items-center h-auto content-center py-8 justify-evenly pt-10">
      <h2 class="content-center text-#001122 p-5">News letter</h2>
      <span class="flex items-stretch">
      <input type="email" placeholder='email@gmail.com' id="large-input" class="block w-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-#EBEBEB sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      <button type="button" class="block bg-black text-white p-4 w-auto border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Sign Up</button>
      </span>
      
    </div>
  )
}

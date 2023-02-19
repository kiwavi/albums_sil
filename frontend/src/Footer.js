export default function Footer() {
	return (
	    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-3 dark:bg-gray-900">
	      <div className="sm:flex sm:items-center sm:justify-center">
		<ul className="flex flex-wrap justify-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		  <li>
		    <a href="#" className="mr-4 hover:underline md:mr-6 lg:text-lg">Privacy Policy</a>
		  </li>
		  <li>
		    <a href="#" className="mr-4 hover:underline md:mr-6 lg:text-lg">Licensing</a>
		  </li>
		  <li>
		    <a href="#" className="hover:underline lg:text-lg">Contact</a>
		  </li>
		</ul>
	      </div>
	      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	      <span className="block text-sm lg:text-lg text-gray-500 text-center dark:text-gray-400">© All Rights Reserved.
	      </span>
	    </footer>            
	);
}

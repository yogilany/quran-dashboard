'use client'

import React from "react";
const Footer = () => {
  return (
    <footer className="w-full">

      <div className="mx-auto w-full container p-4 sm:p-6">
        <div className="md:flex md:justify-end">
        {/* <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase  text-white">
                Resources
              </h2>
              <ul className="text-neutral-600  text-neutral-400">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase  text-white">
                Follow us
              </h2>
              <ul className="text-neutral-600  text-neutral-400 text-right">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase  text-white">
                Legal
              </h2>
              <ul className="text-neutral-600  text-neutral-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
         <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
            
              <span className="font-readex  self-center text-xl font-semibold whitespace-nowrap  text-white">
            قـــــــراَن |{" "}
            <span className=" font-readex text-xl font-light whitespace-nowrap  text-teal-300">
              داشبورد
            </span>
          </span>
            </a>
          </div>
      
        </div>
        <hr className="my-6 sm:mx-auto  border-neutral-700 lg:my-8" />
        <div className="text-left sm:flex sm:items-center sm:justify-between">
          <span className="text-xs  sm:text-center  text-neutral-400">
            This Website is designed and developed by{" "}
            <a target="_blank" href="https://yousefgilany.com/" className="hover:underline text-neutral-400">
              Yousef Gilany
            </a>
            
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-neutral-500   hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
         
   
       
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

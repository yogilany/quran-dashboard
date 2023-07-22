"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const ref = useRef()
  const refbuttton = useRef()
  const router = useRouter()



  const { data: session } = useSession();

  const [Providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setNewProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setNewProviders();
  }, []);


  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggleDropdown && ref.current && !ref.current.contains(e.target)) {
        setToggleDropdown(false)
      }
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggleDropdown && ref.current && !ref.current.contains(e.target)) {
        setToggleDropdown(false)
      }


    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [toggleDropdown])
  return (
    <nav className="flex flex-row-reversed justify-between w-full py-3  border-neutral-600 border-b">
      
        <a href="/" className="flex items-center">
        <div className=" font-readex text-xl font-light whitespace-nowrap text-teal-500">

          قـــــــراَن {" "}
          <span className="font-readex  self-center text-xl font-medium whitespace-nowrap dark:text-white">
              داشبورد
            </span>
          </div>
        </a>

      {/* DESKTOP */}
      <div className=" sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-2 md:gap-2">
            <button
              className="transparent_btn_solid"
              type="button"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              تسجيل الخروج
            </button>


          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="transparent_btn_solid"
                  onClick={() => {signIn(provider.id);
                 
}}
                >
                  تسجيل الدخول
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="flex gap-3 md:gap-5">
            
              {/* <Link href={`/profile/${session?.user.id}`}>
                <Image
                  src={session?.user?.image}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
              </Link> */}

              {/* <svg
              ref={refbuttton}
                onClick={() => setToggleDropdown((prev) => !prev)}
                className=" w-7 h-7 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg> */}

              {/* </Link> */}
            </div>

           
          </div>
        ) : (
          <>
                        <div className="flex gap-3 md:gap-5">

            {Providers &&
              Object.values(Providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="transparent_btn_solid"
                  onClick={() => {signIn(provider.id);
              
}}
                >
                  تسجيل الدخول
                </button>
              ))}
                 {/* <svg
                onClick={() => setToggleDropdown((prev) => !prev)}
                className=" w-7 h-7 cursor-pointer text-teal-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg> */}
              </div>
              {toggleDropdown && (
              <div className="dropdown " ref={ref}>
                <div className="py-3 text-sm text-gray-900 dark:text-white">
                  <Link href={`/profile/${session?.user.id}`}>
                    {/* <Image
                      src={session?.user?.image}
                      width={30}
                      height={30}
                      alt="profile"
                      className="rounded-full"
                      // onClick={() => setToggleDropdown((prev) => !prev)}
                    /> */}
                  </Link>
                </div>
                <Link href="/" className="dropdown_link">
                  الصفحة الرئيسية
                </Link>
            
          
          
               
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

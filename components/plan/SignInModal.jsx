"use client";

// import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const SignInModal = ({ isOpen, onClose, plan }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const { data: session } = useSession();
  const router = useRouter();
  const [Providers, setProviders] = useState(null);

  useEffect(() => {
    const setNewProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setNewProviders();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);



  function handleConfirm(e) {
    e.preventDefault();
    signIn(provider.id);
    closeModal();
  }
  return (
    <>
      {showModal && (
        <div
          id="popup-modal"
          tabindex="-1"
          className="fixed inset-0 flex items-center justify-center  top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="fixed inset-0 bg-neutral-800 opacity-75"></div>

          <div className="relative w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow  bg-neutral-700">
              <button
                onClick={closeModal}
                type="button"
                className=" absolute top-3 right-2.5 text-neutral-300 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  hover:bg-neutral-600  hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 w-12 h-12  text-neutral-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                  />
                </svg>

                <h3 className=" font-readex mb-5 text-lg font-normal text-neutral-300">
عليك تسجيل الدخول أولاً حتى تتمكن من تسجيل الخطة                </h3>
{Providers &&
              Object.values(Providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="mx-2 font-readex text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none  focus:ring-teal-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  تسجيل الدخول
                </button>
              ))}
             
                <button
                  onClick={closeModal}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="mx-2 font-readex  focus:ring-4 focus:outline-none rounded-lg border  text-sm font-medium px-5 py-2.5  focus:z-10  bg-neutral-700  text-neutral-300  border-neutral-500  hover:text-white  hover:bg-neutral-600  focus:ring-neutral-600"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;

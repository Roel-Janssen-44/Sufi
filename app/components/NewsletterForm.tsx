// 'use client';

// import {useState} from 'react';
// import {signupToNewsletter} from '../lib/actions';

// export default function NewsletterForm() {
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const email = formData.get('email') as string;
//     if (!email) {
//       return;
//     }
//     signup(email);
//   };

//   const signup = async (email: string) => {
//     try {
//       await signupToNewsletter(email);
//       console.log('Successfully signed up!');
//     } catch (error) {
//       console.error('Failed to sign up:', error);
//     }
//   };

//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="m-20 p-20">
//         <button onClick={() => setOpen(!open)}>skhjdbkjas</button>
//         {open && (
//           <>
//             <h3 className="mb-4">Newsletter signup</h3>
//             <form onSubmit={handleSubmit}>
//               <label htmlFor="email">Email</label>
//               <input
//                 //   type="email"
//                 name="email"
//                 id="email"
//               />
//               <button
//                 type="submit"
//                 className="cursor-pointer newsletter-form__button field__button"
//                 name="commit"
//                 id="Subscribe"
//                 aria-label="Subscribe"
//               >
//                 Submit
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

import {useModal} from './NewsletterModalContext';
import {signupToNewsletter} from '../lib/actions';

const Modal = () => {
  const {isModalOpen, toggleModal} = useModal();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') as string;
    if (!email) {
      return;
    }
    signup(email);
  };

  const signup = async (email: string) => {
    try {
      await signupToNewsletter(email);
      console.log('Successfully signed up!');
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };
  return (
    <>
      {isModalOpen && (
        <>
          <button
            onClick={toggleModal}
            className="fixed z-30 left-0 top-0 w-screen h-screen bg-black opacity-25"
          ></button>
          <div className="fixed pt-20 pb-10 p-4 z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] sm:max-w-96 rounded-lg h-auto bg-white flex-col flex items-center justify-center">
            <div className="flex flex-col items-center justify-between w-full">
              {/* <div className="w-20 h-20 mb-3 text-primary-green">
                <svg
                  color="#e88a60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                > */}
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              {/* <path
                    color="currentColor"
                    fill="currentColor"
                    d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"
                  />
                </svg>
              </div> */}
              <h2 className="mb-4 text-center">Subscribe to our Newsletter</h2>
              <button className="cursor-pointer" onClick={toggleModal}>
                <span className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                //   type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="cursor-pointer newsletter-form__button field__button bg-primary-orange text-background px-3 py-2 rounded ml-2"
                name="commit"
                id="Subscribe"
                aria-label="Subscribe"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

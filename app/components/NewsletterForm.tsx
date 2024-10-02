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

// Modal.js
import {useModal} from './NewsletterModalContext';

const Modal = () => {
  const {isModalOpen, toggleModal} = useModal();

  return (
    <>
      {isModalOpen && (
        <>
          <button
            onClick={toggleModal}
            className="fixed z-30 left-0 top-0 w-screen h-screen bg-black opacity-25"
          ></button>
          <div className="fixed z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] sm:max-w-96 rounded-lg aspect-square bg-white flex-col flex items-center justify-center">
            <h2>Subscribe to our Newsletter</h2>
            <form>{/* Form fields go here */}Form</form>
            <button className="cursor-pointer" onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

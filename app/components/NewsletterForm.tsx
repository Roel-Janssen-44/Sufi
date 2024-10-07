'use client';

import {useModal} from './NewsletterModalContext';
import {signupToNewsletter} from '../lib/actions';
import {useState} from 'react';

const Modal = () => {
  const [status, setStatus] = useState<string>();

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
    setStatus('loading');
    try {
      await signupToNewsletter(email);
      setStatus('success');
      console.log('Successfully signed up!');
    } catch (error) {
      console.error('Failed to sign up:', error);
      setStatus('error');
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
              <h2 className="mb-3 text-center">Subscribe to our Newsletter</h2>
              <h3 className="mb-3">
                {status == 'loading' && 'Loading...'}
                {status == 'success' && 'Thank you for subscribing!'}
                {status == 'error' && 'Failed to subscribe. Please try again.'}
              </h3>
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
                type="email"
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

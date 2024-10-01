'use client';

import {signupToNewsletter} from '../lib/actions';

export default function NewsletterForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // signup(e.target);
    console.log(e.target);
    // const email = e.target.
    // const formData = new FormData(formData);
    const formData = new FormData(e.target);
    const email = formData.get('email') as string;
    console.log(email);
    if (!email) {
      return;
    }
    console.log('sign up');
    signup(email);
  };

  const signup = async (email: string) => {
    try {
      //   const formData = new FormData(formData);
      //   console.log('formData client');
      //   console.log(formData);
      //   const email = formData.get('email');
      console.log('email clinet', email);
      await signupToNewsletter(email);
      console.log('Successfully signed up!');
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <>
      <div className="m-20 p-20">
        Newsletter signup
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            //   type="email"
            name="email"
            id="email"
          />
          <button
            type="submit"
            className="cursor-pointer newsletter-form__button field__button"
            name="commit"
            id="Subscribe"
            aria-label="Subscribe"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

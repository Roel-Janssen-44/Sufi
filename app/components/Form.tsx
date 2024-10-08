import Link from 'next/link';
import {useState, useRef} from 'react';

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default function Form() {
  // Handle inputs
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    checkbox: false,
  });

  const form = useRef(null);

  const [status, setStatus] = useState('');
  const [loader, setLoader] = useState(false);
  const [nameErrorValue, setNameErrorValue] = useState('');
  let nameError = true;
  const [emailErrorValue, setEmailErrorValue] = useState('');
  let emailError = true;
  const [phoneErrorValue, setPhoneErrorValue] = useState('');
  let phoneError = true;
  const [messageErrorValue, setMessageErrorValue] = useState('');
  let messageError = true;
  const [checkboxErrorValue, setCheckboxErrorValue] = useState('');
  let checkboxError = true;

  const [sendStatus, setSendStatus] = useState('');

  const handleChange = (event: any) => {
    if (event.target.id === 'checkbox') {
      setInputs((values) => ({...values, ['checkbox']: !inputs.checkbox}));
      return;
    }
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({...values, [name]: value}));
  };

  // Single inputs checks
  const handleName = () => {
    if (inputs.name === '' || inputs.name === undefined) {
      nameError = true;
      setNameErrorValue('Fill in a name');
      return;
    }
    if (inputs.name !== '') {
      nameError = false;
      setNameErrorValue('');
    }
  };
  const handleEmail = () => {
    if (inputs.email === '' || inputs.email === undefined) {
      emailError = true;
      setEmailErrorValue('Fill in an email address');
      return;
    }
    if (inputs.email !== '') {
      emailError = false;
      setEmailErrorValue('');
    }
  };
  const handlePhone = () => {
    if (inputs.phone === '' || inputs.phone === undefined) {
      phoneError = true;
      setPhoneErrorValue('Fill in a phone number');
      return;
    }
    if (inputs.phone !== '') {
      phoneError = false;
      setPhoneErrorValue('');
    }
  };
  const handleMessage = () => {
    messageError = false;
    setMessageErrorValue('');
  };
  const handleCheckbox = () => {
    if (inputs.checkbox) {
      checkboxError = false;
      setCheckboxErrorValue('');
      return;
    }
    setCheckboxErrorValue('Accept the terms and conditions and privacy policy');
  };

  const handleForm = (event: any) => {
    handleName();
    handleEmail();
    handlePhone();
    handleMessage();
    handleCheckbox();
    if (
      nameError === false &&
      emailError === false &&
      phoneError === false &&
      messageError === false &&
      checkboxError === false
    ) {
      setLoader(true);
      setStatus('');
      handleSubmit(event, inputs);
    }
  };

  const handleSubmit = async (event: any, inputs: any) => {
    event.preventDefault();
    setSendStatus('Aan het laden...');
    const data = new FormData(form.current!);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    })
      .then((res: any) => res.json())
      .then((res) => {
        if (res.success) {
          setSendStatus('Sent');
        } else {
          setSendStatus(
            'Because of a technical failure the message was not sent.',
          );
        }
      });
  };

  return (
    <>
      <p
        className={`text-xl mb-10 ml-1 ${
          sendStatus === 'Sent' ? 'text-green-600' : ''
        } 
      ${sendStatus === 'Loading...' ? 'text-gray' : ''}
      ${
        sendStatus ===
        'Because of a technical failure the message was not sent.'
          ? 'text-red-600'
          : ''
      }`}
      >
        {sendStatus}
      </p>
      <form ref={form}>
        {/* Todo - update accesskey */}
        {/* <input
          type="hidden"
          name="access_key"
          value="6a218f25-e603-432d-98a1-0c09bb55e009"
        /> */}
        <div className="w-full md:top-20 max-w-md mx-auto sm:max-w-none">
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:mr-[2.5%] lg:inline-block">
            <input
              style={{borderColor: '#264b0e', borderWidth: 2}}
              onChange={handleChange}
              className=" peer border-2 border-[#e88a60] py-2 px-2 mb-1 w-full "
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <label htmlFor="name" className="sr-only">
              Name *
            </label>
            <p className="text-[red] w-full">{nameErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:ml-[2.5%] lg:inline-block">
            <input
              style={{borderColor: '#264b0e', borderWidth: 2}}
              onChange={handleChange}
              className="text-gray peer border-2 border-[#e88a60] py-2 px-2 mb-1 w-full"
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
            />
            <label htmlFor="phone" className="sr-only">
              Phone *
            </label>
            <p className="text-[red] w-full">{phoneErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <input
              style={{borderColor: '#264b0e', borderWidth: 2}}
              onChange={handleChange}
              className="text-gray peer border-2 border-[#e88a60] py-2 px-2 mb-1 w-full"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <label htmlFor="email" className="sr-only">
              Email *
            </label>
            <p className="text-[red] w-full">{emailErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <textarea
              style={{borderColor: '#264b0e', borderWidth: 2}}
              onChange={handleChange}
              className="text-gray peer border-2 rounded border-[#e88a60] py-2 px-2 mb-1 w-full"
              rows={3}
              id="message"
              name="message"
              placeholder="Message"
            />
            <label htmlFor="message" className="sr-only">
              Message *
            </label>
            <p className="text-[red] w-full">{messageErrorValue}</p>
          </div>

          <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full mb-8 -mt-4">
            <input
              className="text-blue peer border-2 mr-2 border-[#e88a60] py-2 px-2 mb-1"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={handleChange}
            />
            <label htmlFor="checkbox" className="cursor-auto text-black">
              I've read the
              <a
                href="/policies/terms-and-conditions"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {' '}
                Term and conditions{' '}
              </a>
              and the
              <a
                href="/policies/privacy-policy"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {' '}
                Privacy policy{' '}
              </a>
              and agree with this *
            </label>
            <p className="text-[red] w-full">{checkboxErrorValue}</p>
          </div>

          <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <button
              onClick={() => {
                handleForm(event);
                setLoader(false);
                setStatus('');
              }}
              type="button"
              className="cursor-pointer block px-6 py-2 rounded border-2 border-[#e88a60]"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

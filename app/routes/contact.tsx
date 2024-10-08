import Form from '~/components/Form';

export default function Contact() {
  return (
    <>
      <div
        style={{maxWidth: 1000}}
        className="relative my-28 container max-w-2xl"
      >
        <div className="item container mx-auto max-w-7xl">
          <div className="mb-20 md:mb-0 w-full md:px-12 md:w-7/12 md:float-left">
            <Form />
          </div>
          <div className="w-full sm:w-8/12 mx-auto md:px-12 md:w-5/12 md:float-left">
            <div className="mb-10 max-w-md mx-auto relative sm:float-left sm:w-1/2 md:mt-10 md:w-full lg:mt-0">
              <h4
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                className="text-blue font-bold font-inter text-lg w-10/12 mx-auto sm:mx-0 md:lg-auto mb-3"
              >
                Contactgegevens
              </h4>
              <div className="text-gray w-10/12 mx-auto md:mx-auto">
                <ul>
                  <li className="mb-2 text-darkblue">+31 6 147 425 43</li>
                  <li className="mb-2 text-darkblue">info@studiosufi.com</li>
                  <li className="mb-2 text-darkblue">www.studiosufi.com</li>
                </ul>
              </div>
            </div>
            <div className="max-w-md mx-auto sm:float-left sm:w-1/2 md:w-full">
              <h4
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                className="text-blue font-bold font-inter text-lg w-10/12 mx-auto sm:mx-0 md:lg-auto mb-3"
              >
                Locatie
              </h4>
              <div className="text-gray w-10/12 mx-auto md:mx-auto">
                <ul>
                  <li className="mb-2 text-darkblue">Anjelierenstraat 40</li>
                  <li className="mb-2 text-darkblue">6214SW Maastricht</li>
                </ul>
              </div>
            </div>
            <div className="clear-both"></div>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
    </>
  );
}

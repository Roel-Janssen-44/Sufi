import {useModal} from './NewsletterModalContext';

const SubscribeButton = () => {
  const {toggleModal} = useModal();

  return (
    <button onClick={toggleModal}>
      <img
        aria-hidden
        className="cursor-pointer w-44 hover:opacity-80 transition-opacity"
        src="/images/notify-me.png"
      />
      <span className="sr-only">Notify me</span>
    </button>
  );
};

export default SubscribeButton;

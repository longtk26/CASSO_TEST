const matchText = {
    checkout: {
        text: "Buy",
    },
    payment: {
        text: "Thanh toán",
    },
};

const Button = ({ type, handleOnClick }) => {
    return (
        <button
            className="hover:bg-primary px-4 py-2 mt-10 bg-second text-white font-bold rounded-xl w-full"
            onClick={handleOnClick}
        >
            {matchText[type].text}
        </button>
    );
};

export default Button;

const Button = ({ content }) => {
  return (
    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
      {content}
    </button>
  );
};

export default Button;

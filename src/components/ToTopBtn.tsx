
interface ToTopBtnProps {
  onClick: () => void;
}

const ToTopBtn = ({ onClick }: ToTopBtnProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
      ↑
    </button>
  );
};

export default ToTopBtn;
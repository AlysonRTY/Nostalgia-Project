import FadeIn from './FadeIn';

interface DividerSectionProps {
  text: string;
  isBold?: boolean;
  onClick: () => void;
}

const DividerSection = ({ text, isBold = false, onClick }: DividerSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-end mb-12 h-96 rounded-lg relative bg-divider-image">
      <FadeIn>
        <p className={`text-xl text-center mb-4 text-white ${isBold ? 'font-bold' : ''}`}>
          {text}
        </p>
        <div className="flex justify-center w-full pb-8">
          <button
            onClick={onClick}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Go to Top ↑
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default DividerSection;
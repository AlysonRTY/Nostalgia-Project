import FadeIn from './FadeIn';

interface DividerSectionProps {
  text: string;
  onClick: () => void;
}

const DividerSection = ({ text, onClick }: DividerSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-end mb-12 h-96 rounded-lg relative bg-divider-image">
      <FadeIn>
        <p className="text-xl text-center mb-4 text-white">
          {text}
        </p>
        <div className="flex justify-center w-full pb-8">
          <button
            onClick={onClick}
            className="scroll-to-top-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Top ↑
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default DividerSection;
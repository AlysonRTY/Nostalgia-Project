import { useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-lg">There's nothing here.</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
}
export default ErrorPage;

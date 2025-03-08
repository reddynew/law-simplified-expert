
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-legal-light p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-legal-DEFAULT text-white text-3xl font-bold mb-6">
          404
        </div>
        <h1 className="heading-lg mb-4">Page Not Found</h1>
        <p className="text-legal-muted mb-8">
          We couldn't find the page you were looking for. The page may have been moved, deleted, or never existed.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-legal-DEFAULT text-white rounded-md font-medium hover:bg-legal-accent base-transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

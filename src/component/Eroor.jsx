import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="error-page">
            <div className="error-card">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, we couldn't find the page you're looking for.</p>
                <Link to="/" className="btn-home">Go Home</Link>
            </div>
        </div>
    );
};

export default Error;
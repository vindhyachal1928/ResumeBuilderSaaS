import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">
                ResumeBuilder
            </h1>
            <ul className="flex gap-8">
                <li>Home</li>
                <li>Templates</li>
                <li>Pricing</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-white-800"
                >
                    Login
                </Link>
                <Link
                    to="/Signup"
                    className="px-4 py-2"
                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                >
                    Signup
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
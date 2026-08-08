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
                <button className="px-4 py-3">
                    Login
                </button>
                <button className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                    Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
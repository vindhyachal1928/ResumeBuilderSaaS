function Footer() {
    return (
        <footer className="bg-gray-900 px-8 py-12 text-white">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div >
                    <h2 className="text-2xl font-bold">
                    ResumeBuilder AI 
                    </h2>
                    <p className="mt-4 text-gray-400">
                    Build professional resumes with the power of AI.
                    </p>
                </div>
                
                {/* Product */}
                <div>
                    <h3 className="font-semibold">
                        Product
                    </h3>
                    <ul className="mt-4 space-y-3 text-gray-400">
                        <li>Features</li>
                        <li>Templates</li>
                        <li>Pricing</li>
                        <li>ATS Checker</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold">
                        Company
                    </h3>
                    <ul className="mt-4 space-y-3 text-gray-400">
                        <li>About</li>
                        <li>Contact</li>
                        <li>Careers</li>
                        <li>Help Center</li>
                    </ul>
                </div>
                {/* Legal */}
                <div>
                    <h3 className="font-semibold">
                        Legal
                    </h3>
                    <ul className="mt-4 space-y-3 text-gray-400">
                        <li>Privacy Policy</li>
                        <li>Terms of "Service</li>
                    </ul>
                </div>
            </div>
            {/* Bottom */}
            <div className="mx-auto mt-10 max-w-6xl border-t border-gray-700 pt-6 text-center text-gray-400">
                <p>
                    © 2026 ResumeBuilder AI. Built with ❤️.
                </p>
            </div>
        </footer>
    );
}
export default Footer;
function Signup() {
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">

            <div className="w-full max-w-md mx-auto rounded-xl bg-white p-8 shadow-md">

                <h1 className="text-center text-3xl font-bold">
                    Welcome
                </h1>

                <p className="mt-2 text-center text-gray-600">
                    Signup to your ResumeAI account
                </p>
                
                <form className="mt-8">
                    <div>
                        <label className="mb-2 block font-medium">
                            Name
                        </label>
                        <input
                            type="Name"
                            placeholder="Enter your name."
                            className="w-full rounded-ld border px-4 py-3 outline-none focus-border-blue-6"
                        />
                    </div>
                    <div className="mt-5">
                        <label mb-2 block font-medium>
                            Email
                        </label>
                        <input
                            type="Email"
                            placeholder="Enter your email."
                            className="w-full rounded-ld border px-4 py-3 outline-none focus-border-blue-6"
                        />
                    </div>
                        
                    <div className="mt-5">
                        <label mb-2 block font-medium>
                            Password
                        </label>
                        <input
                            type="Password"
                            placeholder="Enter your password."
                            className="w-full rounded-ld border px-4 py-3 outline-none focus-border-blue-6 " 
                        />
                    </div>
                        
                    <div className="mt-5">
                        <label mb-2 block font-medium>
                            Confirm Password
                        </label>
                        <input
                            type="Confirm Password"
                            placeholder="Confirm password."
                            className="w-full rounded-ld border px-4 py-3 outline-none focus-border-blue-6"
                        />
                    </div>
                    
                    <button
                        type="Submit"
                        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Create Account
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default Signup;
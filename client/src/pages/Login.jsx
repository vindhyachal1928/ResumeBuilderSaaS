function Login() {
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                
                <h1 className="text-center text-3xl font-bold">
                    Welcome back
                </h1>

                <p className="mt-2 text-center text-gray-600">
                    Login to your ResumeAI account
                </p>

                <form className="mt-8">

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-6"

                        />
                    </div>

                    <div className="mt-5">

                        <label className="mb-2 block font-mediun">
                            Password
                        </label>

                        <input
                            type="Password"
                            placeholder="Enter your password"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-6"

                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?
                </p>

            </div>

        </div>
    );
}

export default Login;
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function App({ Component, pageProps }) {
    const [message, setMessage] = useState({});
    const [click, setClicked] = useState(false);
    const route = useRouter();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;

        axios.post("/api/shop_login", { email, password }).then((res) => {
            const user = res.data;
            if (user.type === "buyer") {
                localStorage.setItem("shop_user", JSON.stringify(user));
                route.push("/shop");
            } else if (user.type === "seller") {
                localStorage.setItem("shop_user", JSON.stringify(user));
                route.push("/seller_dashboard");
            } else if (user.type === "admin") {
                localStorage.setItem("admin_user", JSON.stringify(user));
                route.push("/ecomm_dashboard");
            } else {
                toast.error("Incorrect email or password!");
            }
        }).catch(() => {
            toast.error("Incorrect email or password!");
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        const type = "general";

        axios.post("/api/shop_register", { user: { email, password, type, name } }).then((res) => {
            const user = res.data;
            localStorage.setItem("shop_user", JSON.stringify(user));
            if (user.type === "buyer") {
                route.push("/shop");
            }
        }).catch(() => {
            toast.error("Email already exists!");
        });
    };

    let showMessage = (message) => {
        setMessage(message)
        let alert = document.querySelector("#message")
        alert.classList.add("px-2")
        alert.classList.add("py-2")
        setTimeout(() => {
            setMessage({})
            alert.classList.remove("px-2")
            alert.classList.remove("py-2")
        }, 2000)
    }

    return (

        <><div class="bg-white shadow">
            <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <a href="/shop_login" class="text-2xl font-semibold text-gray-800">ShopYE</a>
                    <ul class="flex space-x-6">
                        <li class="relative group">
                            <button class="text-gray-600 hover:text-teal-400 focus:outline-none">
                                <a href="/bank_login" class="text-gray-600 hover:text-teal-400 focus:outline-none">
                                    Bank Login
                                </a>
                            </button>
                            <ul class="hidden absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg divide-y divide-gray-300 group-hover:block">
                            </ul>
                        </li>
                        <li><a href="#" class="text-gray-600 hover:text-teal-400">About</a></li>
                    </ul>
                </div>
            </div>
        </div>

            {click == false ? <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-blue-600">
                <div class="mb-8 p-6 bg-white shadow-lg rounded-lg backdrop-blur-md w-full max-w-md">
                    <h1 class="text-4xl font-semibold text-center text-gray-800">Welcome to ShopYE</h1>
                    <p class="text-gray-600 mt-2 text-center">Login to access your account.</p>
                </div>

                <div class="w-full max-w-md mt-8 p-6 bg-white shadow-lg rounded-lg backdrop-blur-md transform scale-105 transition-transform duration-300">
                    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
                    <form id="loginForm" class="space-y-4" onSubmit={handleLoginSubmit}>
                        <div>
                            <label for="email" class="block font-medium text-lg text-gray-700">Email</label>
                            <input type="email" id="email" name="email" class="form-input mt-2 w-full py-2 rounded border focus:ring-teal-400" placeholder="Your email" required />
                            <p id="emailError" class="text-red-500"></p>
                        </div>
                        <div>
                            <label for="password" class="block font-medium text-lg text-gray-700">Password</label>
                            <input type="password" id="password" name="password" class="form-input mt-2 w-full py-2 rounded border focus:ring-teal-400" placeholder="Your password" required />
                            <p id="passwordError" class="text-red-500"></p>
                        </div>
                        <div class="flex items-center justify-between">
                            <button type="submit" class="bg-teal-400 hover:bg-teal-500 text-white py-3 px-6 rounded transition-colors duration-300 transform hover:scale-105">Login</button>
                            <div class="text-gray-400 hover:text-teal-400"><button onClick={() => {
                                setClicked(true);

                            }}>Register</button></div>
                        </div>

                    </form>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div> : <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-blue-600">
                <div class="mb-8 p-6 bg-white shadow-lg rounded-lg backdrop-blur-md w-full max-w-md">
                    <h1 class="text-4xl font-semibold text-center text-gray-800">Welcome to ShopYE</h1>
                    <p class="text-gray-600 mt-2 text-center">Register to access the Ecommerce.</p>
                </div>

                <div class="w-full max-w-md mt-8 p-6 bg-white shadow-lg rounded-lg backdrop-blur-md transform scale-105 transition-transform duration-300">
                    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>
                    <form id="loginForm" class="space-y-4" onSubmit={handleRegisterSubmit}>
                        <div>
                            <label for="name" class="block font-medium text-lg text-gray-700">Name</label>
                            <input type="text" id="name" name="name" class="form-input mt-2 w-full py-2 rounded border focus:ring-teal-400" placeholder="Your Name" required />
                            <p id="nameError" class="text-red-500"></p>
                        </div>

                        <div>
                            <label for="email" class="block font-medium text-lg text-gray-700">Email</label>
                            <input type="email" id="email" name="email" class="form-input mt-2 w-full py-2 rounded border focus:ring-teal-400" placeholder="Your email" required />
                            <p id="emailError" class="text-red-500"></p>
                        </div>

                        <div>
                            <label for="password" class="block font-medium text-lg text-gray-700">Password</label>
                            <input type="password" id="password" name="password" class="form-input mt-2 w-full py-2 rounded border focus:ring-teal-400" placeholder="Your password" required />
                            <p id="passwordError" class="text-red-500"></p>
                        </div>
                        <div class="flex items-center justify-between">
                            <button type="submit" class="bg-teal-400 hover:bg-teal-500 text-white py-3 px-6 rounded transition-colors duration-300 transform hover:scale-105">Register</button>
                            <div class="text-gray-400 hover:text-teal-400"><button onClick={() => {
                                setClicked(false);

                            }}>Login</button></div>
                        </div>

                    </form>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>}














        </>
    )
}
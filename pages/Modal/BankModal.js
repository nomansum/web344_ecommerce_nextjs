import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast"

const Modal = ({ user, setUser }) => {
  console.log(user)
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({})
  const router = useRouter()
  const toggleModal = () => {
    setIsOpen(!isOpen);
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

  const handleLogin = (e) => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let account = e.target.account.value
    axios.post("/api/shop_bank_login", { user: localStorage.getItem("shop_user"), bank: { email, password, account } }).then(res => {
      console.log(res.data)

      localStorage.setItem("shop_user", JSON.stringify(res.data))
      setUser(res.data)
      toggleModal()
    }).catch(e => {
      showMessage({ head: "Sorry! ", body: "Wrong email password" })
      toast.error("Wrong email password!")
    }
    )
    // Handle login functionality
  };
  let handleLogout = (e) => {
    localStorage.setItem("shop_user", null)
    router.push("/")
  }


  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("shop_user")))
    if (!JSON.parse(localStorage.getItem("shop_user")).bank)
      toggleModal()
  }, [])
  return (
    <div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg p-8">
            <img className="mx-auto mb-4" src="bank.jpg" alt="Bank Logo" height="300" width="300" />
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>


              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="account"
                >
                  Account Number
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="account"
                  type="account"
                  placeholder="Enter your accunt number"
                  required
                />
              </div>


              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <a href="" onClick={handleLogout} class="text-gray-400 hover:text-red-600 ">Logout</a>
              </div>
            </form>
          </div>

          <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
            <strong class="font-bold">{message.head} </strong>
            <span class="block sm:inline">{message.body}</span>
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
      )}

    </div>
  );
};

export default Modal;

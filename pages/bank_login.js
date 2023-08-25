import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Toaster,toast } from "react-hot-toast"


export default function Login() {
    const [errorMessage,setErrorMessage]=useState("");
    let router=useRouter();
  return (

    <div class="bg-white min-h-screen text-gray-200">
    <nav class="bg-teal-400 shadow p-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div class="text-xl font-semibold">Bank!</div>
            <a href="/" class="text-white hover:underline">Shop Login</a>
        </div>
    </nav>

    <div id="alert" class="alert">
        {errorMessage}
    </div>
    <div class="flex items-center justify-center h-screen p-8 space-x-4">
        <div class="w-1/2 bg-white  rounded-lg  hover:shadow-xl p-8">
            <img class="mx-auto mb-4" src="bank.jpg" alt="Bank Logo"/>
        </div>

        <div class="w-1/2 bg-white  rounded-lg shadow-lg hover:shadow-xl p-8">
            <div id="2">
                <h1 class="text-3xl font-bold mb-4 text-gray-200">Login</h1>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-100 focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" required/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="account">Account</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-100 focus:outline-none focus:shadow-outline" id="account" type="account" placeholder="Enter your account" required/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-100 focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" required/>
                </div>
                <div class="flex items-center justify-between">
                    <button onClick={showErrorMessage} class="bg-teal-400 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                </div>
            </div>
        </div>
    </div>

    <Toaster position="top-center" reverseOrder={false}/>
</div>

      

    )

    function showErrorMessage() {
      let email=document.getElementById("email").value
      let password=document.getElementById("password").value
      let account = document.getElementById("account").value
      
      axios.post("api/bank_login",{email,password,account}).then(res=>{
        let user=res.data
        console.log(user)
        if(user.error)
        {
          const alertElement = document.getElementById("alert");
          //alertElement.style.display = "block";
          toast.error("Wrong email or account or password!")
          setErrorMessage(user.error)
        }
        else
        {
          localStorage.setItem("user",JSON.stringify(user))
          if(user.type=="admin")
            router.push("/admin_dashboard")
          else
            router.push("/bank_user")
        }
      })
      }
}


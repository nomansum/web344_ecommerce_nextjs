import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios";
export default function App({ Component, pageProps }) 
{
const [transactions,setTransactions]=useState([])
const [user,setUser]=useState([])
const router = useRouter();
useEffect(()=>{

    let login=JSON.parse(localStorage.getItem("user"))

        
    if(!login||login.type!="general")
      router.push('/bank_login')

      axios.post('/api/get_user_transaction',{email:login.email}).then(res=>{
        setTransactions(res.data)
    })
      setTransactions([{to:"ab@gmail.com",from:"cc@gmail.com",amount:-10,time:"12/9/12"}])
    setUser(login)
},[])    
return(<div>
  <div class="flex h-screen">
    <div class="bg-teal-400 text-white w-1/4 flex flex-col justify-between">
      <div>
        <h1 class="text-2xl font-bold p-4">User Dashboard</h1>
        <div class="p-4 user-info">
          <h2 class="text-lg font-bold mb-4">User Information</h2>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="name">Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={user.name} disabled />
          </div>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={user.email} disabled />
          </div>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="balance">Account Balance(Taka)</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline highlight-balance" id="balance" type="text" value={user.balance} disabled />
          </div>
        </div>
      </div>
      <div class="my-8 mx-auto" >
        <button class="bg-teal-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  onClick={e=>{localStorage.removeItem("user");router.push('/bank_login');}}>Logout</button>
      </div>
    </div>

    <div class="bg-gray-100 flex-grow p-4">
      <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-4">Transactions</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">From</th>
              <th class="py-2 px-4 border-b">To</th>
              <th class="py-2 px-4 border-b">Amount (Taka)</th>
              <th class="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction=>(
                
            <tr>
              <td class="py-2 px-4 border-b w-1/4 overflow-auto">{transaction.from}</td>
              <td class="py-2 px-4 border-b w-1/4 overflow-auto">{transaction.to}</td>
              <td class="py-2 px-4 border-b w-1/4 overflow-auto">{transaction.amount}</td>
              <td class="py-2 px-4 border-b w-1/4 overflow-auto">{transaction.time}</td>
            </tr>
            
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>)}
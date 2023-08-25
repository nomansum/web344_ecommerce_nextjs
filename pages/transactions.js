import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';

import { Toaster, toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [transactions, setTransactions] = useState([])
  const [errorMessage, setErrorMessage] = useState("");

  let hideErrorMessage = () => {
    const alertElement = document.getElementById("alert");
    alertElement.style.display = "none";
    setErrorMessage("")
  }
  let showErrorMessage = (message) => {
    const alertElement = document.getElementById("alert");
    alertElement.style.display = "block";
    setErrorMessage(message)
  }

  useEffect(() => {

    let login = JSON.parse(localStorage.getItem("user"))

    if (!login || login.type != "admin")
      router.push('/bank_login')

    axios.get('/api/get_all_transaction').then(res => {
      setTransactions(res.data)
    })
  }, [])
  let submit = (e) => {
    e.preventDefault()
    let to = e.target.email.value
    let amount = e.target.amount.value
    let from = "admin@gmail.com"
    let time = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    axios.post('/api/do_transaction', { to, from, amount, time }).then(res => {
      console.log(res.data)
      if (res.data.error) {
        showErrorMessage(res.data.error)
        return
      }
      let newtransactions = []
      transactions.forEach(transaction => {
        newtransactions.push(transaction)
      })
      newtransactions.push(res.data)
      setTransactions(newtransactions)
      toast.success("Trasaction successful!")
      e.target.email.value = ""
      e.target.amount.value = ""
      hideErrorMessage()
    })

  }
  return (
    <div>
      <div class="flex h-screen">
        <div class="bg-teal-400 text-white w-1/4 flex flex-col justify-between">
          <div>
            <h1 class="text-2xl font-bold p-4">Admin Dashboard</h1>
            <form class="p-4" onSubmit={submit}>
              <h2 class="text-lg font-bold mb-4">Make Transaction</h2>
              <div class="mb-4">
                <label class="block text-gray-200 text-sm font-bold mb-2" for="name">Email</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Enter email" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-200 text-sm font-bold mb-2" for="email">Amount</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" name="amount" type="number" placeholder="Enter amount" />
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-teal-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Transact</button>
              </div>
              <div id="alert" class="alert mt-4">
                {errorMessage}
              </div>
            </form>
          </div>

          <form class="p-4" action="logout.php" method="post">
            <a class="sidebar-link " type="submit" href="/admin_dashboard">Users</a>
            <a class="sidebar-link p-4 font-bold mb-4 cursor-pointer" onClick={e => { localStorage.removeItem("user"); router.push('/bank_login'); }}>Logout</a>
          </form>

        </div>
        <div class="bg-gray-100 flex-grow p-4">
          <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-bold mb-4">Transactions</h3>
            <table class="table">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">ID</th>
                  <th class="py-2 px-4 border-b">FROM</th>
                  <th class="py-2 px-4 border-b">TO</th>
                  <th class="py-2 px-4 border-b">AMOUNT</th>
                  <th class="py-2 px-4 border-b">TIME</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr>
                    <td class="border-b py-2 px-2 w-1/4">{transaction._id}</td>
                    <td class="border-b py-2 px-2 ">{transaction.from}</td>
                    <td class="border-b py-2 px-2 ">{transaction.to}</td>
                    <td class="border-b py-2 px-2 ">{transaction.amount}</td>
                    <td class="border-b py-2 px-2 ">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}
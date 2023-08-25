import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    const [users,setUsers]=useState([])
    const [editUser,setEditUser]=useState({})
    const [errorMessage,setErrorMessage]=useState("");
    
    useEffect(()=>{

        let login=JSON.parse(localStorage.getItem("user"))
        
        if(!login||login.type!="admin")
          router.push('/bank_login')
          
        axios.get('/api/get_all_bank_user').then(res=>{
            setUsers(res.data)
       })
    },[])

    let createUser=(e)=>{
        e.preventDefault();
        let email=e.target.email.value
        let name=e.target.name.value
        let password=e.target.password.value
        let account = e.target.account.value
        let user={email,name,password,account}
        let i=0
        for(i=0;i<users.length;i++)
          if(user.email===users[i].email)
            break
        if(i!=users.length)
          {
            showErrorMessage()
            return
          }
        hideErrorMessage()
        axios.post('/api/add_bank_user',{user}).then(res=>{
            let newusers=[]
            users.forEach(user=>{
              newusers.push(user)
            })
            newusers.push(res.data)
            setUsers(newusers)
            console.log(users)
        })
    }

    let deleteUser=(user)=>{
      
      axios.delete('/api/delete_bank_user?email='+user.email).then(res=>{
        let email=res.data
        let temusers=[]
        users.forEach(user=>{
          if(user.email!=email)
            temusers.push(user)
        })
        setUsers(temusers)
        console.log(email)
      })
    }

    let hideErrorMessage=()=>{
      const alertElement = document.getElementById("alert");
          alertElement.style.display = "none";
          setErrorMessage("Email address already in use!")
    }
    let showErrorMessage=()=>{
      const alertElement = document.getElementById("alert");
          alertElement.style.display = "block";
          setErrorMessage("Email address already in use!")
    }

    // Get the modal element


// Function to open the modal
function openModal(user) {
  const updateModal = document.getElementById('updateModal');

  document.getElementById('editname').value='';

  document.getElementById('editpassword').value='';
  setEditUser(user)
  updateModal.classList.remove('hidden');
}

// Function to close the modal
function closeModal() {
  const updateModal = document.getElementById('updateModal');
  updateModal.classList.add('hidden');
}



// Event listener to submit the form
function updateFormSubmit(event) {
  event.preventDefault();
  // Perform update logic here
  let email=editUser.email
  let name=event.target.name.value
  let account=editUser.account
  if(!name)
    name=editUser.name
  let password=event.target.password.value
  if(!password)
    password=editUser.password
  console.log(name+" "+password)
  let balance=editUser.balance
  
  axios.post('/api/update_bank_user',{email,name,password,balance,account}).then(res=>{
    let updatedusers=[]
    users.forEach(user=>{
      if(user.email===email)
        updatedusers.push(res.data)
      else
        updatedusers.push(user)
    })
    setUsers(updatedusers)
    console.log(res.data)
  closeModal();
  }).catch(e=>{console.log(e)})
};

    return(
    <div>
        <div class="flex h-screen">
    
    <div class="bg-teal-400 text-white w-1/4 flex flex-col justify-between">
      <div>
        <h1 class="text-2xl font-bold p-4">Admin Dashboard</h1>
        <form class="p-4" onSubmit={createUser}>
          <h2 class="text-lg font-bold mb-4">Create User</h2>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="name">Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter name" required/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email" required/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="account">Account</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="account" type="account" placeholder="Enter Account Number" required/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password" required/>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-teal-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create</button>
          </div>
          <div id="alert" class="alert mt-4">
            {errorMessage}
        </div>
        </form>
      </div>
      
      <form class="p-4" action="logout.php" method="post">
       <a class="sidebar-link " type="submit" href="/transactions">Transactions</a>
        <a class="sidebar-link p-4 font-bold mb-4 cursor-pointer" onClick={e=>{localStorage.removeItem("user");router.push('/bank_login');}}>Logout</a>
      </form>
      
    </div>

   
    <div class="bg-gray-100 flex-grow p-4">
      <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-4">Users</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Name</th>
              <th class="py-2 px-4 border-b">Email</th>
              <th class="py-2 px-4 border-b">Account Number</th>
              
              <th class="py-2 px-4 border-b">Account Balance (taka)</th>
              <th class="py-2 px-4 border-b w-1/4">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {
                users.map((user)=>(<tr>
                    <td class="border-b py-2 px-2 w-1/5 overflow-auto">{user.name} </td>
                    <td class="border-b py-2 px-2 w-1/5 overflow-auto">{user.email} </td>
                    <td class="border-b py-2 px-2 w-1/5 overflow-auto">{user.account} </td>


                    <td class="border-b py-2 px-2 w-1/5 overflow-auto">{user.balance} </td>
                    <td class="py-2 px-2 border-b overflow-auto">
                      <button class="update-btn hover:bg-green-700 text-white font-bold py-2 px-2 rounded mr-2" onClick={(e)=>  openModal(user)}>View</button>
                      <button class="delete-btn hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={e=>{deleteUser(user)}}>Delete</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      
    </div>
  </div>

  <div id="updateModal" class="fixed z-10 inset-0 overflow-y-auto hidden" >
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Update User Information</h2>
      <form id="updateForm" onSubmit={updateFormSubmit}>
        <div class="mb-4">
          <label for="name" class="block mb-2">Name:</label>
          <input type="text" id="editname" name="name" class="w-full border border-gray-300 rounded p-2" placeholder={editUser.name}/>
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email:</label>
          <input type="email" id="editemail" name="email" class="w-full border border-gray-300 rounded p-2" placeholder={editUser.email} disabled/>
        </div>
       
        <div class="mb-4">
          <label for="account" class="block mb-2">Account:</label>
          <input type="account" id="editaccount" name="account" class="w-full border border-gray-300 rounded p-2" placeholder={editUser.account} disabled/>
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2">Password:</label>
          <input type="text" id="editpassword" name="password" class="w-full border border-gray-300 rounded p-2" placeholder={editUser.password}/>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
        <button id="closeModalBtn" class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  </div>
</div>
</div>
    )
}
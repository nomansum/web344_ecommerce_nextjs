import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "./Modal/BankModal"
import { useRouter } from "next/router"
import { Toaster,toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {
    const [product1,setProduct1]=useState(0)
    const [product2,setProduct2]=useState(0)
    const [product3,setProduct3]=useState(0)
    const [cproduct1,setCProduct1]=useState(0)
    const [cproduct2,setCProduct2]=useState(0)
    const [cproduct3,setCProduct3]=useState(0)
    const [orders,setOrders]=useState([])
    const [message,setMessage]=useState({})
	const [user,setUser]=useState({})
	const router=useRouter()


    let showMessage=(message)=>{
        setMessage(message)
        let alert=document.querySelector("#message")
        alert.classList.add("px-2")
        alert.classList.add("py-2")
        setTimeout(()=>{
        setMessage({})
        alert.classList.remove("px-2")
        alert.classList.remove("py-2")
        },2000)
    }

    let increment=(i)=>{
        let x=0
        if(i===1){x=product1; setProduct1(x+1)}
        if(i===2){x=product2; setProduct2(x+1)}
        if(i===3){x=product3; setProduct3(x+1);}
    }
    let decrement=(i)=>{
        let x=0
        if(i===1 && product1>0){x=product1; setProduct1(x-1)}
        if(i===2 && product2>0){x=product2; setProduct2(x-1)}
        if(i===3 && product3>0){x=product3; setProduct3(x-1);}
    }

    let order=(e)=>{
        e.preventDefault();
        if(cproduct1===0&&cproduct2===0&&cproduct3===0)
            {
            //showMessage({head:"Sorry! ",body:"no items in the cart"})
			toast.error("Sorry no items in the cart!")
            return
            }
        let name=e.target.name.value
        let address=e.target.address.value
        let phone=e.target.phone.value
        let status="pending"
        let time=new Date().toLocaleString('en-GB', {day: '2-digit',month: '2-digit',year: '2-digit',hour: '2-digit',minute: '2-digit',});
        let email=user.email
        axios.post("/api/placeorder",{name,address,phone,cproduct1,cproduct2,cproduct3,email,time,status,user}).then(res=>{
            setCProduct1(0)
            setCProduct2(0)
            setCProduct3(0)
            let neworders=[]
            orders.forEach(order=>{
                neworders.push(order)
            })
            neworders.push(res.data)
            setOrders(neworders)
            setCProduct1(0)
            setCProduct2(0)
            setCProduct3(0)
			e.target.address.value=""
			e.target.phone.value=""
			e.target.name.value=""
			document.querySelector('.sidebar').classList.remove("open")
            //showMessage({head:"Message! ",body:"order placed."})
			toast.success("Oreder Placed!")
        }).catch(error=>{
			//showMessage({head:"Sorry! ",body:"insufficient balance."})
			toast.error("Insufficient Balance!")
		})
    }

	let handleLogout=(e)=>{
		localStorage.setItem("shop_user",null)
		router.push("/")
	  }

    useEffect(()=>{
				if(JSON.parse(localStorage.getItem("shop_user"))===null||JSON.parse(localStorage.getItem("shop_user")).type!="buyer")
					router.push("/")
				setUser(JSON.parse(localStorage.getItem("shop_user")))
				const dropdown = document.querySelector('.dropdown');
				const sidebar = document.querySelector('.sidebar');
				const sidebarClose = document.querySelector('.sidebar-close');

				dropdown.addEventListener('click', () => {
				  sidebar.classList.add('open');
				});

				sidebarClose.addEventListener('click', () => {
				  sidebar.classList.remove('open');
				});

				const ordersdropdown = document.querySelector('.orders-dropdown');
				const orderssidebar = document.querySelector('.orders-sidebar');
				const orderssidebarClose = document.querySelector('.orders-sidebar-close');

				ordersdropdown.addEventListener('click', () => {
				  orderssidebar.classList.add('open');
				});

				orderssidebarClose.addEventListener('click', () => {
				  orderssidebar.classList.remove('open');
				});

				document.addEventListener('click', (event) => {
				  if (!orderssidebar.contains(event.target)&&!sidebar.contains(event.target) && !dropdown.contains(event.target)  && !ordersdropdown.contains(event.target)) {
				    sidebar.classList.remove('open');
				    orderssidebar.classList.remove('open');
				  }
				});

				// Increment and decrement quantity
				const decrementButtons = document.querySelectorAll('.decrement');
				const incrementButtons = document.querySelectorAll('.increment');
				const quantityInputs = document.querySelectorAll('.quantity input');
				axios.post("/api/get_customer_orders",{email:JSON.parse(localStorage.getItem("shop_user")).email}).then(res=>{
					setOrders(res.data.orders)	
				})
                
				  
                

    },[])
return(<div>
    
    <div class="header bg-white shadow">
				<h1 class="text-3xl font-semibold">ShopYE</h1>
				<nav>
				  <ul class="flex space-x-4">
				    <li class="dropdown">
				      <a href="#" class="dropdown-toggle">Cart</a>
				      <div class="">
				        <div class="sidebar">
				          <div class="sidebar-header">
				            <h2>Cart</h2>
				            <span class="sidebar-close">&times;</span>
				          </div>
				          <div class="sidebar-content text-gray-600">
											<div class="container mx-auto p-4">


											<div class="cart-product">
												<img src="product1.jpg" alt="Product 1"/>
												<div class="cart-product-details">
													<h3 class="font-bold">Arabian Huiye  Runs 60 mph at 4 sec for up to 40 miles</h3>
													<p>Quantity: {cproduct1}</p>
													<p class="cart-product-price">{14000*1}Tk</p>
													<p>Total: {14000*cproduct1}Tk</p>
												</div>
											</div>

											<div class="cart-product">
												<img src="product2.jpg" alt="Product 2"/>
												<div class="cart-product-details">
													<h3 class="font-bold">Samsung Galaxy Note 23 – Made in Korea , Powered By Android 13.0</h3>
													<p>Quantity: {cproduct2}</p>
													<p class="cart-product-price">24000Tk</p>
													<p>Total: {24000*cproduct2}Tk</p>
												</div>
											</div>

											<div class="cart-product">
												<img src="product3.jpg" />
												<div class="cart-product-details">
													<h3 class="font-bold">Smart Watch – Track Your Activities</h3>
													<p>Quantity: {cproduct3}</p>
													<p class="cart-product-price">60000</p>
													<p>Total: {60000*cproduct3}Tk</p>
												</div>
											</div>

											<p class="total-price font-bold">Total Price: {14000*cproduct1+24000*cproduct2+60000*cproduct3}Tk</p>
											<form id="updateForm" onSubmit={order}>
											<div class="mb-4">
												<label for="name" class="block mb-2">Name:</label>
												<input type="text" id="editname" name="name" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<div class="mb-4">
												<label for="adress" class="block mb-2">Adress:</label>
												<input type="text" id="editeadress" name="address" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<div class="mb-4">
												<label for="phone" class="block mb-2">Phone Number:</label>
												<input type="text" id="editphone" name="phone" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place Order</button>
										</form>
										</div>	
				          </div>
				        </div>
				      </div>
				      
				    </li>
				    <li class="orders-dropdown">
				      <a href="#" class="dropdown-toggle">Orders</a>
				      <div class="">
				        <div class="sidebar orders-sidebar">
				          <div class="sidebar-header">
				            <h2>Orders</h2>
				            <span class=" sidebar-close orders-sidebar-close">&times;</span>
				          </div>
				          <div class="sidebar-content text-gray-600">
				          <div class="container mx-auto">
                            {orders.map(order=>(
									<div class="order-container ">
										<div class="order-header">
											<h2 class="order-title">{order.address}</h2>
											<p class="order-timestamp">{order.name}</p>
											</div>
										<div class="order-header">
											<p class="order-timestamp">{order.phone}</p>
											<p class="order-timestamp">{order.time}</p>
										</div>{order.status==="pending"?<p class="order-status text-red-500">{order.status}</p>:<p class="order-status text-green-500">{order.status}</p>}
										<ul class="product-list">
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">Arabian Huiye  Runs 60 mph at 4 sec for up to 40 miles</p>
														<p class="product-quantity">Qty: {order.cproduct1}</p>
													</div>
												</div>
											</li>
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">Samsung Galaxy Note 23 – Made in Korea , Powered By Android 13.0</p>
														<p class="product-quantity">Qty: {order.cproduct2}</p>
													</div>
												</div>
											</li>
											
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">Smart Watch – Track Your Activities</p>
														<p class="product-quantity">Qty: {order.cproduct3}</p>
													</div>
												</div>
											</li>
										</ul>
										<p class="order-total">Total: {14000*order.cproduct1+24000*order.cproduct2+60000*order.cproduct3}</p>
									</div>

                                ))}

								</div>
				          </div>
				        </div>
				      </div>
				    </li>
				    <li><a href="#" onClick={handleLogout}>Logout</a></li>
				  </ul>
				</nav>
			</div>

			<div class="content bg-blue-100">
				<div class="product-card">
				  <img src="product1.jpg" alt="Product 1"/>
				  <h3>Arabian Hyion – Runs 48 miles at 60mph</h3>
				  <p>Runs 48 miles at 60mph<b>14000 Tk</b>
				  </p>
				  <div class="quantity-container">
				    <div class="quantity">
				      <button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(1)}>-</button>
				      <input type="number" value={product1} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
				      <button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(1)}>+</button>
				    </div>
				    <button class="add-to-cart ml-4" onClick={(e)=>{setCProduct1(product1);toast.success("Cart Updated!")}}>Add to Cart</button>
				  </div>
				</div>

				<div class="product-card">
				  <img src="product2.jpg" alt="Product 2"/>
				  <h3>Samsung Galaxy Note 23 – Made in Korea , Powered By Android 13.0</h3>
				  <p>Android Latest , 1 tb storage<br/>price:<b>24000 Tk</b></p>
				  <div class="quantity-container">
				    <div class="quantity">
				      <button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(2)}>-</button>
				      <input type="number" value={product2} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
				      <button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(2)}>+</button>
				    </div>
				    <button class="add-to-cart ml-4" onClick={(e)=>{setCProduct2(product2);toast.success("Cart Updated!")}}>Add to Cart</button>
				  </div>
				</div>

				<div class="product-card">
				  <img src="product3.jpg" alt="Product 3"/>
				  <h3>Smart Watch – Track Your Activities</h3>
				  <p>
				    IP68 rating
				    Google Stock Rom<br/>

				    price:<b>60000 Tk</b>
				  </p>
				  <div class="quantity-container">
				    <div class="quantity">
				      <button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(3)}>-</button>
				      <input type="number" value={product3} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
				      <button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(3)}>+</button>
				    </div>
				    <button class="add-to-cart ml-4" onClick={(e)=>{setCProduct3(product3);toast.success("Cart Updated!")}}>Add to Cart</button>
				  </div>
				</div>
			</div>
			<Modal user={user} setUser={setUser}/>
            <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
                <strong class="font-bold">{message.head} </strong>
                <span class="block sm:inline">{message.body}</span>
            </div>
			<Toaster
			position="top-center"
			reverseOrder={false}
			/>
			
</div>) 
}
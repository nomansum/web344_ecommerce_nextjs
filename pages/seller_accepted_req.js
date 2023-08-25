import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function () {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/get_accepted_requests").then((res) => {
      //console.log(res.data)
      setOrders(res.data);
    });
  }, []);

  let handleLogout = (e) => {
    localStorage.setItem("shop_user", null);
    router.push("/");
  };
  return (
    <div>
      <div class="header">
        <h1 class="text-3xl font-semibold">ShopYE</h1>
        <nav>
          <ul class="flex space-x-4">
            <li class="dropdown">
              <a href="/seller_dashboard" class="dropdown-toggle">
                Pendings
              </a>
            </li>
            <li class="dropdown">
              <a href="/" class="dropdown-toggle" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="bg-gray-100 flex-grow p-4 mb-16 mx-16 mt-8">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-bold mb-4">Delivered orders</h3>
          <table class="table">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">ID</th>
                <th class="py-2 px-4 border-b">Name</th>
                <th class="py-2 px-4 border-b">Adress</th>
                <th class="py-2 px-4 border-b">Phone no.</th>
                <th class="py-2 px-4 border-b">Product 1</th>
                <th class="py-2 px-4 border-b">Product 2</th>
                <th class="py-2 px-4 border-b">Product 3</th>
                <th class="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td class="border-b py-2 px-2 w-1/4">{order._id}</td>
                  <td class="border-b py-2 px-2 ">{order.name}</td>
                  <td class="border-b py-2 px-2 ">{order.address}</td>
                  <td class="border-b py-2 px-2 ">{order.phone}</td>
                  <td class="border-b py-2 px-2 ">{order.cproduct1}</td>
                  <td class="border-b py-2 px-2 ">{order.cproduct2}</td>
                  <td class="border-b py-2 px-2 ">{order.cproduct3}</td>
                  <td class="border-b py-2 px-2 ">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class="footer fixed bottom-0 w-full">
        &copy; 2023 Online Shopping Site. All rights reserved.
      </div>
    </div>
  );
}

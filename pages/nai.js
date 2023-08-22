import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div class="font-sans bg-gray-800 py-16 justify-center items-center h-screen ">
        <h1 class="flex justify-center items-center text-4xl font-semibold text-gray-200">Welcome to Our Web Site!</h1>
        <div class="flex justify-center items-center my-32">
            <a href="shop_login"
                class="w-xl mx-4 bg-white rounded-lg overflow-hidden shadow-md block transform hover:scale-105 transition duration-300">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">Shop Login</h2>
                    <p class="text-gray-600 mb-4">Login to the shop portal</p>
                </div>
            </a>

            <a href="bank_login"
                class="w-xl mx-4 bg-white rounded-lg overflow-hidden shadow-md block transform hover:scale-105 transition duration-300">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">Bank Login</h2>
                    <p class="text-gray-600 mb-4">Login to the bank portal</p>
                </div>
            </a>
        </div>
    </div>
  )
}

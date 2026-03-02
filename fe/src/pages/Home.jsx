import Products from "./Products"
import Cart from "./Cart"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-blue-600 text-white px-6 py-3 text-xl font-bold shadow">
                POS System
            </div>
            <div className="flex gap-6 p-6">

                <div className="flex-1">
                    <Products />
                </div>

                <div className="w-96">
                    <Cart />
                </div>

            </div>

        </div>
    )
}
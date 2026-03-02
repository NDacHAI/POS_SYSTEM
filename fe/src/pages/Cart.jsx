import { useEffect, useState } from "react"

export default function Cart() {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )


    useEffect(() => {

        const updateCart = () => {
            setCart(JSON.parse(localStorage.getItem("cart")) || [])
        }

        window.addEventListener("cartUpdated", updateCart)

        return () => {
            window.removeEventListener("cartUpdated", updateCart)
        }

    }, [])


    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )


    const handleCheckout = async () => {

        try {

            const res = await fetch(
                "http://localhost:3000/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: cart,
                        total: totalPrice
                    })
                }
            )

            const data = await res.json()

            alert(data.message)

            localStorage.removeItem("cart")
            setCart([])

            window.dispatchEvent(new Event("cartUpdated"))

        } catch (err) {
            console.log(err)
            alert("Checkout failed")

        }

    }

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h1 className="text-xl font-bold mb-4">
                Giỏ hàng
            </h1>


            {cart.length === 0 && (
                <div className="text-gray-500">
                    Chưa có sản phẩm
                </div>
            )}


            <div className="space-y-3">

                {cart.map(item => (

                    <div
                        key={item._id}
                        className="border border-gray-400 p-3 rounded"
                    >

                        <div className="font-semibold">
                            {item.name}
                        </div>

                        <div className="text-sm">
                            {item.qty} × {item.price.toLocaleString("vi-VN")} đ
                        </div>

                        <div className="text-blue-600 font-bold">
                            {(item.price * item.qty).toLocaleString("vi-VN")} đ
                        </div>

                    </div>

                ))}

            </div>


            <div className="border-t mt-4 pt-4">

                <div className="font-bold text-lg">
                    Tổng:
                    <span className="text-red-500 ml-2">
                        {totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                </div>


                <button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="
                        w-full
                        bg-green-500
                        text-white
                        py-2
                        rounded
                        mt-3
                        hover:bg-green-600
                        disabled:bg-gray-300
                    "
                >
                    Thanh toán
                </button>

            </div>

        </div>

    )
}
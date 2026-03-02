import { useEffect, useState } from "react"

export default function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }, [])


    const handleAddToCart = (item) => {

        const cart = JSON.parse(localStorage.getItem("cart")) || []

        const index = cart.findIndex(p => p._id === item._id)

        if (index === -1) {
            cart.push({ ...item, qty: 1 })
        } else {
            cart[index].qty += 1
        }

        localStorage.setItem("cart", JSON.stringify(cart))

        window.dispatchEvent(new Event("cartUpdated"))
    }


    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h1 className="text-xl font-bold mb-4">
                Danh sách sản phẩm
            </h1>

            <div className="grid grid-cols-3 gap-4">

                {products.map(item => (

                    <div
                        key={item._id}
                        className="border border-gray-400 rounded-lg p-4 hover:shadow-md transition"
                    >

                        <div className="font-semibold">
                            {item.name}
                        </div>

                        <div className="text-blue-600 font-bold my-2">
                            {item.price.toLocaleString("vi-VN")} đ
                        </div>

                        <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                        >
                            Thêm
                        </button>

                    </div>

                ))}

            </div>

        </div>

    )
}
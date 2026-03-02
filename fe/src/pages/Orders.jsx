import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetch("http://localhost:3000/api/orders")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err))


        const socket = io("http://localhost:3000")

        socket.on("newOrder", (newOrder) => {

            setOrders(prev => [newOrder, ...prev])

        })

        return () => {
            socket.disconnect()
        }

    }, [])


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">

            <h1 className="text-2xl font-bold mb-6">
                Danh sách đơn hàng
            </h1>

            {orders.length === 0 ? (
                <div className="text-gray-500">
                    Chưa có đơn hàng
                </div>
            ) : (
                <ul className="space-y-4">

                    {orders.map(item => (

                        <li
                            key={item.id}
                            className="border rounded-lg p-5"
                        >

                            <div className="flex justify-between mb-2">

                                <div>
                                    Mã đơn hàng:
                                    <span className="font-bold ml-2 text-blue-600">
                                        #{item.id}
                                    </span>
                                </div>

                                <div className="text-gray-500 text-sm">
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>

                            </div>

                            <div className="text-lg">
                                Tổng tiền:
                                <span className="font-bold text-red-600 ml-2">
                                    {item.total.toLocaleString("vi-VN")} đ
                                </span>
                            </div>

                        </li>

                    ))}

                </ul>
            )}

        </div>
    )
}
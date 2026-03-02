# Hệ thống bán hàng đơn giản (POS)

Hệ thống POS đơn giản cho phép hiển thị sản phẩm, thêm vào giỏ hàng, thanh toán và theo dõi đơn hàng realtime.

---

# 📌 Tính năng

- Hiển thị danh sách sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Hiển thị tổng tiền
- Thanh toán đơn hàng
- Hiển thị danh sách đơn hàng realtime
- Tự động cập nhật khi có đơn hàng mới

---

# 🛠 Công nghệ sử dụng

## Frontend
- ReactJS
- Vite

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Container
- Docker
- Docker Compose

---

# 📁 Cấu trúc thư mục

```
pos-system/
│
├── be/                    # Backend (Express, MongoDB)
├── fe/                    # Frontend (React, Vite)
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Cách chạy dự án

Có 2 cách chạy:

- Chạy local (không dùng Docker)
- Chạy bằng Docker (khuyến nghị)

---

# 🚀 Cách 1: Chạy local

## 1. Cài MongoDB

Tạo database với tên:

```
POS
```

---

## 2. Chạy Backend

```
cd be
npm install
npm run seed
npm start
```

Backend chạy tại:

```
http://localhost:3000
```

---

## 3. Chạy Frontend

```
cd fe
npm install
npm run dev
```

Frontend chạy tại:

```
http://localhost:5173
```

---

# 🐳 Cách 2: Chạy bằng Docker (khuyến nghị)

## 1. Cài Docker Desktop

Mở Docker Desktop và đảm bảo Docker đang chạy.

---

## 2. Chạy project

Đứng tại thư mục root:

```
docker-compose up --build
```

---

## 3. Seed dữ liệu mẫu

Mở terminal mới và chạy:

```
docker exec -it pos-backend npm run seed
```

---

## 4. Truy cập ứng dụng

## Frontend

```
http://localhost:5173
```

Trang:

```
/           → Trang home
/orders     → Trang orders
```

Ví dụ:

```
http://localhost:5173/orders
```

---

## Backend

Base URL:

```
http://localhost:3000/api
```

---

# 📡 API Endpoint

## Lấy danh sách sản phẩm

```
GET /products
```

Ví dụ:

```
http://localhost:3000/api/products
```

---

## Lấy danh sách đơn hàng

```
GET /orders
```

Ví dụ:

```
http://localhost:3000/api/orders
```

---

## Tạo đơn hàng

```
POST /orders
```

Ví dụ body:

```json
{
  "items": [
    {
      "name": "Cà phê sữa",
      "quantity": 2
    }
  ],
  "total": 50000
}
```

---

# 🛑 Dừng Docker

```
docker-compose down
```

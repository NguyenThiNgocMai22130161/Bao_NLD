---
aliases : API Specifications
time : 09-12-2025 02:12:47
---
## 1. Quy ước chung (Conventions)

- **Base URL:** `http://localhost:8080/api`
- **Content-Type:** `application/json`
- **Date Format:** ISO 8601 (VD: `2023-10-25T14:30:00`)
- **Authentication:** Bearer Token (Gửi qua Header: `Authorization: Bearer <token>`)
### Cấu trúc phản hồi (Response Wrapper)

**Thành công (HTTP 200/201):**
```JSON
{
  "status": 200,
  "message": "Thành công",
  "data": { ... } // Object hoặc Array hoặc null
}
```

**Lỗi (HTTP 400/403/404/500):**
```JSON
{
  "status": 400,
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Không tìm thấy bài viết",
  "timestamp": "2023-10-25T14:30:00"
}
```

---

## 2. Phân hệ Xác thực (Authentication)

**Prefix:** `/api/auth`
### `POST /register`

Đăng ký tài khoản mới.
- **Body:**
```JSON
{
  "username": "nguyenvanA",
  "email": "nguyenvana@gmail.com",
  "password": "password123"
}
```

### `POST /login`

Đăng nhập để lấy Token.
- **Body:**
```JSON
{
  "identifier": "nguyenvanA", // Hoặc email
  "password": "password123"
}
```

- **Response Data:**
```JSON
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "nguyenvanA",
  "role": "USER"
}
```

### `POST /verify`

Xác thực email sau khi đăng ký.

- **Body:** 
```JSON
{ 
	"email": "...", 
	"verificationCode": "123456"
 }
```

### `POST /forgot-password` & `/reset-password`

`/forgot-password`
Gửi yêu cầu quên mật khẩu. Hệ thống sẽ kiểm tra email và gửi mã OTP xác thực (có hiệu lực 15 phút).
- **Body:**
```JSON
{
  "email": "nguyenvana@gmail.com"
}
```

`/reset-password`
Đặt lại mật khẩu mới bằng mã OTP đã nhận qua email.
- **Body:**
```JSON
{
  "email": "nguyenvana@gmail.com",
  "otp": "123456",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```
### `POST /change-password` 🔒 _(Cần Token)_

Đổi mật khẩu khi đang đăng nhập.
- **Body:**
```JSON
{
  "oldPassword": "currentPassword123",
  "newPassword": "newPassword456",
  "confirmPassword": "newPassword456"
}
```

---

## 3. Phân hệ Người dùng (User Personalization) 

**Prefix:** `/api/users` **Yêu cầu:** Bắt buộc có Token (Header `Authorization`).
### `POST /saved-posts/{slug}`
Lưu hoặc Bỏ lưu bài viết (Toggle).
- **Path Param:** `slug` (Slug bài viết).
- **Response:** Message thông báo thành công.
### `GET /saved-posts`
Xem danh sách bài viết đã lưu (Bookmark).
- **Response Data:** Array các bài viết (cấu trúc giống `PostSummaryResponseDto`).
### `GET /history`
Xem lịch sử các bài viết đã đọc gần đây.
- **Response Data:** Array các bài viết (cấu trúc giống `PostSummaryResponseDto`).
### `GET /comments`
Xem lịch sử bình luận của chính mình.
- **Response Data:**
```JSON
[
  {
    "id": "cmt-uuid-1",
    "content": "Bài viết rất hay!",
    "createdAt": "2023-10-25T10:00:00",
    "user": "nguyenvanA",
    "postSlug": "bao-yagi-gay-mua-lon", // Dùng để click về bài viết
    "postTitle": "Bão Yagi gây mưa lớn",
    "replies": []
  }
]
```

---

## 4. Phân hệ Bài viết & Nội dung (Content)
**Prefix:** `/api/posts` hoặc `/api/categories`
### `GET /api/categories`
Lấy cây danh mục (Menu).
- **Response Data:**
```JSON
[
  {
    "id": "cat-1",
    "name": "Thời sự",
    "slug": "thoi-su",
    "children": [
        { "id": "cat-2", "name": "Chính trị", "slug": "chinh-tri" }
    ]
  }
]
```
### `GET /api/posts/{slug}`

Lấy chi tiết bài viết.
- **Logic:** Tự động lưu vào lịch sử xem nếu người dùng đã đăng nhập.
- **Response Data:**
```JSON
{
  "id": "post-uuid-1",
  "title": "Bão Yagi đổ bộ",
  "slug": "bao-yagi-do-bo",
  "summary": "Tóm tắt bài viết...",
  "content": "<p>Nội dung HTML...</p>",
  "thumbnail": "link-anh.jpg",
  "publishedAt": "2023-10-25T10:00:00",
  "viewCount": 1500,
  "isFeatured": true,
  "author": "Phóng viên A",
  "category": { "name": "Thời sự", "slug": "thoi-su" },
  "tags": [ { "name": "Bão lũ", "slug": "bao-lu" } ],
  "relatedPosts": [ ... ] // Danh sách bài liên quan
}
```

### `POST /api/posts` (Filter & Search)

Lấy danh sách bài viết (Trang chủ, Chuyên mục, Tìm kiếm).
- **Method:** `POST` (Để gửi bộ lọc phức tạp qua Body).
- **Body:**
```JSON
{
  "pageNo": 1,         // Trang số (bắt đầu từ 1)
  "pageSize": 10,      // Số bài mỗi trang
  "categoriesSlug": ["thoi-su", "doi-song"], // Lọc theo danh mục (Array)
  "tagsSlug": [],      // Lọc theo tag
  "isFeatured": null,  // true: Lấy bài nổi bật, null: Lấy tất cả
  "type": "STANDARD"   // STANDARD, VIDEO, GALLERY...
}
```

- **Response Data:**
```JSON
{
  "currentPage": 1,
  "totalPages": 5,
  "totalElements": 50,
  "items": [ ... ] // Danh sách bài viết tóm tắt
}
```

---

## 5. Phân hệ Tương tác (Interaction)
**Prefix:** `/api/posts/{postId}/comments`
### `GET /api/posts/{postId}/comments`
Lấy danh sách bình luận của một bài viết cụ thể.
- **Path Param:** `postId` (UUID của bài viết - Lấy từ API chi tiết bài viết).
- **Response Data:**
```JSON
[
  {
    "id": "cmt-1",
    "content": "Bình luận gốc",
    "user": "userA",
    "createdAt": "...",
    "replies": [
       { "id": "cmt-2", "content": "Trả lời bình luận", "user": "userB" }
    ]
  }
]
```
### `POST /api/posts/{postId}/comments` 🔒 _(Cần Token)_
Gửi bình luận mới hoặc trả lời bình luận.
- **Body:**
```JSON
{
  "content": "Nội dung bình luận",
  "parentId": null // Để null nếu là comment gốc, hoặc điền ID comment cha nếu là reply
}
```
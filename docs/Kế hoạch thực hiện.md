---
aliases : Kế hoạch thực hiện
time : 09-12-2025 03:12:25
---
### PHẦN 1: FOUNDATION & AUTHENTICATION (Tuần 1)

_Mục tiêu: Thiết lập dự án, kết nối API và hoàn thiện chức năng Đăng ký/Đăng nhập (Vì các chức năng mới đều cần Token)._
#### Issue #01: Project Setup & API Client
- **Công việc:**
    - Setup React + HeroUI + Router.
    - Tạo file `.env`: `VITE_API_BASE_URL=http://localhost:8080/api`.
    - Setup `axios` interceptor: Tự động đính kèm `Authorization: Bearer <token>` vào header nếu có token trong LocalStorage.
    - Xử lý lỗi chung: Nếu API trả về `401 Unauthorized`, tự động đá user về trang Login.
#### Issue #02: Define TypeScript Interfaces (Sync with BE DTOs)
- **Công việc:**
    - Tạo type dựa trên Response DTO của Backend:
        - `AuthResponse`: `{ token, username, role }`
        - `PostSummary`: Khớp với `PostSummaryResponseDto` (id, title, slug, thumbnail, isFeatured...).
        - `PostDetail`: Khớp với `PostDetailResponseDto` (thêm content, relatedPosts).
        - `Comment`: Khớp với `CommentResponseDto` (thêm postSlug, postTitle).

#### Issue #03: Authentication UI (Login/Register)
- **Backend API:** `/api/auth/login`, `/api/auth/register`
- **Công việc:**
    - Tạo trang Login & Register.
    - **Logic Login:** Gọi API -> Nhận Token -> Lưu vào LocalStorage -> Redirect về Home.
    - **Logic Register:** Gọi API -> Hiển thị thông báo "Kiểm tra email để xác thực".
---
### PHẦN 2: CORE CONTENT DISPLAY (Tuần 2)
_Mục tiêu: Hiển thị nội dung công khai (Public) mà không cần đăng nhập._
#### Issue #04: Dynamic Menu & Homepage
- **Backend API:** `/api/categories`, `/api/posts`
- **Công việc:**
    - **Navbar:** Gọi `GET /categories` để render menu đa cấp (Parent/Children).
    - **Homepage:**
        - Gọi `POST /api/posts` (hoặc GET với query param) để lấy bài viết.
        - Slider: Lọc bài có `isFeatured: true`.
        - Latest News: Lọc bài mới nhất.
#### Issue #05: Post Detail & View Counting
- **Backend API:** `GET /api/posts/{slug}`
- **Công việc:**
    - Lấy `slug` từ URL -> Gọi API chi tiết.
    - Render HTML content (Sanitized).
    - **Quan trọng:** Backend đã tự động xử lý tăng `viewCount` và lưu `History` (nếu đã login) trong API này. FE không cần gọi thêm API view count riêng.
    - Hiển thị danh sách `relatedPosts` ở cuối bài.

---
### PHẦN 3: USER PERSONALIZATION (Tuần 3) - **Trọng tâm mới**
_Mục tiêu: Tích hợp 3 chức năng cá nhân hóa vừa phát triển. Yêu cầu User phải Login._
#### Issue #06: Bookmark Feature (Saved Posts)
- **Backend API:** `POST /api/users/saved-posts/{slug}`, `GET /api/users/saved-posts`
- **Công việc:**
    - **Nút Lưu (trong trang chi tiết):**
        - Hiển thị icon Bookmark (Filled nếu đã lưu, Outline nếu chưa).
        - Click -> Gọi API `POST` để toggle trạng thái.
    - **Trang "Tủ sách của tôi":**
        - Gọi `GET` lấy danh sách.
        - Render grid bài viết giống Homepage.
#### Issue #07: Reading History (Vừa xem)
- **Backend API:** `GET /api/users/history`
- **Công việc:**
    - Tạo trang "Lịch sử xem".
    - Gọi API lấy danh sách bài đã đọc.
    - Hiển thị UI đơn giản (List view), có thể hiển thị thêm thời gian xem (nếu backend trả về, hiện tại backend đang trả về list bài viết thuần, sắp xếp theo thời gian giảm dần).
#### Issue #08: Comment System & "My Comments"
- **Backend API:**
    - `GET /api/posts/{id}/comments` (Lấy list comment bài viết)
    - `POST /api/posts/{id}/comments` (Đăng comment)
    - `GET /api/users/comments` (Lấy comment của tôi)
- **Công việc:**
    - **Tại bài viết:**
        - Render danh sách comment (xử lý hiển thị reply cấp 2).
        - Form nhập comment (Chỉ hiện khi đã Login).
    - **Trang "Hoạt động bình luận":**
        - Hiển thị danh sách comment của user trả về từ `GET /api/users/comments`.
        - **Click vào comment:** Redirect sang bài viết gốc dựa vào trường `postSlug` vừa thêm.
---

### PHẦN 4: ADVANCED & ADMIN (Tuần 4)
_Mục tiêu: Tìm kiếm và Quản trị nội dung._
#### Issue #09: Search Functionality
- **Công việc:**
    - **BE:** Cần cập nhật `PostFilter` và `PostRepository` để hỗ trợ tìm kiếm theo từ khóa (LIKE %keyword% trong title/summary).
    - **FE:** Thanh search trên header -> Redirect sang trang `/search?q=...` -> Gọi API filter.
#### Issue #10: CMS Dashboard (Admin Only)
- **Người làm:** Frontend Dev
- **Backend API:** Các API CRUD bài viết (Hiện tại `PostController` của bạn đang chỉ có GET, cần bổ sung POST/PUT/DELETE cho Admin).
- **Công việc:**
    - Tạo Layout Admin riêng.
    - Check Role: Nếu `role !== 'ADMIN'` -> Đá về Home.
    - Giao diện quản lý danh sách bài viết (Table).
    - Giao diện soạn thảo bài viết (Text Editor).
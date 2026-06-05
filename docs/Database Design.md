---
aliases : Document
time : 08-12-2025 20:12:69
---
## **1. Phân tích các thực thể chính (Entities)**

Một hệ thống báo điện tử như **Người Lao Động (NLD)** thường bao gồm các nhóm thực thể chính sau:

- **Users / Authors:** Người dùng hệ thống bao gồm phóng viên, biên tập viên, quản trị viên và độc giả.
- **Categories:** Danh mục bài viết (có phân cấp cha – con).
- **Posts (Articles):** Bài viết gồm nhiều loại khác nhau như bài chuẩn, video, gallery, magazine.
- **Tags:** Từ khóa dùng để nhóm nội dung.
- **Comments:** Bình luận từ độc giả.
---

## **2. Chi tiết bảng dữ liệu**

---

## **2.1. Bảng Users**

**Tên bảng:** `tbl_users`

| Field      | Data Type                                | Constraints        | Description                                                                                                             |
| ---------- | ---------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| id         | uuid()                                   | PK                 | ID người dùng                                                                                                           |
| username   | nvarchar(255)                            | NOT NULL, UNIQUE   | Tên đăng nhập                                                                                                           |
| email      | nvarchar(255)                            | NOT NULL, UNIQUE   | Email (cũng dùng để đăng nhập)                                                                                          |
| password   | nvarchar(255)                            | NOT NULL           | Mật khẩu đã được mã hóa                                                                                                 |
| role       | enum('ADMIN','EDITOR','REPORTER','USER') | DEFAULT 'USER'     | Vai trò người dùng:  <br>- ADMIN: Toàn quyền  <br>- EDITOR: Biên tập viên  <br>- REPORTER: Nhà báo  <br>- USER: Độc giả |
| status     | enum('active','inactive','block')        | DEFAULT 'inactive' | Trạng thái tài khoản                                                                                                    |
| avatar     | nvarchar(500)                            | NULL               | Đường dẫn avatar                                                                                                        |
| created_at | timestamp                                | DEFAULT now()      | Thời gian tạo                                                                                                           |
| updated_at | timestamp                                | DEFAULT now()      | Thời gian cập nhật                                                                                                      |

---

## **2.2. Bảng Categories**

**Tên bảng:** `tbl_categories`

|Field|Data Type|Constraints|Description|
|---|---|---|---|
|id|uuid()|PK|ID danh mục|
|parent_id|uuid()|DEFAULT NULL|Danh mục cha|
|name|nvarchar(255)|NOT NULL, UNIQUE|Tên danh mục|
|slug|nvarchar(255)|NOT NULL, UNIQUE|Đường dẫn thân thiện (SEO)|
|position|int|NOT NULL|Thứ tự sắp xếp|
|created_at|timestamp|DEFAULT now()|Thời gian tạo|
|updated_at|timestamp|DEFAULT now()|Thời gian cập nhật|

---

## **2.3. Bảng Posts**

**Tên bảng:** `tbl_posts`

| Field        | Data Type                                        | Constraints           | Description                                                                                                                          |
| ------------ | ------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| id           | uuid()                                           | PK                    | ID bài viết                                                                                                                          |
| author_id    | uuid()                                           | REF tbl_users.id      | Tác giả                                                                                                                              |
| category_id  | uuid()                                           | REF tbl_categories.id | Danh mục bài viết                                                                                                                    |
| title        | nvarchar(255)                                    | NOT NULL              | Tiêu đề                                                                                                                              |
| slug         | nvarchar(255)                                    | NOT NULL, UNIQUE      | Đường dẫn thân thiện (SEO)                                                                                                           |
| summary      | text                                             | NOT NULL              | Mô tả ngắn dưới tiêu đề (sapo)                                                                                                       |
| content      | long text                                        | NOT NULL              | Nội dung bài viết                                                                                                                    |
| thumbnail    | nvarchar(500)                                    | NULL                  | Ảnh đại diện                                                                                                                         |
| status       | enum('DRAFT','PENDING'<br>,'PUBLISHED','REJECT') | DEFAULT 'DRAFT'       | Trạng thái bài viết: draft → pending → published / reject                                                                            |
| view_count   | bigint                                           | DEFAULT 0             | Lượt xem                                                                                                                             |
| is_featured  | boolean                                          | DEFAULT false         | Đánh dấu bài nổi bật                                                                                                                 |
| type         | enum('standard','video','gallery','magazine')    | DEFAULT 'standard'    | Loại bài viết:  <br>- standard: bài thường  <br>- video: có video chính  <br>- gallery: bài ảnh  <br>- magazine: longform chuyên sâu |
| published_at | timestamp                                        | DEFAULT NULL          | Thời điểm xuất bản                                                                                                                   |
| created_at   | timestamp                                        | DEFAULT now()         | Thời gian tạo                                                                                                                        |
| updated_at   | timestamp                                        | DEFAULT now()         | Thời gian cập nhật                                                                                                                   |

---

## **2.4. Bảng Tags**

**Tên bảng:** `tbl_tags`

| Field      | Data Type     | Constraints   | Description          |
| ---------- | ------------- | ------------- | -------------------- |
| id         | uuid()        | PK            | ID tag               |
| name       | nvarchar(255) | NOT NULL      | Tên tag              |
| slug       | nvarchar(255) | NOT NULL      | Đường dẫn thân thiện |
| created_at | timestamp     | DEFAULT now() |                      |
| updated_at | timestamp     | DEFAULT now() |                      |

### **Bảng trung gian Post–Tags**

**Tên bảng:** `tbl_post_tags`

| Field   | Data Type | Constraints      | Description |
| ------- | --------- | ---------------- | ----------- |
| post_id | uuid()    | REF tbl_posts.id | ID bài viết |
| tag_id  | uuid()    | REF tbl_tags.id  | ID tag      |

---

## **2.5. Bảng Comments**

**Tên bảng:** `tbl_comments`

| Field      | Data Type | Constraints      | Description                         |
| ---------- | --------- | ---------------- | ----------------------------------- |
| id         | uuid()    | PK               | ID bình luận                        |
| post_id    | uuid()    | REF tbl_posts.id | Bài viết được bình luận             |
| user_id    | uuid()    | REF tbl_users.id | Người bình luận                     |
| parent_id  | uuid()    | SELF REF         | Bình luận cha (để làm thread/reply) |
| content    | text      | NOT NULL         | Nội dung bình luận                  |
| created_at | timestamp | DEFAULT now()    | Thời gian tạo                       |
| updated_at | timestamp | DEFAULT now()    | Thời gian cập nhật                  |

## hình ảnh tổng thế của db
![Hình Ảnh db](dbdiagram.png)
# 🚀 HƯỚNG DẪN DEPLOY ĐỒ ÁN THREEPANTHERS

## 📋 Tổng Quan

- **Backend**: Render.com (Java Spring Boot)
- **Frontend**: Vercel (React + Vite)
- **Database**: Neon PostgreSQL (đã có)

---

## 🔧 PHẦN 1: DEPLOY BACKEND LÊN RENDER

### Bước 1: Push code lên GitHub

```bash
cd /Users/nguyenmai/Documents/chuyendeweb/main/Bao_NLD
git add .
git commit -m "chore: Add deployment configurations for Render and Vercel"
git push origin mai
```

### Bước 2: Tạo tài khoản Render

1. Truy cập: https://render.com
2. Click **Sign Up** → Đăng nhập bằng GitHub
3. Cho phép Render truy cập repositories của bạn

### Bước 3: Deploy Backend

1. Vào Dashboard Render → Click **New +** → Chọn **Web Service**

2. **Connect Repository**:
   - Tìm repository `Bao_NLD` của bạn
   - Click **Connect**

3. **Cấu hình Service**:
   ```
   Name: threepanthers-backend
   Region: Singapore (gần Việt Nam nhất)
   Branch: mai
   Root Directory: ThreePanthers
   Runtime: Java
   Build Command: ./mvnw clean package -DskipTests
   Start Command: java -Dserver.port=$PORT -jar target/*.jar
   Instance Type: Free
   ```

4. **Environment Variables** - Click **Add Environment Variable**:
   
   ```
   JAVA_VERSION = 21
   
   SPRING_DATASOURCE_URL = jdbc:postgresql://ep-quiet-sun-ao6do42h-pooler.c-2.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require
   
   SPRING_DATASOURCE_USERNAME = neondb_owner
   
   SPRING_DATASOURCE_PASSWORD = npg_Bsp5fXYyNx2t
   
   SPRING_PROFILES_ACTIVE = prod
   
   JWT_SECRET = your-super-secret-jwt-key-min-256-bits-threepanthers-2024-secure
   
   MAIL_HOST = smtp.gmail.com
   
   MAIL_PORT = 587
   
   MAIL_USERNAME = [email của bạn]
   
   MAIL_PASSWORD = [app password của Gmail]
   
   CORS_ALLOWED_ORIGINS = http://localhost:5173,http://localhost:5174
   ```
   
   **LƯU Ý**: 
   - Thay `MAIL_USERNAME` và `MAIL_PASSWORD` bằng thông tin email thật
   - Để lấy App Password Gmail: https://myaccount.google.com/apppasswords

5. Click **Create Web Service**

6. Đợi 5-10 phút để build và deploy

7. **Lấy URL Backend**:
   - Sau khi deploy xong, bạn sẽ có URL dạng: `https://threepanthers-backend.onrender.com`
   - **SAO CHÉP URL NÀY** để dùng cho bước tiếp theo

---

## 🎨 PHẦN 2: DEPLOY FRONTEND LÊN VERCEL

### Bước 1: Tạo tài khoản Vercel

1. Truy cập: https://vercel.com
2. Click **Sign Up** → Đăng nhập bằng GitHub
3. Cho phép Vercel truy cập repositories

### Bước 2: Deploy Frontend

1. Vào Dashboard Vercel → Click **Add New** → **Project**

2. **Import Git Repository**:
   - Tìm repository `Bao_NLD`
   - Click **Import**

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**:
   - Click **Add Environment Variable**
   - Thêm biến:
   ```
   VITE_API_BASE_URL = https://threepanthers-backend.onrender.com
   ```
   
   ⚠️ **QUAN TRỌNG**: Thay `https://threepanthers-backend.onrender.com` bằng URL backend thật của bạn từ Bước 1.7

5. Click **Deploy**

6. Đợi 2-3 phút để build và deploy

7. **Lấy URL Frontend**:
   - Sau khi deploy xong: `https://threepanthers.vercel.app` (hoặc tên khác)
   - **SAO CHÉP URL NÀY**

---

## 🔄 PHẦN 3: CẬP NHẬT CORS CHO BACKEND

### Bước 1: Cập nhật CORS_ALLOWED_ORIGINS

1. Quay lại **Render Dashboard**
2. Vào service **threepanthers-backend**
3. Click tab **Environment**
4. Tìm biến `CORS_ALLOWED_ORIGINS`
5. **Cập nhật giá trị**:
   ```
   https://threepanthers.vercel.app,http://localhost:5173,http://localhost:5174
   ```
   ⚠️ Thay `https://threepanthers.vercel.app` bằng URL Vercel thật của bạn

6. Click **Save Changes**
7. Service sẽ tự động redeploy (1-2 phút)

---

## ✅ PHẦN 4: KIỂM TRA DEPLOYMENT

### Test Backend:

Mở trình duyệt, truy cập:
```
https://threepanthers-backend.onrender.com/api/posts
```

Kết quả mong đợi: JSON data của posts

### Test Frontend:

Mở trình duyệt, truy cập:
```
https://threepanthers.vercel.app
```

Kết quả mong đợi: Website hiển thị bình thường với data từ backend

### Test Login:

1. Truy cập: `https://threepanthers.vercel.app/login`
2. Đăng nhập với:
   - Email: `admin@threepanthers.com`
   - Password: `Admin@123`
3. Kiểm tra xem có vào được admin page không

---

## 🐛 XỬ LÝ SỰ CỐ

### Lỗi: Backend build failed

**Nguyên nhân**: Thiếu dependencies hoặc Java version sai

**Giải pháp**:
1. Kiểm tra `JAVA_VERSION = 21` trong Environment Variables
2. Kiểm tra logs: Render Dashboard → Logs tab
3. Đảm bảo `mvnw` có quyền execute:
   ```bash
   cd ThreePanthers
   chmod +x mvnw
   git add .
   git commit -m "fix: Add execute permission to mvnw"
   git push
   ```

### Lỗi: CORS error khi gọi API

**Nguyên nhân**: Chưa cập nhật CORS_ALLOWED_ORIGINS

**Giải pháp**:
1. Kiểm tra lại Environment Variable `CORS_ALLOWED_ORIGINS`
2. Đảm bảo có URL Vercel chính xác (không có dấu `/` ở cuối)
3. Redeploy backend

### Lỗi: Frontend hiển thị trắng

**Nguyên nhân**: `VITE_API_BASE_URL` sai hoặc thiếu

**Giải pháp**:
1. Vào Vercel → Project Settings → Environment Variables
2. Kiểm tra `VITE_API_BASE_URL` có đúng URL backend không
3. Redeploy: Deployments tab → click ... → Redeploy

### Lỗi: 503 Service Unavailable (Backend)

**Nguyên nhân**: Render Free tier sleep sau 15 phút không hoạt động

**Giải pháp**:
- Đợi 30-60 giây để service "wake up"
- Lần truy cập đầu tiên sẽ chậm, các lần sau sẽ nhanh

### Lỗi: Database connection failed

**Nguyên nhân**: Environment variables database sai

**Giải pháp**:
1. Kiểm tra lại 3 biến:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
2. Đảm bảo copy chính xác từ Neon Dashboard
3. Đảm bảo có `?sslmode=require` ở cuối URL

---

## 📱 PHẦN 5: TỐI ƯU HÓA (TÙY CHỌN)

### Custom Domain (Nếu có domain riêng)

**Vercel**:
1. Settings → Domains
2. Add domain của bạn
3. Cấu hình DNS theo hướng dẫn

**Render**:
1. Settings → Custom Domain
2. Add domain của bạn
3. Cấu hình DNS theo hướng dẫn

### SSL/HTTPS

- ✅ Render và Vercel tự động cấp SSL certificate miễn phí
- ✅ HTTPS được bật mặc định

### Monitoring

**Render**:
- Dashboard → Metrics: xem CPU, Memory, Response time
- Logs: xem real-time logs

**Vercel**:
- Analytics tab: xem traffic, performance
- Logs: xem deployment logs

---

## 🎯 CHECKLIST HOÀN THÀNH

- [ ] Backend deployed lên Render
- [ ] Frontend deployed lên Vercel
- [ ] CORS_ALLOWED_ORIGINS đã cập nhật
- [ ] Test API từ Postman/Browser
- [ ] Test website từ trình duyệt
- [ ] Test login/register
- [ ] Test admin page
- [ ] Test tạo/sửa/xóa posts

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:
1. Kiểm tra Logs trên Render/Vercel
2. Kiểm tra Console của trình duyệt (F12)
3. Kiểm tra Network tab để xem API calls

---

## 🎉 KẾT QUẢ

Sau khi hoàn thành, bạn sẽ có:

- ✅ Backend API: `https://threepanthers-backend.onrender.com`
- ✅ Frontend Website: `https://threepanthers.vercel.app`
- ✅ HTTPS tự động
- ✅ Tự động deploy khi push code lên GitHub
- ✅ Miễn phí 100%

---

**Chúc mừng! Đồ án của bạn đã được deploy thành công! 🎊**

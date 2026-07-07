# 📚 CHUẨN BỊ TRÁ LỜI CÂU HỎI - ĐỒ ÁN THREEPANTHERS

> **Mục đích**: Cheat sheet cho presentation và vấn đáp với giảng viên/hội đồng

---

## 1️⃣ TẠI SAO CHỌN CÔNG NGHỆ X THAY VÌ Y?

### **Spring Boot vs Node.js**

**Câu trả lời:**
> Em chọn Spring Boot vì:

**✅ Lý do chính:**
1. **Mature ecosystem** - Spring Boot có hệ sinh thái hoàn chỉnh với Spring Security, Spring Data JPA đã tích hợp sẵn
2. **Type safety** - Java là strongly typed, giảm bug runtime
3. **Enterprise standard** - Spring Boot là chuẩn trong doanh nghiệp, phù hợp với hệ thống lớn
4. **Built-in features** - Có sẵn validation, security, transaction management
5. **Performance** - JVM optimization tốt cho long-running applications
6. **Learning goal** - Đồ án này để học Java backend, phù hợp với yêu cầu môn học

**❌ Tại sao không dùng Node.js:**
- Node.js tốt cho real-time apps (chat, streaming)
- Nhưng với website tin tức: không cần real-time, cần stability và security
- Spring Boot có authentication/authorization mạnh mẽ hơn out-of-the-box

---

### **React vs Angular/Vue**

**Câu trả lời:**
> Em chọn React vì:

**✅ Lý do chính:**
1. **Component-based** - Dễ tái sử dụng (PostCard, Header, Sidebar...)
2. **Large community** - Nhiều thư viện hỗ trợ (React Router, Axios...)
3. **Virtual DOM** - Performance tốt khi render nhiều bài viết
4. **Flexible** - Không opinionated như Angular, dễ customize
5. **Hooks** - useState, useEffect, useContext giúp code clean hơn class components
6. **Job market** - React phổ biến nhất, có lợi cho tương lai

**❌ Tại sao không dùng Angular:**
- Angular quá nặng cho project này
- Learning curve cao hơn
- TypeScript bắt buộc (React cho phép chọn)

**❌ Tại sao không dùng Vue:**
- Vue tốt nhưng community nhỏ hơn React
- Ít tài liệu và examples hơn

---

### **JWT vs Session**

**Câu trả lời:**
> Em chọn JWT vì:

**✅ Lý do chính:**
1. **Stateless** - Server không cần lưu session, dễ scale horizontal
2. **Microservices ready** - Có thể dùng chung token cho nhiều services
3. **Mobile-friendly** - Dễ dùng cho mobile apps (không cần cookies)
4. **RESTful principle** - REST API nên stateless
5. **CORS-friendly** - Không bị vấn đề cross-origin như cookies
6. **Decentralized** - Token tự chứa thông tin (user ID, role), không cần query DB

**❌ Tại sao không dùng Session:**
- Session phải lưu server-side (Redis/Memory) → thêm dependency
- Khó scale: cần sticky sessions hoặc shared session store
- Không phù hợp với architecture hiện đại (SPA + API)

**🔒 Security đã làm:**
- Token expire sau 24 giờ
- Secret key mạnh (256-bit)
- HTTPS để prevent token stealing
- Token lưu localStorage (có thể đổi sang httpOnly cookie nếu cần)

---

### **PostgreSQL vs MySQL**

**Câu trả lời:**
> Em chọn PostgreSQL vì:

**✅ Lý do chính:**
1. **Advanced features** - Hỗ trợ JSON, full-text search native
2. **ACID compliance** - Transaction reliability tốt hơn
3. **Data integrity** - Foreign key constraints được enforce nghiêm ngặt
4. **Concurrent performance** - MVCC (Multi-Version Concurrency Control) tốt hơn MySQL
5. **Open source** - Hoàn toàn miễn phí, không có enterprise version
6. **Modern** - Active development, features mới thường xuyên

**❌ Tại sao không dùng MySQL:**
- MySQL tốt cho read-heavy workloads
- Nhưng PostgreSQL toàn diện hơn
- MySQL có một số quirks (ví dụ: silent truncation)

**📊 Trong project này:**
- Dùng relationships phức tạp (Post ↔ Category, Post ↔ Tags)
- Cần transaction khi tạo/update posts
- Full-text search cho tìm kiếm bài viết (nếu implement)


---

## 2️⃣ GIẢI THÍCH FLOW AUTHENTICATION

### **Bước 1: User đăng nhập**

**Frontend (LoginForm.tsx):**
```typescript
// User nhập email + password
const handleSubmit = async (e) => {
  const response = await authService.login({ email, password });
  // Nhận về: { token, username, role }
  localStorage.setItem('token', response.token);
  setUser({ username, role });
  navigate('/');
}
```

**Backend (AuthController.java):**
```java
@PostMapping("/login")
public SuccessResponse<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto req) {
    // 1. Validate email/password
    // 2. Nếu đúng, tạo JWT token
    // 3. Trả về token + user info
}
```

---

### **Bước 2: JWT được tạo như thế nào**

**File: JwtUtils.java**

```java
public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    // Thêm role vào token
    claims.put("role", userDetails.getAuthorities());
    
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(userDetails.getUsername())  // Email
        .setIssuedAt(new Date())                // Thời gian tạo
        .setExpiration(new Date(System.currentTimeMillis() + expiration)) // Expire sau 24h
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)  // Sign với secret key
        .compact();
}
```

**Cấu trúc JWT:**
```
Header.Payload.Signature
eyJhbGc...  ← Algorithm (HS256)
.eyJzdWI... ← Data (email, role, exp)
.SflKxwR... ← Signature (verify integrity) chữ ký
```

---

### **Bước 3: Frontend lưu token ở đâu**

**File: AuthContext.tsx**

```typescript
const login = async (credentials) => {
  const response = await authService.login(credentials);
  
  // Lưu vào localStorage
  localStorage.setItem('token', response.token);
  localStorage.setItem('username', response.username);
  localStorage.setItem('role', response.role);
  
  setUser({ username: response.username, role: response.role });
};
```

**⚠️ Security note:**
- **localStorage**: Dễ bị XSS attack
- **Alternative**: httpOnly cookie (chống XSS nhưng cần config CORS)
- **Trong project này**: Dùng localStorage vì đơn giản, phù hợp demo


---

### **Bước 4: Token được gửi lên server ra sao**

**File: axios.client.ts**

```typescript
// Axios interceptor - tự động thêm token vào mọi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
```

**HTTP Request thực tế:**
```http
GET /api/user/profile HTTP/1.1
Host: localhost:8080
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

---

### **Bước 5: Server validate token thế nào**

**File: JwtAuthenticationFilter.java**

```java
@Override
protected void doFilterInternal(HttpServletRequest request, ...) {
    // 1. Lấy token từ header
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }
    
    String jwt = authHeader.substring(7); // Bỏ "Bearer "
    String username = jwtUtils.extractUsername(jwt);
    
    // 2. Load user từ database
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    
    // 3. Validate token
    if (jwtUtils.isTokenValid(jwt, userDetails)) {
        // Token hợp lệ → Set vào SecurityContext
        UsernamePasswordAuthenticationToken authToken = 
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
            );
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
    
    filterChain.doFilter(request, response);
}
```

**Validation steps:**
1. ✅ Token có đúng format không?
2. ✅ Token có hết hạn chưa? (check `exp` claim)
3. ✅ Signature có đúng không? (verify với secret key)
4. ✅ User trong token có tồn tại không? (query database)

---

### **📊 Flow diagram:**

```
[User] 
  ↓ 1. POST /login (email, password)
[Backend AuthController] 
  ↓ 2. Validate credentials
[AuthenticationManager] 
  ↓ 3. Check DB
[UserDetailsService]
  ↓ 4. Tạo JWT token
[JwtUtils]
  ↓ 5. Trả về token
[Frontend]
  ↓ 6. Lưu localStorage
  ↓ 7. GET /api/user/profile
  ↓    (Header: Bearer token)
[JwtAuthenticationFilter]
  ↓ 8. Extract & validate token
  ↓ 9. Set SecurityContext
[UserController]
  ↓ 10. Trả về user data
[Frontend]
  ↓ 11. Hiển thị profile
```


---

## 3️⃣ PHÂN QUYỀN HOẠT ĐỘNG NHƯ THẾ NÀO?

### **Roles trong hệ thống**

```java
public enum UserRole {
    ADMIN,     // Quản lý toàn bộ: users, posts, categories
    EDITOR,    // Biên tập: tạo/sửa/xóa posts
    REPORTER,  // Phóng viên: tạo posts (chờ duyệt)
    USER       // Người dùng: xem, comment
}
```

### **URL-based Authorization**

**File: SecurityConfig.java**

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    http.authorizeHttpRequests(auth -> auth
        // Public endpoints - không cần login
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/posts/**").permitAll()
        .requestMatchers("/api/categories/**").permitAll()
        
        // Admin only
        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
        
        // Authenticated users
        .anyRequest().authenticated()
    );
}
```

**Giải thích:**
- `/api/auth/login` → Public (ai cũng truy cập được)
- `/api/posts` → Public (xem bài viết không cần login)
- `/api/admin/*` → Chỉ ADMIN (quản lý users/posts)
- `/api/user/profile` → Authenticated (phải login)

---

### **Method-level Authorization**

**File: AdminController.java**

```java
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")  // ← Cả controller chỉ ADMIN
public class AdminController {
    
    @GetMapping("/users")
    public PageResponse<AdminUserResponseDto> getUsers() {
        // Chỉ ADMIN có thể xem danh sách users
    }
    
    @DeleteMapping("/users/{id}")
    public SuccessResponse<Void> deleteUser(@PathVariable String id) {
        // Chỉ ADMIN có thể xóa users
    }
}
```

**File: UserController.java**

```java
@PatchMapping("/profile")
@PreAuthorize("isAuthenticated()")  // ← Chỉ cần login
public SuccessResponse<UserResponseDto> updateProfile(...) {
    // User có thể update profile của chính mình
}
```

**Lợi ích:**
- ✅ Fine-grained control (kiểm soát từng method)
- ✅ Declarative (rõ ràng, dễ maintain)
- ✅ Reusable (SpEL expressions)


### **Frontend Route Protection**

**File: AdminRoute.tsx**

```typescript
export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;  // Chưa login → redirect
  }
  
  if (user.role !== 'ADMIN') {
    return <Navigate to="/" />;       // Không phải admin → về home
  }
  
  return children;  // OK → render AdminPage
};
```

**File: App.tsx**

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* Protected route */}
  <Route path="/admin" element={
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  } />
</Routes>
```

**🔒 Double protection:**
1. **Frontend**: Ẩn UI, redirect nếu không có quyền
2. **Backend**: API trả 403 Forbidden nếu không có quyền

→ Frontend protection chỉ là UX, backend mới là security thật sự!

---

## 4️⃣ VALIDATION Ở ĐÂU?

### **Backend Validation với @Valid**

**File: RegisterRequestDto.java**

```java
public class RegisterRequestDto {
    @NotBlank(message = "Username không được để trống")
    @Size(min = 3, max = 50, message = "Username từ 3-50 ký tự")
    private String username;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @NotBlank(message = "Password không được để trống")
    @Size(min = 6, message = "Password tối thiểu 6 ký tự")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).*$", 
             message = "Password phải có chữ hoa, chữ thường và số")
    private String password;
}
```

**File: AuthController.java**

```java
@PostMapping("/register")
public SuccessResponse<AuthResponseDto> register(
    @Valid @RequestBody RegisterRequestDto req  // ← @Valid trigger validation
) {
    return authService.register(req);
}
```

**Khi validation fail:**
```json
{
  "status": 400,
  "message": "Validation failed",
  "details": {
    "email": "Email không hợp lệ",
    "password": "Password tối thiểu 6 ký tự"
  }
}
```


### **Frontend Validation với custom functions**

**File: validation.ts**

```typescript
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email không được để trống';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email không hợp lệ';
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Mật khẩu không được để trống';
  if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
  
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasUpper || !hasLower || !hasNumber) {
    return 'Mật khẩu phải có chữ hoa, chữ thường và số';
  }
  
  return null;
};
```

**File: RegisterForm.tsx**

```typescript
const [errors, setErrors] = useState<ValidationErrors>({});

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  // Client-side validation
  const newErrors: ValidationErrors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) newErrors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) newErrors.password = passwordError;
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;  // Stop nếu có lỗi
  }
  
  // Call API
  try {
    await authService.register(formData);
  } catch (error) {
    // Server validation errors
    if (error.response?.data?.details) {
      setErrors(error.response.data.details);
    }
  }
};
```

**🎯 Validation layers:**
1. **Frontend (immediate)** - UX tốt, instant feedback
2. **Backend (trusted)** - Security, không thể bypass
3. **Database (constraints)** - Data integrity

---

### **Error Handling**

**Backend: GlobalExceptionHandler.java**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // Handle @Valid validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
        MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        return ResponseEntity.badRequest().body(
            ErrorResponse.builder()
                .status(400)
                .message("Validation failed")
                .details(errors)
                .build()
        );
    }
    
    // Handle custom exceptions
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(
            ErrorResponse.builder()
                .status(404)
                .message(ex.getMessage())
                .build()
        );
    }
}
```


**Frontend Error Handling:**

```typescript
// File: axios.client.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → logout
      localStorage.clear();
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Forbidden → show message
      alert('Bạn không có quyền truy cập');
    }
    
    return Promise.reject(error);
  }
);
```

---

## 5️⃣ JPA RELATIONSHIPS

### **OneToMany: Category → Posts**

**File: CategoryEntity.java**

```java
@Entity
@Table(name = "categories")
public class CategoryEntity {
    @Id
    private String id;
    
    private String name;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<PostEntity> posts = new ArrayList<>();
}
```

**File: PostEntity.java**

```java
@Entity
@Table(name = "posts")
public class PostEntity {
    @Id
    private String id;
    
    private String title;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
}
```

**Giải thích:**
- **OneToMany**: 1 category có nhiều posts
- **ManyToOne**: Nhiều posts thuộc 1 category
- **mappedBy**: "category" là field ở PostEntity (không tạo bảng mới)
- **@JoinColumn**: Tạo foreign key `category_id` trong bảng `posts`

---

### **ManyToMany: Post ↔ Tags**

**File: PostEntity.java**

```java
@ManyToMany(fetch = FetchType.LAZY)
@JoinTable(
    name = "post_tags",                    // Tên bảng trung gian
    joinColumns = @JoinColumn(name = "post_id"),
    inverseJoinColumns = @JoinColumn(name = "tag_id")
)
private Set<TagEntity> tags = new HashSet<>();
```

**Database schema:**
```sql
-- Bảng trung gian
CREATE TABLE post_tags (
    post_id VARCHAR(255),
    tag_id VARCHAR(255),
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

**Giải thích:**
- 1 post có nhiều tags
- 1 tag có nhiều posts
- Cần bảng trung gian `post_tags`


### **FetchType: LAZY vs EAGER**

**LAZY (default cho @ManyToMany, @OneToMany):**
```java
@ManyToOne(fetch = FetchType.LAZY)
private CategoryEntity category;
```

- Không load ngay khi query
- Chỉ load khi truy cập: `post.getCategory().getName()`
- **Lợi ích**: Performance tốt hơn
- **Nhược điểm**: LazyInitializationException nếu session đã close

**EAGER:**
```java
@ManyToOne(fetch = FetchType.EAGER)
private CategoryEntity category;
```

- Load ngay cùng entity chính
- **Lợi ích**: Không bị LazyInitializationException
- **Nhược điểm**: Performance kém nếu không dùng

**Trong project này:**
```java
// PostEntity.java
@ManyToOne(fetch = FetchType.LAZY)  // Không phải lúc nào cũng cần category
private CategoryEntity category;

@ManyToMany(fetch = FetchType.LAZY)  // Tags chỉ load khi cần
private Set<TagEntity> tags;
```

---

### **CascadeType**

```java
@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
private List<PostEntity> posts;
```

**CascadeType options:**
- **ALL**: Cascade mọi operations (persist, merge, remove, refresh, detach)
- **PERSIST**: Khi save category → auto save posts
- **REMOVE**: Khi xóa category → auto xóa posts
- **MERGE**: Khi update category → auto update posts

**⚠️ Cẩn thận với CascadeType.REMOVE:**
```java
// Nếu xóa category → TẤT CẢ posts bị xóa!
categoryRepository.delete(category);
```

**Trong project:**
- Category → Posts: **CascadeType.ALL** (xóa category thì xóa posts)
- Post → Tags: **Không cascade** (xóa post không xóa tags)

---

## 6️⃣ ASYNC PROCESSING

### **Tại sao dùng @Async cho email?**

**File: EmailService.java**

```java
@Service
public class EmailService {
    
    @Async  // ← Method chạy trong thread riêng
    public void sendVerificationEmail(String to, String verificationCode) {
        // Gửi email mất 2-3 giây
        MimeMessage message = mailSender.createMimeMessage();
        // ... setup email
        mailSender.send(message);
    }
}
```

**❌ Không dùng @Async:**
```
User register → Server gửi email (3s) → Response trả về
                       ↑
                  User phải đợi 3s!
```

**✅ Dùng @Async:**
```
User register → Response trả về ngay (0.1s)
                ↓
                Server gửi email background (3s)
                User không phải đợi!
```


### **Thread Pool Configuration**

**File: AsyncConfig.java**

```java
@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        
        executor.setCorePoolSize(2);       // 2 threads luôn sẵn sàng
        executor.setMaxPoolSize(5);        // Tối đa 5 threads
        executor.setQueueCapacity(100);    // Queue 100 tasks nếu hết threads
        executor.setThreadNamePrefix("Async-");
        
        executor.initialize();
        return executor;
    }
}
```

**Giải thích:**
- **CorePoolSize (2)**: 2 threads chạy mặc định
- **MaxPoolSize (5)**: Khi quá tải, tạo thêm tối đa 5 threads
- **QueueCapacity (100)**: Nếu 5 threads đều busy → queue 100 tasks

**Ví dụ:**
```
10 users đăng ký cùng lúc:
- 2 emails gửi ngay (2 core threads)
- 5 emails đợi thread (max 5 threads)
- 3 emails vào queue
- Queue xử lý lần lượt
```

---

### **Lợi ích của Async**

1. **Better UX** - User không phải đợi
2. **Higher throughput** - Server xử lý nhiều requests hơn
3. **Resource efficiency** - CPU không bị block
4. **Scalability** - Dễ scale horizontal

**Use cases trong project:**
- ✅ Gửi email verification
- ✅ Gửi email reset password
- ✅ Gửi email notification (nếu có)
- ❌ KHÔNG dùng async cho: Login, tạo post (cần response ngay)

---

## 7️⃣ REACT HOOKS ĐÃ DÙNG

### **useState - Quản lý state**

```typescript
// AdminPage.tsx
const [users, setUsers] = useState<AdminUser[]>([]);
const [loading, setLoading] = useState(true);
const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

// Update state
setUsers([...users, newUser]);
setLoading(false);
```

**Khi dùng:**
- Component data thay đổi (form input, list data, UI state)
- Re-render khi state thay đổi

---

### **useEffect - Side effects**

```typescript
// index.tsx
useEffect(() => {
  // Chạy khi component mount (load data)
  const fetchPosts = async () => {
    const response = await postService.getPosts();
    setPosts(response.data);
  };
  
  fetchPosts();
}, []); // ← Empty array: chỉ chạy 1 lần khi mount

// Cleanup function
useEffect(() => {
  const timer = setInterval(() => {
    // Auto refresh posts every 30s
    fetchPosts();
  }, 30000);
  
  return () => clearInterval(timer); // ← Cleanup khi unmount
}, []);
```

**Khi dùng:**
- Fetch data từ API
- Subscribe/unsubscribe events
- Setup timers
- Update document title


---

### **useMemo - Performance optimization**

```typescript
// AdminPage.tsx
const filteredUsers = useMemo(() => {
  const keyword = userSearch.trim().toLowerCase();
  
  return users.filter(user => {
    const matchesKeyword = 
      user.username.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword);
    
    const matchesRole = userRoleFilter === 'ALL' || user.role === userRoleFilter;
    
    return matchesKeyword && matchesRole;
  });
}, [users, userSearch, userRoleFilter]); // ← Chỉ tính lại khi dependencies thay đổi
```

**Khi dùng:**
- Tính toán phức tạp (filter, sort, map)
- Tránh re-calculate mỗi lần render

**❌ Không dùng useMemo:**
```typescript
const filteredUsers = users.filter(...); // ← Re-calculate mỗi lần render!
```

**✅ Dùng useMemo:**
```typescript
const filteredUsers = useMemo(() => users.filter(...), [users, search]);
// ← Chỉ calculate khi users hoặc search thay đổi
```

---

### **useContext - Global state**

```typescript
// AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response);
    localStorage.setItem('token', response.token);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**Sử dụng trong component:**

```typescript
// AdminPage.tsx
const { user, logout } = useAuth();

if (!user) return <Navigate to="/login" />;

return (
  <div>
    <p>Welcome, {user.username}</p>
    <button onClick={logout}>Logout</button>
  </div>
);
```

**Khi dùng:**
- Authentication state (user, token)
- Theme (dark/light mode)
- Language (i18n)
- Shared state giữa nhiều components

**Lợi ích:**
- Tránh prop drilling (truyền props qua nhiều tầng)
- Global state management đơn giản (thay vì Redux)


---

### **Custom Hooks**

```typescript
// useNewsData.ts
const useNewsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postService.getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { posts, loading };
};

// Sử dụng
const HomePage = () => {
  const { posts, loading } = useNewsData();
  
  if (loading) return <Spinner />;
  
  return <PostList posts={posts} />;
};
```

**Lợi ích Custom Hooks:**
- ✅ Reusable logic
- ✅ Separate concerns
- ✅ Easier testing
- ✅ Cleaner components

---

## 8️⃣ XỬ LÝ LỖI

### **Backend Error Handling**

**GlobalExceptionHandler.java**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // 1. Validation errors (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(...) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        return ResponseEntity.badRequest().body(
            ErrorResponse.builder()
                .status(400)
                .message("Validation failed")
                .details(errors)
                .build()
        );
    }
    
    // 2. Resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(...) {
        return ResponseEntity.status(404).body(
            ErrorResponse.builder()
                .status(404)
                .message(ex.getMessage())
                .build()
        );
    }
    
    // 3. Authentication errors
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(...) {
        return ResponseEntity.status(401).body(
            ErrorResponse.builder()
                .status(401)
                .message("Email hoặc mật khẩu không đúng")
                .build()
        );
    }
    
    // 4. Authorization errors
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(...) {
        return ResponseEntity.status(403).body(
            ErrorResponse.builder()
                .status(403)
                .message("Bạn không có quyền truy cập")
                .build()
        );
    }
    
    // 5. Generic errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericError(...) {
        return ResponseEntity.status(500).body(
            ErrorResponse.builder()
                .status(500)
                .message("Lỗi server nội bộ")
                .build()
        );
    }
}
```


### **Frontend Error Handling**

**axios.client.ts - Interceptors**

```typescript
// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 401:
          // Unauthorized - Token expired
          localStorage.clear();
          window.location.href = '/login';
          break;
          
        case 403:
          // Forbidden - No permission
          alert('Bạn không có quyền truy cập');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found');
          break;
          
        case 500:
          // Server error
          alert('Lỗi server, vui lòng thử lại sau');
          break;
      }
    } else if (error.request) {
      // Request made but no response (network error)
      alert('Không thể kết nối đến server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);
```

**Component-level error handling:**

```typescript
// LoginForm.tsx
const [error, setError] = useState<string>('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError('');  // Clear previous errors
  setLoading(true);
  
  try {
    const response = await authService.login(formData);
    login(response);
    navigate('/');
  } catch (err: any) {
    // Handle different error types
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else if (err.request) {
      setError('Không thể kết nối đến server');
    } else {
      setError('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  } finally {
    setLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {error && (
      <div className="error-message">
        {error}
      </div>
    )}
    
    <button type="submit" disabled={loading}>
      {loading ? 'Đang xử lý...' : 'Đăng nhập'}
    </button>
  </form>
);
```

**Error boundaries (cho React errors):**

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Có lỗi xảy ra. Vui lòng refresh trang.</h1>;
    }
    
    return this.props.children;
  }
}
```

---

## 📝 TIPS KHI TRẢ LỜI

### ✅ **DO:**
- Trả lời ngắn gọn, đi thẳng vào vấn đề
- Dùng ví dụ cụ thể từ code của mình
- Thừa nhận nếu không biết, đừng bịa
- Giải thích "tại sao" chọn công nghệ, không chỉ "cái gì"

### ❌ **DON'T:**
- Nói chung chung, lý thuyết suông
- Claim "best practice" mà không giải thích
- Nói xấu công nghệ khác
- Quá tự tin về những gì chưa làm

---

## 🎯 CÂU HỎI HAY GẶP

**Q: "Em có test không?"**
> Có validate input, handle errors, nhưng chưa có unit tests tự động. 
> Nếu làm lại, em sẽ dùng JUnit cho backend và Jest cho frontend.

**Q: "Tại sao không dùng Redis cho cache?"**
> Project này scale nhỏ, database query đủ nhanh. 
> Redis thêm complexity mà chưa thực sự cần thiết.
> Nếu traffic tăng, có thể cache posts, categories.

**Q: "Security còn thiếu gì?"**
> - HTTPS (production đã có)
> - Rate limiting (chưa có)
> - Input sanitization (có validate nhưng chưa sanitize HTML)
> - CSRF protection (JWT không cần như session)

**Q: "Có CI/CD không?"**
> Đang manual deploy. Nếu mở rộng, sẽ dùng GitHub Actions:
> - Auto test khi push
> - Auto deploy lên Render/Vercel khi merge

---

**🎊 Chúc cậu presentation tốt!**

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
} from '@heroui/react';
import {
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Newspaper,
  RefreshCcw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';

import Pagination from '@/components/common/Pagination';
import { useAuth } from '@/contexts/AuthContext';
import { adminService } from '@/services/admin.service';
import {
  AdminPost,
  AdminPostUpdateRequest,
  AdminUser,
  AdminUserUpdateRequest,
  PostStatus,
  UserRole,
  UserStatus,
} from '@/types';

type AdminTab = 'users' | 'posts';
//
const userRoles: UserRole[] = [
  UserRole.ADMIN,
  UserRole.EDITOR,
  UserRole.REPORTER,
  UserRole.USER,
];

const userStatuses: UserStatus[] = [
  UserStatus.ACTIVE,
  UserStatus.INACTIVE,
  UserStatus.BLOCKED,
];

const postStatuses: PostStatus[] = [
  PostStatus.DRAFT,
  PostStatus.PENDING,
  PostStatus.PUBLISHED,
  PostStatus.REJECT,
];

const pageSize = 8;

function AdminBadge({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-white/70">{label}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

type UserRowProps = {
  user: AdminUser;
  onSaved: (updatedUser: AdminUser) => void;
  onDeleted: (userId: string) => void;
};

type PostRowProps = {
  post: AdminPost;
  onSaved: (updatedPost: AdminPost) => void;
  onDeleted: (postId: string) => void;
};

function UserRow({ user, onSaved, onDeleted }: UserRowProps) {
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setRole(user.role);
    setStatus(user.status);
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: AdminUserUpdateRequest = { role, status };
      const response = await adminService.updateUser(user.id, payload);
      // Truyền dữ liệu đã cập nhật lên parent
      onSaved(response.data);
    } catch (error: any) {
      alert(error.message || 'Không thể cập nhật người dùng');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Xóa người dùng ${user.username}?`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      await adminService.deleteUser(user.id);
      // Truyền ID lên parent để xóa khỏi state
      onDeleted(user.id);
    } catch (error: any) {
      alert(error.message || 'Không thể xóa người dùng');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
      <td className="px-4 py-4">
        <div className="font-semibold text-slate-900">{user.username}</div>
        <div className="text-xs text-slate-500">{user.email}</div>
      </td>
      <td className="px-4 py-4">
        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          {userRoles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4">
        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
          value={status}
          onChange={(e) => setStatus(e.target.value as UserStatus)}
        >
          {userStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
        {user.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN') : '-'}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            className="bg-[#004b9a] text-white"
            isLoading={saving}
            size="sm"
            onPress={handleSave}
          >
            Lưu
          </Button>
          <Button
            color="danger"
            isLoading={deleting}
            size="sm"
            startContent={<Trash2 size={14} />}
            variant="flat"
            onPress={handleDelete}
          >
            Xóa
          </Button>
        </div>
      </td>
    </tr>
  );
}

function PostRow({ post, onSaved, onDeleted }: PostRowProps) {
  const [status, setStatus] = useState<PostStatus>(post.status);
  const [isFeatured, setIsFeatured] = useState(Boolean(post.isFeatured));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatus(post.status);
    setIsFeatured(Boolean(post.isFeatured));
  }, [post]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: AdminPostUpdateRequest = { status, isFeatured };
      const response = await adminService.updatePost(post.id, payload);
      // Truyền dữ liệu đã cập nhật lên parent
      onSaved(response.data);
    } catch (error: any) {
      alert(error.message || 'Không thể cập nhật bài viết');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Xóa bài viết "${post.title}"?`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      await adminService.deletePost(post.id);
      // Truyền ID lên parent để xóa khỏi state
      onDeleted(post.id);
    } catch (error: any) {
      alert(error.message || 'Không thể xóa bài viết');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors align-top">
      <td className="px-4 py-4 max-w-[380px]">
        <div className="font-semibold text-slate-900 line-clamp-2">{post.title}</div>
        <div className="text-xs text-slate-500 mt-1">{post.slug}</div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{post.author || '-'}</td>
      <td className="px-4 py-4 text-sm text-slate-600">{post.category || '-'}</td>
      <td className="px-4 py-4">
        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
        >
          {postStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4 text-center">
        <input
          checked={isFeatured}
          className="h-4 w-4 accent-[#004b9a]"
          type="checkbox"
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            className="bg-[#004b9a] text-white"
            isLoading={saving}
            size="sm"
            onPress={handleSave}
          >
            Lưu
          </Button>
          <Button
            color="danger"
            isLoading={deleting}
            size="sm"
            startContent={<Trash2 size={14} />}
            variant="flat"
            onPress={handleDelete}
          >
            Xóa
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'ALL' | UserRole>('ALL');
  const [userStatusFilter, setUserStatusFilter] = useState<'ALL' | UserStatus>('ALL');
  const [postSearch, setPostSearch] = useState('');
  const [postStatusFilter, setPostStatusFilter] = useState<'ALL' | PostStatus>('ALL');
  const [postFeaturedFilter, setPostFeaturedFilter] = useState<'ALL' | 'FEATURED' | 'NORMAL'>('ALL');
  const [userPage, setUserPage] = useState(1);
  const [postPage, setPostPage] = useState(1);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Xử lý cập nhật user
  const handleUserSaved = (updatedUser: AdminUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  // Xử lý xóa user
  const handleUserDeleted = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
  };

  // Xử lý cập nhật post
  const handlePostSaved = (updatedPost: AdminPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  // Xử lý xóa post
  const handlePostDeleted = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const [userRes, postRes] = await Promise.all([
        adminService.getUsers(),
        adminService.getPosts(),
      ]);

      setUsers(userRes.data ?? []);
      setPosts(postRes.data ?? []);
    } catch (error) {
      console.error('Load admin data error:', error);
      setUsers([]);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setUserPage(1);
  }, [userSearch, userRoleFilter, userStatusFilter]);

  useEffect(() => {
    setPostPage(1);
  }, [postSearch, postStatusFilter, postFeaturedFilter]);

  const filteredUsers = useMemo(() => {
    const keyword = userSearch.trim().toLowerCase();

    return users.filter((user) => {
      const matchesKeyword =
        !keyword ||
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      const matchesRole = userRoleFilter === 'ALL' || user.role === userRoleFilter;
      const matchesStatus =
        userStatusFilter === 'ALL' || user.status === userStatusFilter;

      return matchesKeyword && matchesRole && matchesStatus;
    });
  }, [users, userSearch, userRoleFilter, userStatusFilter]);

  const filteredPosts = useMemo(() => {
    const keyword = postSearch.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesKeyword =
        !keyword ||
        post.title.toLowerCase().includes(keyword) ||
        (post.author || '').toLowerCase().includes(keyword) ||
        (post.category || '').toLowerCase().includes(keyword);

      const matchesStatus =
        postStatusFilter === 'ALL' || post.status === postStatusFilter;
      const matchesFeatured =
        postFeaturedFilter === 'ALL' ||
        (postFeaturedFilter === 'FEATURED' ? post.isFeatured : !post.isFeatured);

      return matchesKeyword && matchesStatus && matchesFeatured;
    });
  }, [posts, postSearch, postStatusFilter, postFeaturedFilter]);

  const userTotalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const postTotalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  const currentUsers = filteredUsers.slice((userPage - 1) * pageSize, userPage * pageSize);
  const currentPosts = filteredPosts.slice((postPage - 1) * pageSize, postPage * pageSize);

  useEffect(() => {
    if (userPage > userTotalPages) {
      setUserPage(userTotalPages);
    }
  }, [userPage, userTotalPages]);

  useEffect(() => {
    if (postPage > postTotalPages) {
      setPostPage(postTotalPages);
    }
  }, [postPage, postTotalPages]);

  const stats = useMemo(
    () => [
      { label: 'Người dùng', value: users.length, icon: Users },
      { label: 'Bài viết', value: posts.length, icon: Newspaper },
      {
        label: 'Admin',
        value: users.filter((user) => user.role === 'ADMIN').length,
        icon: ShieldCheck,
      },
      {
        label: 'Đang hiển thị',
        value: posts.filter((post) => post.status === 'PUBLISHED').length,
        icon: BarChart3,
      },
    ],
    [users, posts]
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#071a3a] via-[#0a2f66] to-[#004b9a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <ShieldCheck size={16} />
              Admin Console
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden text-right md:block">
                <div className="text-sm font-semibold">{user?.username}</div>
                <div className="text-xs text-white/70">{user?.role}</div>
              </div>
              <Button
                className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                size="sm"
                startContent={<LogOut size={16} />}
                variant="flat"
                onPress={handleLogout}
              >
                Đăng xuất
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                Quản trị nội dung Báo Lao Động một cách tập trung và hiệu quả
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                Quản lý tài khoản người dùng, bài viết và danh mục tin tức trên một hệ thống thống nhất,
                giúp kiểm soát nội dung nhanh chóng, chính xác và an toàn.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <AdminBadge
                    key={item.label}
                    label={item.label}
                    value={
                      <span className="inline-flex items-center gap-2">
                        <Icon size={18} /> {item.value}
                      </span>
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <Card className="border border-slate-200 shadow-sm">
              <CardBody className="space-y-4 p-5">
                <div className="flex items-center gap-2 text-slate-900">
                  <LayoutDashboard size={18} className="text-[#004b9a]" />
                  <h2 className="font-bold">Khu vực điều khiển</h2>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">Người dùng</div>
                    <div className="mt-1 leading-6">
                      Tìm kiếm, phân quyền, cập nhật thông tin và quản lý trạng thái tài khoản người dùng.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">Bài viết</div>
                    <div className="mt-1 leading-6">
                      Quản lý bài viết, cập nhật trạng thái, đánh dấu bài viết nổi bật và xóa nội dung khi cần thiết.
                    </div>
                  </div>
                </div>
                <Button
                  className="bg-[#004b9a] text-white"
                  startContent={<RefreshCcw size={16} />}
                  onPress={refresh}
                >
                  Làm mới dữ liệu
                </Button>
              </CardBody>
            </Card>

            <Card className="border border-slate-200 shadow-sm">
              <CardBody className="space-y-3 p-5">
                <div className="flex items-center gap-2 text-slate-900">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <h2 className="font-bold">Lưu ý</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Thao tác này sẽ xóa dữ liệu khỏi cơ sở dữ liệu và không thể khôi phục. Vui lòng xác nhận trước khi tiếp tục.
                </p>
              </CardBody>
            </Card>
          </aside>

          <main className="space-y-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardBody className="p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {activeTab === 'users' ? 'Quản lý người dùng' : 'Quản lý bài viết'}
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      {activeTab === 'users'
                        ? 'Danh sách người dùng'
                        : 'Danh sách bài viết'}
                    </h2>
                  </div>

                  <div className="inline-flex rounded-2xl bg-slate-100 p-1">
                    <button
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'users'
                          ? 'bg-white text-[#004b9a] shadow-sm'
                          : 'text-slate-600'
                        }`}
                      onClick={() => setActiveTab('users')}
                    >
                      Người dùng
                    </button>
                    <button
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'posts'
                          ? 'bg-white text-[#004b9a] shadow-sm'
                          : 'text-slate-600'
                        }`}
                      onClick={() => setActiveTab('posts')}
                    >
                      Bài viết
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {activeTab === 'users' ? (
              <Card className="border border-slate-200 shadow-sm">
                <CardBody className="p-0">
                  <div className="grid gap-3 border-b border-slate-200 p-5 md:grid-cols-4">
                    <Input
                      classNames={{ inputWrapper: 'shadow-none' }}
                      placeholder="Tìm username hoặc email"
                      startContent={<Search size={16} className="text-slate-400" />}
                      value={userSearch}
                      variant="bordered"
                      onValueChange={setUserSearch}
                    />
                    <select
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value as 'ALL' | UserRole)}
                    >
                      <option value="ALL">Tất cả role</option>
                      {userRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <select
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
                      value={userStatusFilter}
                      onChange={(e) => setUserStatusFilter(e.target.value as 'ALL' | UserStatus)}
                    >
                      <option value="ALL">Tất cả trạng thái</option>
                      {userStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      <span>Kết quả</span>
                      <Badge color="primary" variant="flat">
                        {filteredUsers.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <tr>
                          <th className="px-4 py-4">Người dùng</th>
                          <th className="px-4 py-4">Role</th>
                          <th className="px-4 py-4">Status</th>
                          <th className="px-4 py-4">Tạo lúc</th>
                          <th className="px-4 py-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.length ? (
                          currentUsers.map((user) => (
                            <UserRow
                              key={user.id}
                              onDeleted={handleUserDeleted}
                              onSaved={handleUserSaved}
                              user={user}
                            />
                          ))
                        ) : (
                          <tr>
                            <td className="px-4 py-10 text-center text-slate-500" colSpan={5}>
                              Không có người dùng phù hợp bộ lọc hiện tại.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-slate-200 px-5 py-4">
                    <Pagination
                      currentPage={userPage}
                      totalPages={userTotalPages}
                      onPageChange={setUserPage}
                    />
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="border border-slate-200 shadow-sm">
                <CardBody className="p-0">
                  <div className="grid gap-3 border-b border-slate-200 p-5 md:grid-cols-4">
                    <Input
                      classNames={{ inputWrapper: 'shadow-none' }}
                      placeholder="Tìm tiêu đề, tác giả, danh mục"
                      startContent={<Search size={16} className="text-slate-400" />}
                      value={postSearch}
                      variant="bordered"
                      onValueChange={setPostSearch}
                    />
                    <select
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
                      value={postStatusFilter}
                      onChange={(e) => setPostStatusFilter(e.target.value as 'ALL' | PostStatus)}
                    >
                      <option value="ALL">Tất cả trạng thái</option>
                      {postStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <select
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#004b9a]"
                      value={postFeaturedFilter}
                      onChange={(e) =>
                        setPostFeaturedFilter(e.target.value as 'ALL' | 'FEATURED' | 'NORMAL')
                      }
                    >
                      <option value="ALL">Tất cả kiểu hiển thị</option>
                      <option value="FEATURED">Featured</option>
                      <option value="NORMAL">Không featured</option>
                    </select>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      <span>Kết quả</span>
                      <Badge color="primary" variant="flat">
                        {filteredPosts.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <tr>
                          <th className="px-4 py-4">Bài viết</th>
                          <th className="px-4 py-4">Tác giả</th>
                          <th className="px-4 py-4">Danh mục</th>
                          <th className="px-4 py-4">Status</th>
                          <th className="px-4 py-4 text-center">Featured</th>
                          <th className="px-4 py-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts.length ? (
                          currentPosts.map((post) => (
                            <PostRow
                              key={post.id}
                              onDeleted={handlePostDeleted}
                              onSaved={handlePostSaved}
                              post={post}
                            />
                          ))
                        ) : (
                          <tr>
                            <td className="px-4 py-10 text-center text-slate-500" colSpan={6}>
                              Không có bài viết phù hợp bộ lọc hiện tại.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-slate-200 px-5 py-4">
                    <Pagination
                      currentPage={postPage}
                      totalPages={postTotalPages}
                      onPageChange={setPostPage}
                    />
                  </div>
                </CardBody>
              </Card>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
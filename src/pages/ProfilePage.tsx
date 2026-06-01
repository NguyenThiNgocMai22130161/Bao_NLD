import { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  Spinner,
} from '@heroui/react';
import {
  UserIcon,
  LockIcon,
  EnvelopeSimpleIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';

import { userService } from '@/services/user.service';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { ChangePasswordRequest, UpdateProfileRequest } from '@/types';

export default function ProfilePage() {
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [profileData, setProfileData] = useState<UpdateProfileRequest>({
    username: '',
    email: '',
  });

  const [passData, setPassData] = useState<ChangePasswordRequest>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await userService.getMe();

        if (res && res.data) {
          setProfileData({
            username: res.data.username,
            email: res.data.email,
          });
        }
      } catch (error) {
        console.error('Lỗi tải thông tin cá nhân', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await userService.updateProfile(profileData);
      alert('Cập nhật thông tin thành công!');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Có lỗi xảy ra khi cập nhật.');
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passData.newPassword !== passData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');

      return;
    }

    setUpdating(true);
    try {
      await authService.changePassword(passData);
      alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
      logout();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Đổi mật khẩu thất bại. Kiểm tra mật khẩu cũ.');
    } finally {
      setUpdating(false);
      setPassData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-600 pb-4">
        <UserCircleIcon className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold uppercase text-gray-800">
          Quản lý tài khoản
        </h1>
      </div>

      <Card className="shadow-md">
        <CardBody className="p-6">
          <Tabs
            aria-label="Profile Options"
            classNames={{
              tabList:
                'gap-6 w-full relative rounded-none p-0 border-b border-divider',
              cursor: 'w-full bg-[#004b9a]',
              tab: 'max-w-fit px-0 h-12',
              tabContent:
                'group-data-[selected=true]:text-[#004b9a] font-bold text-base',
            }}
            color="primary"
            variant="underlined"
          >
            <Tab
              key="info"
              title={
                <div className="flex items-center space-x-2">
                  <UserIcon />
                  <span>Thông tin cá nhân</span>
                </div>
              }
            >
              <form
                className="flex flex-col gap-6 mt-6"
                onSubmit={handleUpdateInfo}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    description="Tên hiển thị trên bài viết và bình luận."
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    startContent={<UserIcon className="text-default-400" />}
                    value={profileData.username}
                    variant="bordered"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                  />
                  <Input
                    description="Dùng để đăng nhập và khôi phục mật khẩu."
                    label="Email"
                    placeholder="Nhập địa chỉ email"
                    startContent={
                      <EnvelopeSimpleIcon className="text-default-400" />
                    }
                    type="email"
                    value={profileData.email}
                    variant="bordered"
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-[#004b9a] font-bold"
                    color="primary"
                    isLoading={updating}
                    type="submit"
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </form>
            </Tab>

            <Tab
              key="security"
              title={
                <div className="flex items-center space-x-2">
                  <LockIcon />
                  <span>Bảo mật & Mật khẩu</span>
                </div>
              }
            >
              <form
                className="flex flex-col gap-6 mt-6 max-w-md mx-auto"
                onSubmit={handleChangePass}
              >
                <Input
                  isRequired
                  label="Mật khẩu hiện tại"
                  placeholder="Nhập mật khẩu cũ"
                  type="password"
                  value={passData.oldPassword}
                  variant="bordered"
                  onChange={(e) =>
                    setPassData({ ...passData, oldPassword: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                  value={passData.newPassword}
                  variant="bordered"
                  onChange={(e) =>
                    setPassData({ ...passData, newPassword: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Xác nhận mật khẩu mới"
                  placeholder="Nhập lại mật khẩu mới"
                  type="password"
                  value={passData.confirmPassword}
                  variant="bordered"
                  onChange={(e) =>
                    setPassData({
                      ...passData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <Button
                  className="bg-[#004b9a] font-bold w-full"
                  color="primary"
                  isLoading={updating}
                  type="submit"
                >
                  Đổi mật khẩu
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

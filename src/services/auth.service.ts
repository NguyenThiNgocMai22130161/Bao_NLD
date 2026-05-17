import apiClient from "./axios.client";

import {
  ApiResponse,
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyRequest,
} from "@/types";

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data,
    );

    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(
      "/auth/register",
      data,
    );

    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(
      "/auth/verify",
      data,
    );

    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(
      "/auth/forgot-password",
      data,
    );

    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(
      "/auth/reset-password",
      data,
    );

    return response.data;
  },
};

import type { HttpStatusCode } from '@/lib/api/types/httpStatusCode';
import { API_ENDPOINT, API_STATUS } from '@/lib/api/constants/api';

/**
 * APIスラッグのキー
 */
export type ApiSlugKey = `:${string}`;

/**
 * APIスラッグ
 */
export type ApiSlugs = Record<ApiSlugKey, string>;

/**
 * APIパラメーター
 */
export type ApiParams = Record<
  string,
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | object
  | object[]
  | null
  | undefined
>;

/**
 * APIリクエストパラメーター
 */
export type ApiRequestParams = {
  slugs?: ApiSlugs;
  params?: ApiParams;
};

/**
 * APIエンドポイント
 */
export type ApiEndPoint = (typeof API_ENDPOINT)[keyof typeof API_ENDPOINT];

/**
 * APIステータス
 */
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS];

/**
 * リクエストエラーのレスポンス
 */
export interface RequestErrorResponse {
  status: typeof API_STATUS.REQUEST_ERROR;
}

/**
 * APIレスポンスの共通プロパティ
 */
export interface ApiResponseBase {
  status: ApiStatus;
  httpStatusCode: HttpStatusCode;
  _response: Response;
}

/**
 * APIレスポンス（汎用）
 */
export interface ApiResponse<T = any> extends ApiResponseBase {
  status: typeof API_STATUS.OK;
  data: T;
}

/**
 * エラーメッセージ
 */
export type ErrorMessage = {
  message: string;
};

/**
 * APIエラーレスポンス
 */
export interface ApiErrorResponse extends ApiResponseBase {
  status: typeof API_STATUS.API_ERROR;
  data: ErrorMessage | undefined;
}

/**
 * API呼び出し関数のレスポンス
 */
export type ApiFunctionResponse<T = any> =
  | ApiResponse<T>
  | ApiErrorResponse
  | RequestErrorResponse;

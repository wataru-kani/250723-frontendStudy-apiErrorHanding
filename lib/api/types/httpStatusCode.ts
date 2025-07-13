import { HTTP_STATUS_CODE } from '@/lib/api/constants/httpStatusCode';

/**
 * HTTPステータスコード
 */
export type HttpStatusCode =
  (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];

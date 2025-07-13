import { REQUEST_METHOD, CONTENT_TYPE } from '@/lib/api/constants/request';

/**
 * リクエストメソッド
 */
export type RequestMethod =
  (typeof REQUEST_METHOD)[keyof typeof REQUEST_METHOD];

/**
 * Content-Type
 */
export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

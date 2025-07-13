/**
 * リクエストメソッド
 */
export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
} as const satisfies Record<string, string>;

/**
 * ヘッダー
 */
export const HTTP_HEADER = {
  CONTENT_TYPE: 'Content-Type',
} as const satisfies Record<string, string>;

/**
 * Content-Type
 */
export const CONTENT_TYPE = {
  APPLICATION_JSON: 'application/json',
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
} as const satisfies Record<string, string>;

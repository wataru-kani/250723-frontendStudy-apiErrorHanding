import type {
  ApiEndPoint,
  ApiRequestParams,
  ApiFunctionResponse,
  RequestErrorResponse,
  ApiErrorResponse,
  ApiResponse,
} from '@/lib/api/types/api';
import {
  REQUEST_METHOD,
  HTTP_HEADER,
  CONTENT_TYPE,
} from '@/lib/api/constants/request';
import { API_STATUS } from '@/lib/api/constants/api';
import { HttpStatusCode } from '@/lib/api/types/httpStatusCode';
import { HTTP_STATUS_CODE } from '@/lib/api/constants/httpStatusCode';

/**
 * API呼び出し関数（GET）
 */
export const getApi = async <
  T extends ApiRequestParams = ApiRequestParams,
  U = any
>(
  endPoint: ApiEndPoint,
  requestParams: T
): Promise<ApiFunctionResponse<U>> => {
  let url: string = endPoint;

  // エンドポイントの :slug を置換
  if (requestParams.slugs) {
    Object.entries(requestParams.slugs).forEach(([key, value]) => {
      url = url.replace(key, value);
    });
  }

  // URLパラメーターを追加
  if (requestParams.params) {
    const searchParams = new URLSearchParams();
    const paramEntries = Object.entries(requestParams.params);
    paramEntries.forEach(([key, value]) => {
      // パラメーターが配列の場合、?foo[]=bar&foo[]=baz のようにする
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item as string));
        return;
      }
      searchParams.append(key, value as string);
    });
    url += `?${searchParams.toString()}`;
  }

  const headers = {
    [HTTP_HEADER.CONTENT_TYPE]: CONTENT_TYPE.APPLICATION_JSON,
  };
  const requestOptions = {
    method: REQUEST_METHOD.GET,
    headers,
  };

  console.log('[getApi]', url, requestOptions);

  /**
   * リクエストエラーをcatchする
   */
  const response: Response | undefined = await fetch(url, requestOptions).catch(
    (error) => {
      console.error('[getApi] fetch error', error);
      return undefined;
    }
  );

  /**
   * 1. レスポンスが無い場合：リクエストエラー
   */
  if (!response) {
    return {
      status: API_STATUS.REQUEST_ERROR,
    } as RequestErrorResponse;
  }

  const httpStatusCode = response.status as HttpStatusCode;
  const textData = await response.text().catch((error) => {
    console.error('[getApi] text parse error', error);
    return undefined;
  });

  /**
   * 2. textDataが無い場合：APIエラー
   */
  if (!textData) {
    return {
      status: API_STATUS.API_ERROR,
      httpStatusCode,
      data: undefined,
      _response: response,
    } as ApiErrorResponse;
  }

  let jsonData = undefined;
  try {
    jsonData = JSON.parse(textData);
  } catch (error) {
    console.error('[getApi] json parse error', error);

    /**
     * 3. textDataがあってJSONではない場合、Content-Typeがtext/plainであることを確認してから
     *    messageにtextDataをいれてAPIエラーとして返す。
     *    APIやサーバー構成によっては404のhtmlが返ってくるケースもあるため、
     *    text/plainのみエラーメッセージとして許可する。（ここはAPIの仕様次第）
     */
    const contentType = response.headers.get(HTTP_HEADER.CONTENT_TYPE);
    if (contentType?.startsWith(CONTENT_TYPE.TEXT_PLAIN)) {
      return {
        status: API_STATUS.API_ERROR,
        httpStatusCode,
        data: {
          message: textData,
        },
        _response: response,
      } as ApiErrorResponse;
    }
  }

  /**
   * 4. dataがあって200系以外の場合：APIエラー
   */
  if (!response.ok) {
    return {
      status: API_STATUS.API_ERROR,
      httpStatusCode,
      data: jsonData,
      _response: response,
    } as ApiErrorResponse;
  }

  // 5. OK
  return {
    status: API_STATUS.OK,
    httpStatusCode,
    data: jsonData,
    _response: response,
  } as ApiResponse<U>;
};

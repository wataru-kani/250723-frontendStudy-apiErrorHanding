import { CAT_API_SLUGS } from '@/lib/api/constants/api';

/**
 * 猫画像取得APIのリクエストパラメーター
 */
export type ApiCatImageRequestParams = {
  slugs: {
    [CAT_API_SLUGS.ID]: string;
  };
};

/**
 * 猫画像取得APIのレスポンス
 */
export type ApiCatImageResponse = {
  id: string;
  url: string;
  breeds: Array<Array<object>>;
  width: number;
  height: number;
};

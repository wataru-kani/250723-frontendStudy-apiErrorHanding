import type {
  ApiCatImageRequestParams,
  ApiCatImageResponse,
} from '@/lib/api/types/apiCatImage';
import { API_ENDPOINT, CAT_API_SLUGS } from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';

/**
 * 猫画像取得API
 * 8. 猫画像取得専用API呼び出し関数 lib/api/logics/getApiCatImage.ts を作成してみよう
 */
export const getApiCatImage = async ({ id }: { id: string }) => {
};

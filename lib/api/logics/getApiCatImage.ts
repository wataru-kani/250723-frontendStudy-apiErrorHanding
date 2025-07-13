import type {
  ApiCatImageRequestParams,
  ApiCatImageResponse,
} from '@/lib/api/types/apiCatImage';
import { API_ENDPOINT, CAT_API_SLUGS } from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';

/**
 * 猫画像取得API
 */
export const getApiCatImage = async ({ id }: { id: string }) => {
  const requestParams = {
    slugs: { [CAT_API_SLUGS.ID]: id },
  };
  const response = await getApi<ApiCatImageRequestParams, ApiCatImageResponse>(
    API_ENDPOINT.CAT_IMAGE,
    requestParams
  );
  return response;
};

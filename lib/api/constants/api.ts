import { ApiSlugKey } from '@/lib/api/types/api';

/**
 * Cat API
 * @see https://developers.thecatapi.com
 */
const CAT_API_ORIGIN = 'https://api.thecatapi.com';
const CAT_API_PATH = '/v1';
const CAT_API_URL = `${CAT_API_ORIGIN}${CAT_API_PATH}`;
export const CAT_API_SLUGS = {
  ID: ':id', // id は https://api.thecatapi.com/v1/images/search （ランダム）で確認
} as const satisfies Record<string, ApiSlugKey>;

/**
 * Pokémon API
 * @see https://pokeapi.co/docs/v2
 */
const POKEMON_API_ORIGIN = 'https://pokeapi.co';
const POKEMON_API_PATH = '/api/v2';
const POKEMON_API_URL = `${POKEMON_API_ORIGIN}${POKEMON_API_PATH}`;
export const POKEMON_API_SLUGS = {
  ID_OR_NAME: ':id_or_name', // ずかんNo. or 英名
} as const satisfies Record<string, ApiSlugKey>;

/**
 * APIエンドポイント
 */
export const API_ENDPOINT = {
  CAT_IMAGE: `${CAT_API_URL}/images/${CAT_API_SLUGS.ID}`,
  POKEMON_POKEMON: `${POKEMON_API_URL}/pokemon/${POKEMON_API_SLUGS.ID_OR_NAME}`,
} as const satisfies Record<string, string>;

/**
 * APIステータス
 */
export const API_STATUS = {
  OK: 'OK', // 正常系：200
  API_ERROR: 'ApiError', // 異常系：200以外 API側のエラー
  REQUEST_ERROR: 'RequestError', // 異常系：リクエストエラー（レスポンスがない場合）
} as const satisfies Record<string, string>;

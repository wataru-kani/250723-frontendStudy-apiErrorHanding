import type {
  ApiPokemonPokemonRequestParams,
  ApiPokemonPokemonResponse,
} from '@/lib/api/types/apiPokemonPokemon';
import { API_ENDPOINT, POKEMON_API_SLUGS } from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';

/**
 * ポケモン取得API
 * 10. ポケモン取得専用API呼び出し関数 lib/api/logics/getApiPokemonPokemon.ts を作成してみよう
 */
export const getApiPokemonPokemon = async ({ idOrName }: { idOrName: string }) => {
};

import { POKEMON_API_SLUGS } from '@/lib/api/constants/api';

/**
 * ポケモン取得APIのリクエストパラメーター
 */
export type ApiPokemonPokemonRequestParams = {
  slugs: {
    [POKEMON_API_SLUGS.ID_OR_NAME]: string;
  };
};

/**
 * ポケモン取得APIのレスポンス
 */
export type ApiPokemonPokemonResponse = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  // 長いので省略
};

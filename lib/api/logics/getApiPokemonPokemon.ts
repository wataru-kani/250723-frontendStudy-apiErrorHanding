import type {
  ApiPokemonPokemonRequestParams,
  ApiPokemonPokemonResponse,
} from '@/lib/api/types/apiPokemonPokemon';
import { API_ENDPOINT, POKEMON_API_SLUGS } from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';

/**
 * 猫画像取得API
 */
export const getApiPokemonPokemon = async ({
  idOrName,
}: {
  idOrName: string;
}) => {
  const requestParams = {
    slugs: { [POKEMON_API_SLUGS.ID_OR_NAME]: idOrName },
  };
  const response = await getApi<
    ApiPokemonPokemonRequestParams,
    ApiPokemonPokemonResponse
  >(API_ENDPOINT.POKEMON_POKEMON, requestParams);

  return response;
};

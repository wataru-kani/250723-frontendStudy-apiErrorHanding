import Image from 'next/image';
import {
  API_ENDPOINT,
  API_STATUS,
  CAT_API_SLUGS,
  POKEMON_API_SLUGS,
} from '@/lib/api/constants/api';
import { getApi } from '@/lib/api/logics/getApi';
import { getApiCatImage } from '@/lib/api/logics/getApiCatImage';
import { getApiPokemonPokemon } from '@/lib/api/logics/getApiPokemonPokemon';

export default async function Page() {
  /**
   * 1. getApi() を使ってAPIを呼び出してみよう
   * 5. エンドポイントのidやドメインを変更して意図的にエラーを発生させてみよう
   * 8. 猫画像取得専用API呼び出し関数 lib/api/logics/getApiCatImage.ts を作成してみよう
   */
  // const catResponse = await getApi<
  //   { slugs: { [CAT_API_SLUGS.ID]: string } },
  //   { url: string }
  // >(API_ENDPOINT.CAT_IMAGE, {
  //   slugs: { [CAT_API_SLUGS.ID]: '0XYvRd7oD' },
  // });
  const catResponse = await getApiCatImage({ id: '0XYvRd7oD' });
  console.log('🐱', catResponse);

  /**
   * 2. status から成功したかどうかを判別し変数に格納してみよう
   */
  const isCatOk = catResponse.status === API_STATUS.OK;

  /**
   * 6. APIエラーのときだけエラーメッセージを変数に格納
   */
  const isCatApiError = catResponse.status === API_STATUS.API_ERROR;
  const catErrorMessage =
    isCatApiError && catResponse.data?.message ? catResponse.data.message : '';

  /**
   * 9. Pokémon API を使ってポケモンの画像をエラーハンドリングしつつ表示するセクションを追加してみよう
   */
  // const pokemonResponse = await getApi<{}, object>(
  //   API_ENDPOINT.POKEMON_POKEMON,
  //   {
  //     slugs: {
  //       [POKEMON_API_SLUGS.ID_OR_NAME]: '1',
  //     },
  //   }
  // );
  const pokemonResponse = await getApiPokemonPokemon({ idOrName: '1' });
  console.log('⚡️', pokemonResponse);

  const isPokemonOk = pokemonResponse.status === API_STATUS.OK;
  const isPokemonApiError = pokemonResponse.status === API_STATUS.API_ERROR;
  const pokemonErrorMessage =
    isPokemonApiError && pokemonResponse?.data?.message
      ? pokemonResponse.data.message
      : '';
  const pokemonName = isPokemonOk ? pokemonResponse.data.name : '-';

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-bold">API Error Handling</h1>
      <section className="p-6">
        <h2 className="text-2xl font-bold">Cat</h2>
        {/* 3. 成功しているときだけ猫の画像を表示してみよう */}
        {isCatOk && <img src={catResponse.data.url} alt="" />}
        {/* 4. 失敗しているときだけ代替画像を表示してみよう */}
        {!isCatOk && (
          <Image
            src="/assets/noimage.png"
            alt="no image"
            width="256"
            height="256"
          />
        )}
        {/* 7. エラーメッセージを表示 */}
        {isCatApiError && catErrorMessage && <p>Error: {catErrorMessage}</p>}
      </section>

      {/* 9. Pokémon API を使ってポケモンの画像をエラーハンドリングしつつ表示するセクションを追加してみよう */}
      <section className="p-6">
        <h2 className="text-2xl font-bold">Pokemon</h2>
        <h3 className="text-xl font-bold">{pokemonName}</h3>
        {isPokemonOk && pokemonResponse.data.sprites.front_default ? (
          <img
            src={pokemonResponse.data.sprites.front_default}
            alt=""
            width="256"
            height="256"
          />
        ) : (
          <Image
            src="/assets/noimage.png"
            alt="no image"
            width="256"
            height="256"
          />
        )}
        {isPokemonOk && pokemonResponse.data.sprites.back_default ? (
          <img
            src={pokemonResponse.data.sprites.back_default}
            alt=""
            width="256"
            height="256"
          />
        ) : (
          <Image
            src="/assets/noimage.png"
            alt="no image"
            width="256"
            height="256"
          />
        )}
        {isPokemonApiError && pokemonErrorMessage && (
          <p>Error: {pokemonErrorMessage}</p>
        )}
      </section>
    </main>
  );
}

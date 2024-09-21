import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';
import type { PropertyType } from '@/types/PropertyType';
import { isString } from '@/utils/isString';

const localStorageTokenKey = 'LivelyToken';

export function useLivelyStore() {
  const snackbar = useSnackbar();

  const token = useState<string | null>('tokenRequest', () => localStorage.getItem(localStorageTokenKey));

  function onResponseError({ error }: { error: string | Record<string, string> }) {
    const text = isString(error) ? error : error.message;

    snackbar.add({
      type: 'error',
      text,
    });
  }

  async function initHelloClient() {
    if (isString(token)) return;

    await useFetch(generateLivelyEndpoint('hello/client'), {
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          token.value = response._data.token;
          localStorage.setItem(localStorageTokenKey, response._data.token);
        }
      },
    });
  }

  async function getLocationList(type: PropertyType) {
    await useFetch(generateLivelyEndpoint('location/list'), {
      body: { token, type },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        }
      },
    });
  }

  return { token, initHelloClient, getLocationList };
}

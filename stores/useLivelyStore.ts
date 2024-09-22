import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import { isString } from '@/utils/isString';

const localStorageTokenKey = 'LivelyToken';

export function useLivelyStore() {
  const snackbar = useSnackbar();

  const isLoading = useState<boolean>('isLoading', () => false);

  const propertyLocationList = useState<PropertyLocation[]>('locationList', () => []);

  function onResponseError({ error }: { error: string | Record<string, string> }) {
    const text = isString(error) ? error : error.message;

    snackbar.add({
      type: 'error',
      text,
    });
  }

  async function initHelloClient() {
    const token = localStorage.getItem(localStorageTokenKey);

    if (isString(token)) return;

    await useFetch(generateLivelyEndpoint('hello/client'), {
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          localStorage.setItem(localStorageTokenKey, response._data.token);
        }
      },
    });
  }

  async function getLocationList(type: PropertyType) {
    if (isLoading.value) return;

    isLoading.value = true;

    await initHelloClient();

    const token = localStorage.getItem(localStorageTokenKey);

    await useFetch(generateLivelyEndpoint('location/list'), {
      body: { token, type },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          propertyLocationList.value = response._data.locations;
        }
      },
    });

    isLoading.value = false;
  }

  return { propertyLocationList, initHelloClient, getLocationList };
}

import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import type { Property } from '@/types/Property';
import type { Agency } from '@/types/Agency';
import { isString } from '@/utils/isString';

const localStorageTokenKey = 'LivelyToken';

export function useLivelyStore() {
  const snackbar = useSnackbar();

  const isLoading = useState<boolean>('isLoading', () => false);

  const propertyLocationList = useState<PropertyLocation[]>('locationList', () => []);

  const propertyList = useState<Property[]>('propertyList', () => []);

  const agencyList = useState<Agency[]>('agencyList', () => []);

  const agencyBySlug = useState<Agency | null>('agencyBySlug', () => null);

  const propertyBySlug = useState<Property | null>('propertyBySlug', () => null);

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

  async function getPropertyList(type: PropertyType) {
    if (isLoading.value) return;

    isLoading.value = true;

    await initHelloClient();

    const token = localStorage.getItem(localStorageTokenKey);

    await useFetch(generateLivelyEndpoint('property/list'), {
      body: { token, type },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          propertyList.value = response._data.properties;
        }
      },
    });

    isLoading.value = false;
  }

  async function getAgencyList(locationId?: number) {
    if (isLoading.value) return;

    isLoading.value = true;

    await initHelloClient();

    const token = localStorage.getItem(localStorageTokenKey);

    await useFetch(generateLivelyEndpoint('agency/list'), {
      body: { token, location: locationId },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          agencyList.value = response._data.agencies;
        }
      },
    });

    isLoading.value = false;
  }

  async function getPropertyBySlug(slug: Property['slug'] | null) {
    if (!slug) return;

    if (isLoading.value) return;

    isLoading.value = true;

    await initHelloClient();

    const token = localStorage.getItem(localStorageTokenKey);

    await useFetch(generateLivelyEndpoint('property/'), {
      body: { token, slug },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          propertyBySlug.value = response._data.property;
        }
      },
    });

    isLoading.value = false;
  }

  async function getAgencyBySlug(slug: Agency['slug'] | null) {
    if (!slug) return;

    if (isLoading.value) return;

    isLoading.value = true;

    await initHelloClient();

    const token = localStorage.getItem(localStorageTokenKey);

    await useFetch(generateLivelyEndpoint('agency/'), {
      body: { token, slug },
      method: 'post',
      onResponseError,
      onResponse({ response }) {
        if (response.status === 400) {
          onResponseError({ error: response.statusText });
        } else {
          agencyBySlug.value = response._data.agency;
        }
      },
    });

    isLoading.value = false;
  }

  return {
    propertyLocationList,
    propertyBySlug,
    agencyBySlug,
    propertyList,
    agencyList,
    isLoading,
    getPropertyBySlug,
    getAgencyBySlug,
    initHelloClient,
    getLocationList,
    getPropertyList,
    getAgencyList,
  };
}

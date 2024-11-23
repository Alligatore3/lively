import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';
import type { GetPropertyListParameters } from '@/types/GetPropertyListParameters';
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import type { Property } from '@/types/Property';
import type { Agency } from '@/types/Agency';
import { isString } from '@/utils/isString';

const localStorageTokenKey = 'LivelyToken';

export function useLivelyStore() {
  const isLoading = useState<boolean>('isLoading', () => false);

  const propertyLocationList = useState<PropertyLocation[]>('locationList', () => []);

  const propertyList = useState<Property[]>('propertyList', () => []);

  const agencyList = useState<Agency[]>('agencyList', () => []);

  const agencyBySlug = useState<Agency | null>('agencyBySlug', () => null);

  const propertyBySlug = useState<Property | null>('propertyBySlug', () => null);

  function onGenericError({ error }: { error: string | Record<string, string> }) {
    const text = isString(error) ? error : error.message;
    console.error({text});
  }

  async function initHelloClient() {
    try {
      const token = localStorage.getItem(localStorageTokenKey);

      if (isString(token)) return;
  
      const { data } =  await useFetch<{ token: string }>(generateLivelyEndpoint('hello/client'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
        onResponse({ response }) {
          if (response.status === 400) {
            onGenericError({ error: response.statusText });
          }
        },
      });
  
      localStorage.setItem(localStorageTokenKey, data.value?.token ?? '');
    } catch {
    } finally {
      isLoading.value = false;
    }
  }

  async function getLocationList(type: PropertyType) {
    try {
      isLoading.value = true;

      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { data } = await useFetch<{ locations: PropertyLocation[]}>(generateLivelyEndpoint('location/list'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, type },
        method: 'post',
      });

      propertyLocationList.value = data.value?.locations || [];
    } catch {
    } finally {
      isLoading.value = false;
    }
  }

  async function getPropertyList(queryParameters: GetPropertyListParameters) {
    try {
      isLoading.value = true;

      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { data } = await useFetch<{ properties: Property[]}>(generateLivelyEndpoint('property/list'), {
        body: { token, ...queryParameters },
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });

      propertyList.value = data.value?.properties || [];
    } catch {
    } finally {
      isLoading.value = false;
    }
  }

  async function getAgencyList(locationId?: number) {
    try {
      isLoading.value = true;

      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { data } = await useFetch<{ agencies: Agency[]}>(generateLivelyEndpoint('agency/list'), {
        body: { token, location: locationId },
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });

      agencyList.value = data.value?.agencies || [];
    } catch {
    } finally {
      isLoading.value = false;
    }
  }
  
  async function getPropertyBySlug(slug: Property['slug'] | null) {
    try {
      if (!slug) return;

      isLoading.value = true;
  
      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { data } = await useFetch<{ property: Property}>(generateLivelyEndpoint('property/'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, slug },
        method: 'post',
      });
  
      propertyBySlug.value = data.value?.property || null;
    } catch {
    } finally {
      isLoading.value = false;
    }
  }
  
  async function getAgencyBySlug(slug: Agency['slug'] | null) {
    try {
      if (!slug) return;
  
      isLoading.value = true;
  
      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { data } = await useFetch<{ agency: Agency}>(generateLivelyEndpoint('agency/'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, slug },
        method: 'post',
      });
  
      agencyBySlug.value = data.value?.agency || null;
    } catch {
    } finally {
      isLoading.value = false;
    }
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

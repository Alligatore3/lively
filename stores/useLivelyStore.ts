import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';
import type { GetPropertyListParameters } from '@/types/GetPropertyListParameters';
import type { PropertyRequestForm } from '@/types/PropertyRequestForm';
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import type { Property } from '@/types/Property';
import type { Agency } from '@/types/Agency';
import { isString } from '@/utils/isString';

const localStorageTokenKey = 'LivelyToken';

export function useLivelyStore() {
  const { t } = useI18n();

  const toast = useToast()

  const isLoading = useState<boolean>('isLoading', () => false);

  const propertyLocationList = useState<PropertyLocation[]>('locationList', () => []);

  const propertyList = useState<Property[]>('propertyList', () => []);

  const agencyList = useState<Agency[]>('agencyList', () => []);

  const agencyBySlug = useState<Agency | null>('agencyBySlug', () => null);

  const propertyBySlug = useState<Property | null>('propertyBySlug', () => null);

  function onGenericError({ error }: { error: string | Record<string, string> }) {
    const title = isString(error) ? error : error.message;

    toast.add({
      icon: "i-heroicons-exclamation-circle",
      color: 'red',
      title,
    })
  }

  async function initHelloClient() {
    try {
      const token = localStorage.getItem(localStorageTokenKey);

      if (isString(token)) return;
  
      const { status,  data } =  await useFetch<{ token: string }>(generateLivelyEndpoint('hello/client'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });
  
      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        localStorage.setItem(localStorageTokenKey, data.value?.token ?? '');
      }
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
  
      const { status, data } = await useFetch<{ locations: PropertyLocation[]}>(generateLivelyEndpoint('location/list'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, type },
        method: 'post',
      });

      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        propertyLocationList.value = data.value?.locations || [];
      }
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
      const params = { ...queryParameters, 
        furnished: queryParameters.furnished ? Number(queryParameters.furnished) : undefined,
        kitchen: queryParameters.kitchen ? Number(queryParameters.kitchen) : undefined,
        tatami: queryParameters.tatami ? Number(queryParameters.tatami) : undefined,
      }

      const { status, data } = await useFetch<{ properties: Property[]}>(generateLivelyEndpoint('property/list'), {
        body: { token, ...params },
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });

      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        propertyList.value = data.value?.properties || [];
      }
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
  
      const { status, data } = await useFetch<{ agencies: Agency[]}>(generateLivelyEndpoint('agency/list'), {
        body: { token, location: locationId },
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });

      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        agencyList.value = data.value?.agencies || [];
      }
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
  
      const { status, data } = await useFetch<{ property: Property}>(generateLivelyEndpoint('property/'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, slug },
        method: 'post',
      });
  
      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        propertyBySlug.value = data.value?.property || null;
      }
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
  
      const { status, data } = await useFetch<{ agency: Agency}>(generateLivelyEndpoint('agency/'), {
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        body: { token, slug },
        method: 'post',
      });
  
      if(status.value === 'error') {
        onGenericError({ error: t('shared.genericError') });
      } else {
        agencyBySlug.value = data.value?.agency || null;
      }
    } catch {
    } finally {
      isLoading.value = false;
    }
  }

  async function generatePropertyRequest({
    slug,
    message,
    email,
    name,
  }: PropertyRequestForm) {
    try {
      isLoading.value = true;
  
      await initHelloClient();
  
      const token = localStorage.getItem(localStorageTokenKey);
  
      const { status } = await useFetch(generateLivelyEndpoint('property/request'), {
        body: { token, slug, message, email, name },
        onResponseError: onGenericError,
        onRequestError: onGenericError,
        method: 'post',
      });
  
      if(status.value === 'success') {
        toast.add({
          title: t('form.requestSucceeded'),
          icon: "i-heroicons-check-circle",
          color: 'green',
        })
      } else {
        onGenericError({ error: t('shared.genericError') });
      }
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
    generatePropertyRequest,
    getPropertyBySlug,
    getAgencyBySlug,
    initHelloClient,
    getLocationList,
    getPropertyList,
    getAgencyList,
  };
}

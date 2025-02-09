<script setup lang="ts">
import type { GetPropertyListParameters } from '@/types/GetPropertyListParameters';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import { useLivelyStore } from '@/stores/useLivelyStore';
import type { Agency } from '@/types/Agency';
import { ROUTES } from '@/constants';

const propertyLocation = ref<number | undefined>(undefined);

const route = useRoute();

const router = useRouter();

const isLoading = ref<boolean>(false);

const agencyName = ref<Agency['name'] | undefined>(undefined);

const { propertyLocationList: locations, getLocationList, getAgencyList, agencyList } = useLivelyStore();

async function onFilterChange(params?: { search?: string; location: GetPropertyListParameters['location'] }) {
  const query = { ...route.query, ...params };

  await navigateTo({
    path: ROUTES.AGENCIES,
    query,
  });
}

const onFiltersReset = async () => {
  try {
    if (isLoading.value) return;

    isLoading.value = true;

    // Stop user to reset more than one time.
    if (Object.keys(route.query).length === 0) return;

    await onFilterChange();

    // Remove all other filters if they exists
    router.push({ query: {} });

    propertyLocation.value = undefined;
    agencyName.value = undefined;

    await getAgencyList({});
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

function onPropertyLocationChange() {
  const location = propertyLocation.value ? Number(propertyLocation.value) : undefined;
  const search = agencyName.value;

  onFilterChange({ location, search });
}

const onAgenciesPageMount = async () => {
  try {
    if (isLoading.value) return;

    isLoading.value = true;

    if (!locations.value.length) {
      // @todo: we have to unlink this from the properties page
      await getLocationList('rent');
    }

    const locationId = propertyLocation.value ? Number(propertyLocation.value) : undefined;
    const search = agencyName.value;

    onFilterChange({ location: locationId, search });

    await getAgencyList({ search, locationId });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(propertyLocation, onPropertyLocationChange);

onMounted(onAgenciesPageMount);
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar>
      <div class="flex flex-col gap-8 px-2">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between align-center">
            <h3 class="text-lg font-bold">
              {{ $t('filters.agencies') }}
            </h3>

            <USkeleton v-if="isLoading" class="h-2 w-16 bg-gray-200 my-auto" />
            <CaptionText v-else>
              {{ $t('filters.results', { count: agencyList.length }) }}
            </CaptionText>
          </div>

          <USelectMenu
            v-model="propertyLocation"
            :options="locations"
            value-attribute="id"
            option-attribute="name"
            :disabled="isLoading || locations.length === 0"
            :placeholder="$t('home.form.location.placeholder')"
          />

          <UInput v-model="agencyName" variant="outline" :placeholder="$t('home.form.search.placeholder')" />
        </div>

        <div class="flex flex-col lg:flex-row gap-2">
          <button
            class="w-full lg:w-1/2 border py-2 font-semibold rounded"
            :disabled="isLoading"
            @click="onFiltersReset"
          >
            {{ $t('shared.reset') }}
          </button>

          <button
            class="w-full lg:w-1/2 bg-black text-white font-semibold py-2 rounded flex align-center justify-center"
            :disabled="isLoading"
            @click="onAgenciesPageMount"
          >
            <SpinnerLoader v-if="isLoading" classes="w-[24px] after:w-[24px] h-[24px] after:h-[24px] after:border" />
            <span v-else>
              {{ $t('shared.submit') }}
            </span>
          </button>
        </div>
      </div>
    </template>

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else :list-lenght="agencyList.length">
        <template #loop-list>
          <template v-if="agencyList.length > 0">
            <li v-for="agency in agencyList" :key="agency.id">
              <NuxtLink :to="{ name: 'agencies-slug', params: { slug: agency.slug } }">
                <AgencyCard :agency="agency" />
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <NoResultsItemList />
          </template>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>

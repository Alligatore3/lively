<script setup lang="ts">
import { generatePropertyQueryType } from '@/utils/generatePropertyQueryType';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import PropertyTypeToggle from '@/components/PropertyTypeToggle';
import type { GetPropertyListParameters } from '@/types/GetPropertyListParameters';
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import EntityRanges from '@/components/EntityRanges';
import { DEFAULT_PROPERTY_TYPE, ROUTES } from '@/constants';

const route = useRoute();

const router = useRouter();

const isLoading = ref<boolean>(false);

const propertyLocation = ref<number | undefined>(undefined);

const hasTatami = ref<boolean>(false);

const hasKitchen = ref<boolean>(false);

const hasFurnished = ref<boolean>(false);

const queryPropertyType = computed(() => generatePropertyQueryType(route));

const { propertyLocationList: locations, getPropertyList, getLocationList, propertyList } = useLivelyStore();

async function onFilterChange(params: GetPropertyListParameters) {
  const query = { ...route.query, ...params };

  await navigateTo({
    path: ROUTES.PROPERTIES,
    query,
  });
}

const fetchPropertyListByType = async () => {
  try {
    isLoading.value = true;
    await onFilterChange({ type: queryPropertyType.value });

    const params = route.query as unknown as GetPropertyListParameters;
    await getPropertyList(params);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const onFiltersReset = async () => {
  try {
    if (isLoading.value) return;

    isLoading.value = true;

    const queryValues = Object.values(route.query);
    if (queryValues.length === 1 && queryValues[0] === DEFAULT_PROPERTY_TYPE) return;
    debugger;
    const type = queryPropertyType.value;
    await onFilterChange({ type });

    // Remove all other filters if they exists
    router.push({ query: { type } });

    propertyLocation.value = undefined;

    hasFurnished.value = false;
    hasKitchen.value = false;
    hasTatami.value = false;

    getPropertyList({ type });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

function onPropertyLocationChange() {
  isLoading.value = false;

  const location = Number(propertyLocation.value);
  if (!location) return;

  const type = queryPropertyType.value;

  onFilterChange({ location, type });
}

async function onPropertiesPageMount() {
  try {
    isLoading.value = true;

    propertyLocation.value = Number(route.query.location) || undefined;

    if (!locations.value.length) {
      await getLocationList(queryPropertyType.value);
    }

    await fetchPropertyListByType();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

const onTatamiChange = (value: boolean) => {
  const tatami = value ? 1 : 0;
  const type = queryPropertyType.value;

  onFilterChange({ tatami, type });
};

const onKitchenChange = (value: boolean) => {
  const kitchen = value ? 1 : 0;
  const type = queryPropertyType.value;

  onFilterChange({ kitchen, type });
};

const onFurnishedChange = (value: boolean) => {
  const furnished = value ? 1 : 0;
  const type = queryPropertyType.value;

  onFilterChange({ furnished, type });
};

watch(propertyLocation, onPropertyLocationChange);

onMounted(onPropertiesPageMount);
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar>
      <div class="flex flex-col gap-8 px-2">
        <PropertyTypeToggle
          :on-toggle-change="
            (type: PropertyType) => {
              onFilterChange({ type });
            }
          "
        />

        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between align-center">
            <h3 class="text-lg font-bold">
              {{ $t('filters.locations') }}
            </h3>

            <USkeleton v-if="isLoading" class="h-2 w-16 bg-gray-200 my-auto" />
            <CaptionText v-else>
              {{ $t('filters.results', { count: propertyList.length }) }}
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
        </div>

        <EntityRanges
          :on-range-change="
            (values: number[]) => {
              const [price_low, price_high] = values;
              onFilterChange({ type: queryPropertyType, price_low, price_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.price') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges
          :on-range-change="
            (values: number[]) => {
              const [area_low, area_high] = values;
              onFilterChange({ type: queryPropertyType, area_low, area_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.squareMeters') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges
          :on-range-change="
            (values: number[]) => {
              const [rooms_low, rooms_high] = values;
              onFilterChange({ type: queryPropertyType, rooms_low, rooms_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.rooms') }}
            </h3>
          </template>
        </EntityRanges>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-bold">
            {{ $t('filters.optionals') }}
          </h3>

          <UCheckbox
            v-model="hasTatami"
            :label="$t('filters.tatami')"
            :ui="{
              background: 'bg-white dark:bg-white focus:bg-black focus:dark:bg-black dark:checked:bg-black',
              label: 'text-black dark:text-black',
            }"
            @change="onTatamiChange"
          />

          <UCheckbox
            v-model="hasFurnished"
            :label="$t('filters.furnished')"
            :ui="{
              background: 'bg-white dark:bg-white focus:bg-black focus:dark:bg-black dark:checked:bg-black',
              label: 'text-black dark:text-black',
            }"
            @change="onFurnishedChange"
          />

          <UCheckbox
            v-model="hasKitchen"
            :label="$t('filters.kitchen')"
            :ui="{
              background: 'bg-white dark:bg-white focus:bg-black focus:dark:bg-black dark:checked:bg-black',
              label: 'text-black dark:text-black',
            }"
            @change="onKitchenChange"
          />
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
            @click="fetchPropertyListByType"
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

      <ContentGridListSwitcher v-else :list-lenght="propertyList.length">
        <template #loop-list>
          <template v-if="propertyList.length > 0">
            <li v-for="property in propertyList" :key="property.id">
              <NuxtLink :to="{ name: 'properties-slug', params: { slug: property.slug } }">
                <PropertyCard :property="property" />
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

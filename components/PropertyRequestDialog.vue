<script setup lang="ts">
import { object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

import { useLivelyStore } from '@/stores/useLivelyStore';
import type { Property } from '@/types/Property';

const { t } = useI18n();

const modal = useModal();

const route = useRoute();

const { generatePropertyRequest, isLoading } = useLivelyStore();

const propertyURLSlug = computed<Property['slug'] | null>(() => {
  const slug = route.params.slug;
  return isString(slug) ? slug : null;
});

const schema = object({
  email: string().email(t('validation.email')).required(t('validation.required')),
  message: string().required(t('validation.required')),
  name: string().required(t('validation.required')),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  message: undefined,
  email: undefined,
  name: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { message, email, name } = event.data;
  const slug = propertyURLSlug.value;

  if (!slug) return;

  await generatePropertyRequest({ slug, message, email, name });

  modal.close();
}
</script>

<template>
  <UModal :ui="{ width: 'w-96' }">
    <UForm :schema="schema" :state="state" class="p-4 space-y-6" @submit="onSubmit">
      <div class="flex justify-between items-center">
        <h3>
          {{ t('form.label') }}
        </h3>

        <UButton @click="modal.close" class="py-2 bg-black text-white dark:bg-white dark:text-black">
          {{ t('shared.close') }}
        </UButton>
      </div>

      <UFormGroup :label="t('form.labelEmail')" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup :label="t('form.labelName')" name="name">
        <UInput v-model="state.name" type="text" />
      </UFormGroup>

      <UFormGroup :label="t('form.labelMessage')" name="message">
        <UTextarea v-model="state.message" />
      </UFormGroup>

      <UButton
        class="w-full py-4 justify-center flex bg-black text-white dark:bg-white dark:text-black"
        :loading="isLoading"
        type="submit"
      >
        {{ t('shared.submit') }}
      </UButton>
    </UForm>
  </UModal>
</template>

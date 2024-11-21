<script setup lang="ts">
import { object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();

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
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <UModal>
    <UForm :schema="schema" :state="state" class="p-4 space-y-4" @submit="onSubmit">
      <UFormGroup :label="t('form.labelEmail')" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup :label="t('form.labelName')" name="name">
        <UInput v-model="state.name" type="text" />
      </UFormGroup>

      <UFormGroup :label="t('form.labelMessage')" name="message">
        <UTextarea v-model="state.message" />
      </UFormGroup>

      <UButton class="w-full justify-center flex bg-black text-white dark:bg-white dark:text-black" type="submit">
        {{ t('shared.submit') }}
      </UButton>
    </UForm>
  </UModal>
</template>

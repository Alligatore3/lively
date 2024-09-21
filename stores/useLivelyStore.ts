import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';

export function useLivelyStore() {
  const snackbar = useSnackbar();

  const token = useState<string | null>('tokenRequest', () => null);

  async function initHelloClient() {
    const { data, error } = await useFetch<{ token: string }>(generateLivelyEndpoint('hello/client'));

    if (error.value) {
      const text = error.value as unknown as string;

      snackbar.add({
        type: 'error',
        text,
      });
    } else {
      token.value = data.value?.token || null;
    }
  }

  return { token, initHelloClient };
}

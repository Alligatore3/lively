import { generateLivelyEndpoint } from '@/utils/generateLivelyEndpoint';

export function useLivelyStore() {
  const snackbar = useSnackbar();

  const token = useState<string | null>('tokenRequest', () => null);

  const convertStringToJSON = (toParse: unknown) => (isString(toParse) ? JSON.parse(toParse) : { token: null });

  async function initHelloClient() {
    const { data, error } = await useFetch(generateLivelyEndpoint('hello/client'));

    if (error.value) {
      const text = error.value as unknown as string;

      snackbar.add({
        type: 'error',
        text,
      });
    } else {
      const { token: parsedToken } = convertStringToJSON(data.value);
      token.value = parsedToken;
    }
  }

  return { token, initHelloClient };
}

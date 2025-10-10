export const useFakeAPI = () => {
  let isLoaded = false;

  setTimeout(() => {
    isLoaded = true;
  }, 1000);

  return { isLoadedAPI: isLoaded };
};

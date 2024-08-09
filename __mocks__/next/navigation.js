export const useRouter = () => ({
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
});

export const useSearchParams = () => ({
  get: jest.fn((key) => {
    // Provide default or custom values for testing
    const params = {
      idList: "12345", // Mock value for 'idList'
    };
    return params[key];
  }),
  has: jest.fn((key) => {
    const params = ["idList"];
    return params.includes(key);
  }),
  set: jest.fn(),
  delete: jest.fn(),
});

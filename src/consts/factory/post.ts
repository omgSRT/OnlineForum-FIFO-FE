export const postKeys = {
  all: ['posts'] as const,
  listing: (params: object = {}) => [...postKeys.all, 'listing', params] as const,
  get: (id: string) => [...postKeys.all, 'get', id] as const
}
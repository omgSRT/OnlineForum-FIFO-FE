export const categoryKeys = {
    all: ['categories'] as const,
    listing: (params: object = {}) => [...categoryKeys.all, 'listing', params] as const,
};

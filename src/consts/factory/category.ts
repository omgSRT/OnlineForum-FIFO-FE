export const categoryKeys = {
    all: ['categories'] as const,
    listing: (params: object = {}) => [...categoryKeys.all, 'listing', params] as const,
    listingStaffs: (params: object = {}) => [...categoryKeys.all, 'listingStaffs', params] as const,
};

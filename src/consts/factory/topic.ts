
export const topicKeys = {
    all: ['topics'] as const,
    listing: (params: object = {}) => [...topicKeys.all, 'listing', params] as const,
};

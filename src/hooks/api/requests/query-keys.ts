export const requestKeys = {
  all: ["requests"] as const,

  lists: () => [...requestKeys.all, "list"] as const,

  list: (payload: any) =>
    [...requestKeys.lists(), payload] as const,
  byId: (id: string) => [...requestKeys.all, 'by-id', id] as const,
};


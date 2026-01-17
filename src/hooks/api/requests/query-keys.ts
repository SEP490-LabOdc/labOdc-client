export const requestKeys = {
  all: ["requests"] as const,

  lists: () => [...requestKeys.all, "list"] as const,

  list: (payload: any) =>
    [...requestKeys.lists(), payload] as const,
};


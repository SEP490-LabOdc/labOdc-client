export const locationKeys = {
  getProvinces: ["provinces"] as const,
  getWardsByProvinceCode: (provinceCode: string) =>  ["wards", { provinceCode }] as const,
}
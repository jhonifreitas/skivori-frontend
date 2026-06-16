module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["tv"],
  importOrder: [
    "^@/components/(.*)$",
    "^@/contexts/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/providers/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

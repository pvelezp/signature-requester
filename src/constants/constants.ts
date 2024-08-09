export const priorityMapValues = new Map([
  ["low", "BAJA"],
  ["medium", "MEDIA"],
  ["high", "ALTA"],
  ["critical", "CRÍTICA"],
]);

export type Priority = "low" | "medium" | "high" | "critical";

export const priorityMapLabels: Map<string, Priority> = new Map([
  ["BAJA", "low"],
  ["MEDIA", "medium"],
  ["ALTA", "high"],
  ["CRÍTICA", "critical"],
]);

export const doneListId = "66ace062cf73e952f8ecee2c";
export const pendingListId = "66ace0603bc606b5b05c86bc";

export const listStatusMapping = {
  [doneListId]: "Hecho",
  [pendingListId]: "Pendiente",
};

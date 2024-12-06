import { Document } from "../types/document";

type Status = Document["signers"][0]["status"];
type BadgeVariant = "outline" | "default" | "destructive";

const getVariantByStatus = (status: Status): BadgeVariant => {
  const statusVariantMap: Record<Status, BadgeVariant> = {
    pending: "outline",
    signed: "default",
    declined: "destructive",
  };

  return statusVariantMap[status] ?? null;
};

export default getVariantByStatus;

import getVariantByStatus from "./get-badge-variant";

describe("getVariantByStatus", () => {
  it("should return 'outline' for 'pending' status", () => {
    const result = getVariantByStatus("pending");
    expect(result).toBe("outline");
  });

  it("should return 'default' for 'signed' status", () => {
    const result = getVariantByStatus("signed");
    expect(result).toBe("default");
  });

  it("should return 'destructive' for 'declined' status", () => {
    const result = getVariantByStatus("declined");
    expect(result).toBe("destructive");
  });

  it("should return null for an unknown status", () => {
    const result = getVariantByStatus("unknown" as any);
    expect(result).toBeNull();
  });
});

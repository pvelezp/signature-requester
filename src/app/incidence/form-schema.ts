import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  priority: z.enum(["low", "medium", "high", "critical"]),
});

export const formDefaultValues: z.infer<typeof formSchema> = {
  name: "",
  desc: "",
  priority: "low",
};

export default formSchema;

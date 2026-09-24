export type QuickInquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialQuickInquiryState: QuickInquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

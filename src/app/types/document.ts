export type Document = {
  id: string;
  name: string;
  file: File;
  signers: {
    id: string;
    email: string;
    status: "pending" | "signed" | "declined";
  }[];
};

export type Signer = Document["signers"][0];
export type DocumentStatus = Signer["status"];

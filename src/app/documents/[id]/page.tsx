"use client";
import DocumentPreview from "@/app/components/document-preview/document-preview";
import { useDocumentContext } from "@/app/context/documents-provider";
import getVariantByStatus from "@/app/utils/get-badge-variant";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

const DocumentDetail = () => {
  const { id } = useParams();
  const { documents } = useDocumentContext();
  const currentDocument = documents.get(id as string);

  if (!currentDocument) return <Loader />;

  return (
    <div className="py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <DocumentPreview file={currentDocument.file} />
        <h1 className="text-center mt-4 font-bold text-lg">
          {currentDocument.name}
        </h1>
      </div>

      <section className="flex flex-col bg-slate-50 shadow-sm p-4 rounded-md  justify-center mt-12 max-w-2xl mx-auto">
        <h2 className="font-bold mb-6">Signers:</h2>
        <div className="flex flex-col gap-6">
          {currentDocument?.signers.map((signer) => (
            <div key={signer.id} className="flex w-full gap-5 justify-between">
              <p className="text-center">{signer.email}</p>
              <Badge
                className="shadow-lg"
                variant={getVariantByStatus(signer.status)}
              >
                {signer.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DocumentDetail;

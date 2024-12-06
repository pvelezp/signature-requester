import { useDocumentContext } from "@/app/context/documents-provider";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import DocumentPreview from "../document-preview/document-preview";

const RecentDocuments = () => {
  const { documents } = useDocumentContext();
  const router = useRouter();

  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">Recent documents</h2>

      <div className="relative mt-5 flex items-center">
        <div className="flex overflow-x-auto gap-4 items-center p-4">
          {Array.from(documents.values()).map((doc) => (
            <DocumentPreview
              small
              key={doc.id}
              handleClick={() => {
                router.push(`/documents/${doc.id}`);
              }}
              file={doc.file}
            />
          ))}
        </div>

        <div className="bg-white opacity-95 h-full flex items-center">
          <Button
            variant="ghost"
            onClick={() => {
              router.push("/documents");
            }}
            className="hover:bg-inherit"
          >
            See all
            <ChevronRight className="text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;

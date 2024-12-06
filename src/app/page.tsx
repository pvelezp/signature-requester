"use client";

import DocumentUpload from "./components/document-upload/document-upload";
import RecentDocuments from "./components/recent-documents/recent-documents";
import { useDocumentContext } from "./context/documents-provider";

const Home = () => {
  const { documents } = useDocumentContext();

  return (
    <div className="p-6">
      <DocumentUpload />
      {documents.size > 0 && <RecentDocuments />}
    </div>
  );
};

export default Home;

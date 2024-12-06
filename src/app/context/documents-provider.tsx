"use client";

import { useToast } from "@/components/ui/use-toast";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { Document } from "../types/document";
import { removePdfExtension } from "../utils/remove-pdf-extension";

type DocumentContextType = {
  documents: Map<string, Document>;
  addDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
  updateSignerStatus: (
    documentId: string,
    signerId: string,
    status: Document["signers"][number]["status"]
  ) => void;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<Map<string, Document>>(new Map());
  const { toast } = useToast();

  const addDocument = (document: Document) => {
    setDocuments((prevDocuments) => {
      const newDocuments = new Map(prevDocuments);
      newDocuments.set(document.id, document);
      return newDocuments;
    });
  };

  const deleteDocument = (id: string) => {
    setDocuments((prevDocuments) => {
      const newDocuments = new Map(prevDocuments);
      newDocuments.delete(id);
      return newDocuments;
    });
  };

  const updateSignerStatus = (
    documentId: string,
    signerId: string,
    status: Document["signers"][number]["status"]
  ) => {
    setDocuments((prevDocuments) => {
      const newDocuments = new Map(prevDocuments);
      const document = newDocuments.get(documentId);
      const signer = document?.signers.find((signer) => signer.id === signerId);

      if (document) {
        const updatedSigners = document.signers.map((signer) =>
          signer.id === signerId ? { ...signer, status } : signer
        );

        newDocuments.set(documentId, { ...document, signers: updatedSigners });

        toast({
          title: `Update in ${removePdfExtension(document.name)}`,
          description: `${signer?.email} has ${status} the document`,
        });
      }

      return newDocuments;
    });
  };

  return (
    <DocumentContext.Provider
      value={{ documents, addDocument, deleteDocument, updateSignerStatus }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider"
    );
  }
  return context;
};

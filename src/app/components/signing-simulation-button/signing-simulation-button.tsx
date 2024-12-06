import { useDocumentContext } from "@/app/context/documents-provider";
import { Document, DocumentStatus } from "@/app/types/document";
import { Button } from "@/components/ui/button";

const getRandomDocumentAndSignerId = (documents: Map<string, Document>) => {
  if (documents.size === 0) {
    return null;
  }

  const documentIds = Array.from(documents.keys());

  const randomDocumentId =
    documentIds[Math.floor(Math.random() * documentIds.length)];
  const document = documents.get(randomDocumentId);

  if (!document || document.signers.length === 0) {
    return null;
  }

  const randomSignerId =
    document.signers[Math.floor(Math.random() * document.signers.length)].id;

  const randomStatus: DocumentStatus =
    Math.random() < 0.5 ? "signed" : "declined";

  return {
    documentId: randomDocumentId,
    signerId: randomSignerId,
    randomStatus,
  };
};

const SigningSimulationButton = () => {
  const { updateSignerStatus, documents } = useDocumentContext();

  const handleClick = () => {
    const result = getRandomDocumentAndSignerId(documents);
    if (!result) {
      return;
    }

    const { documentId, signerId, randomStatus } = result;
    updateSignerStatus(documentId, signerId, randomStatus);
  };

  return (
    <Button className="absolute  bottom-5 left-5" onClick={handleClick}>
      Simulate Signing
    </Button>
  );
};

export default SigningSimulationButton;

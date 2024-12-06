import { useDocumentContext } from "@/app/context/documents-provider";
import { Signer } from "@/app/types/document";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CloudUpload, Plus, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import DocumentPreview from "../document-preview/document-preview";

type FormData = {
  email: string;
  file: File | null;
  signers: Signer[];
};

const DocumentUpload = () => {
  const { addDocument } = useDocumentContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
    setError,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      signers: [],
      file: null,
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setValue("file", uploadedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  const addEmail = (email: string) => {
    if (!email) {
      setError("email", { type: "manual", message: "Email cannot be empty" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("email", { type: "manual", message: "Invalid email address" });
      return;
    }

    const signers = getValues("signers");
    const isEmailPresent = signers.some((e: Signer) => e.email === email);
    if (isEmailPresent) {
      setError("email", { type: "manual", message: "Email already added" });
      return;
    }

    setValue("signers", [
      ...signers,
      { id: uuidv4(), email, status: "pending" },
    ]);
    setValue("email", "");
    clearErrors("email");
  };

  const handleFormSubmit = (data: FormData) => {
    if (!data.file) {
      setError("file", { type: "manual", message: "File is required" });
      return;
    }

    addDocument({
      id: uuidv4(),
      name: data.file.name,
      file: data.file,
      signers: data.signers,
    });

    setValue("signers", []);
    setValue("file", null);
    clearErrors();
  };

  const handleDeleteEmail = (id: string) => {
    const signers = getValues("signers");
    const updatedSigners = signers.filter((email: Signer) => email.id !== id);
    setValue("signers", updatedSigners);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Upload document
      </h2>

      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <>
            {!field.value ? (
              <div
                {...getRootProps()}
                className={`border-dashed hover:bg-cyan-50 border-2 py-16 px-4 hover:border-cyan-500 rounded-lg flex flex-col items-center justify-center ${
                  isDragActive
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-gray-300 bg-white"
                } cursor-pointer`}
              >
                <input {...getInputProps()} />
                <CloudUpload className="text-blue-500 w-10 h-10 mb-3" />
                <p className="text-gray-700">
                  {isDragActive
                    ? "Drop your file here..."
                    : "Drag and drop a file, or click to browse"}
                </p>
                <p className="text-gray-500 text-sm">
                  Supported formats: PDF, DOCX
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <DocumentPreview
                  file={field.value}
                  clearFile={() => setValue("file", null)}
                />
                <p className="text-gray-800 font-medium">{field.value.name}</p>
              </div>
            )}
          </>
        )}
      />

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Request Signature
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex mt-4 gap-3">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  className="flex-grow border rounded px-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            <Button
              type="button"
              data-testid="add-button"
              onClick={() => addEmail(watch("email"))}
              className="bg-green-500 text-white px-4 py-6 rounded hover:bg-green-600"
            >
              <Plus />
            </Button>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}

          {getValues("signers").length > 0 && (
            <section className="mt-4 mb-8">
              <h2 className="font-bold">Send to:</h2>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {getValues("signers").map((e: Signer) => (
                  <Badge
                    variant="outline"
                    key={e.id}
                    className="flex py-2 gap-3 hover:bg-slate-100 shadow-md"
                  >
                    <p className="text-sm">{e.email}</p>
                    <button
                      onClick={() => handleDeleteEmail(e.id)}
                      className="text-gray-500 hover:text-red-700 text-sm font-bold inline-block"
                    >
                      <X size={16} />
                    </button>
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <Button
            type="submit"
            className="mt-4 w-full bg-cyan-500 px-4 py-6 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-cyan-600"
            disabled={!getValues("file") || !getValues("signers").length}
          >
            Send Request
          </Button>
          {errors.file && (
            <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;

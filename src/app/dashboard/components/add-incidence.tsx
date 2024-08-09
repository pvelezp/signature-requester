"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddIncidence = ({ idList }: { idList: string }) => {
  const router = useRouter();

  return (
    <Button
      className="flex gap-1"
      onClick={() => {
        router.push(`/incidence/new?idList=${idList}`);
      }}
    >
      <p className="hidden sm:block">Incidence</p>
      <CirclePlus />
    </Button>
  );
};

export default AddIncidence;

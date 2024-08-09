import axios from "@/api/instance.client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { API_KEY, TOKEN } from "@/config/config";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteIncidence = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios
        .delete(`cards/${id}?key=${API_KEY}&token=${TOKEN}`)
        .then((res) => {
          if (res) {
            router.push("/dashboard");
          }
        });
    } catch (error) {
      toast({
        title: "Error en eliminación",
        description: "Inténtelo otra vez",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white bg-lightblue py-2 px-4 rounded-sm flex justify-end gap-1 items-center flex-none basis-1/3">
        <p className="hidden sm:block">Eliminar</p>
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede deshacerse. Esto hará un cambio permanente en
            nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-blue">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteIncidence;

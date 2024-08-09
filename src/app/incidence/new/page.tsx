"use client";

import axiosClientInstance from "@/api/instance.client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/ui/header/header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { API_KEY, TOKEN } from "@/config/config";
import { priorityMapLabels, priorityMapValues } from "@/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowLeft, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema, { formDefaultValues } from "../form-schema";

const IncidenceFormNew = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("idList");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const { data } = await axiosClientInstance.post(
        `cards?idList=${id}&key=${API_KEY}&token=${TOKEN}`,
        { ...values }
      );

      const res = await axiosClientInstance.post(
        `cards/${data.id}/labels?color=orange&name=${priorityMapValues.get(
          values.priority
        )}&key=${API_KEY}&token=${TOKEN}`
      );

      if (res) {
        toast({
          title: "Creación de incidencia",
          description: "La creación ha sido exitosa!",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error en creación",
        description: "Por favor vuévalo a intentar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue flex flex-col min-h-screen">
      <Header
        title="Crear Incidencia"
        action={
          <Button
            onClick={() => {
              router.back();
            }}
          >
            <CircleArrowLeft />
          </Button>
        }
      />

      <section className="flex flex-grow justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-5 rounded flex flex-col w-full max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Prioridad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from(priorityMapLabels).map(([label, value]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="py-6">
              {loading ? <Loader /> : "Crear"}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default IncidenceFormNew;

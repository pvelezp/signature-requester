"use client";

import axios from "@/api/instance.client";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Incidence } from "../dashboard/components/columns";
import DeleteIncidence from "./components/delete-incidence";
import formSchema, { formDefaultValues } from "./form-schema";

const IncidenceForm = () => {
  const [incidenceData, setIncidenceData] = useState<Incidence | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { reset } = form;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get(`cards/${id}`);
    setIncidenceData(data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (incidenceData) {
      reset({
        name: incidenceData.name,
        desc: incidenceData.desc,
        priority: priorityMapLabels.get(incidenceData.labels[0].name),
      });
    }
  }, [incidenceData, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await axios.put(`cards/${id}?key=${API_KEY}&token=${TOKEN}`, {
        ...values,
      });

      const response = await axios.put(
        `labels/${incidenceData?.idLabels[0]}/name`,
        {
          value: priorityMapValues.get(values.priority),
        },
        {
          params: {
            key: API_KEY,
            token: TOKEN,
          },
        }
      );

      if (res && response) {
        toast({
          title: "Actualización de Incidencia",
          description: "¡Actualización exitosa!",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Hubo un error",
        description: "Por favor vuelva a intentar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue">
      <Header
        title="Actualizar incidencia"
        action={
          <div className="flex gap-4">
            {id && <DeleteIncidence id={id} />}

            <Button
              onClick={() => {
                router.back();
              }}
            >
              <CircleArrowLeft />
            </Button>
          </div>
        }
      />

      <section className="flex min-h-screen justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  p-5 rounded flex flex-col w-full max-w-2xl"
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar una prioridad" />
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
              {loading ? <Loader /> : "Actualizar"}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default IncidenceForm;

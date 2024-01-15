"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type:ElementsType = "ParagraphField"


const extraAttributes = {
    text: "Paragraph field",
  };
  

export const ParagraphFieldFormElement:FormElement =  {
    type,
    designerComponent: DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,
    validate: () => true,
    construct:(id:string) =>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph field",
      },
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function FormComponent({ 
  elementInstance,
}: { 
  elementInstance: FormElementInstance,
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return <p className="text-muted-foreground">{text}</p>;
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">Paragraph field</Label>
    <p className="truncate">{text}</p>
  </div>
  );
}

const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
        text:element.extraAttributes.text
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { text } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph field</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

const type:ElementsType = "SeparatorField"

export const SeperatorFieldFormElement:FormElement =  {
    type,
    designerComponent: DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,
    validate: () => true,
    construct:(id:string) =>({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Seperator field",
      },
}


function FormComponent({ 
  elementInstance,
}: { 
  elementInstance: FormElementInstance,
}) {

    return <Separator />;
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">Seperator field</Label>
    <Separator />
  </div>
  );
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <p>No properties for this element</p>;
}
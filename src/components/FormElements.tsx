import { CheckboxFieldFormElement } from "./fields/CheckboxField";
import { DateFieldFormElement } from "./fields/DateField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { SeperatorFieldFormElement } from "./fields/SeparatorField";
import { SpaceFieldFormElement } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import {TextFieldFormElement} from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType = 
| "TextField"
| "TitleField"
| "SubTitleField"
| "ParagraphField"
| "SeparatorField"
| "SpacerField"
| "NumberField"
| "TextAreaField"
| "DateField"
| "SelectField"
| "CheckboxField"
;

export type SubmitFunction = (key:string,value:string) => void;

export type FormElement = {
  type: ElementsType;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  construct: (id: string) => FormElementInstance;

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?:SubmitFunction,
    defaultValue?:string
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate:(formElement:FormElementInstance,currentValue:string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField:TitleFieldFormElement,
  SubTitleField:SubTitleFieldFormElement,
  ParagraphField:ParagraphFieldFormElement,
  SeparatorField:SeperatorFieldFormElement,
  SpacerField:SpaceFieldFormElement,
  NumberField:NumberFieldFormElement,
  TextAreaField:TextAreaFieldFormElement,
  DateField:DateFieldFormElement,
  SelectField:SelectFieldFormElement,
  CheckboxField:CheckboxFieldFormElement
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, FormElement, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";

const DragOverlayWrapper = () => {
    const { elements } = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
          setDraggedItem(event.active);
        },
        onDragCancel: () => {
          setDraggedItem(null);
        },
        onDragEnd: () => {
          setDraggedItem(null);
        },
      });

      if (!draggedItem) return null;

      let node = <div>No drag overlay</div>;
        const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

        if(isSidebarBtnElement){
            const type = draggedItem.data?.current?.type as ElementsType
            node = <SidebarBtnElementDragOverlay formElement={FormElements[type]}/>;
        }

        const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
        if (isDesignerElement) {
          const elementId = draggedItem.data?.current?.elementId;
          const element = elements.find((el) => el.id === elementId);
          if (!element) node = <div>Element not found!</div>;
          else {
            const DesignerElementComponent = FormElements[element.type].designerComponent;
      
            node = (
              <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
                <DesignerElementComponent elementInstance={element} />
              </div>
            );
          }
        }

    return <DragOverlay>{node}</DragOverlay>;
}

function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
    const { label, icon: Icon } = formElement.designerBtnElement;
  
    return (
      <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
        <Icon className="h-8 w-8 text-primary cursor-grab" />
        <p className="text-xs">{label}</p>
      </Button>
    );
  }
 
export default DragOverlayWrapper;
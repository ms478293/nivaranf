import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function BottomSheets({
  triggerButton,
  children,
  onClose,
  onOpen,
  isOpen,
}: {
  triggerButton: string | React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
}) {
  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          onOpen?.();
        } else {
          onClose?.();
        }
      }}
      open={isOpen}
    >
      <SheetTrigger asChild className="w-fit">
        {triggerButton}
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl overflow-hidden ">
        {children}
      </SheetContent>
    </Sheet>
  );
}

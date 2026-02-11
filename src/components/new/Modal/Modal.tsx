import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Modal({
  triggerButton,
  title,
  children,
  isOpen,
  onClose,
}: {
  triggerButton?: string | React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose?.()}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="overflow-y-auto overflow-hidden my-auto">
        {/* <DialogHeader> */}
        <DialogTitle>{title}</DialogTitle>
        {/* </DialogHeader> */}
        {children}
      </DialogContent>{" "}
      {/* ✅ Make sure this is properly closed */}
    </Dialog>
  );
}

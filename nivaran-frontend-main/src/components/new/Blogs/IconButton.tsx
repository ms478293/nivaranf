import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { AppButton } from "@/components/ui/app-button";

export const IconButton = () => {
  return (
    <AppButton variant="ghost" className="px-0 relative" asChild>
      <div className="flex items-center gap-1">
        <span className="font-normal text-sm">Read full Blog</span>
        <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500" />
      </div>
    </AppButton>
  );
};

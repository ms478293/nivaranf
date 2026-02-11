'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppButton } from "@/components/ui/app-button";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import { MailIcon } from "lucide-react";

export const SubscribeButton = ({ className, label = "Subscribe" }: { className?: string, label?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AppButton variant="primary" className={className}>
          <MailIcon className="w-4 h-4 mr-2" />
          {label}
        </AppButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to our Newsletter</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Stay updated with our latest news and impact stories.
          </p>
          <NewsletterSubscribe variant="compact" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

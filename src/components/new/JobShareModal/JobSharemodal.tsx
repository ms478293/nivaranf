"use client";

import { ShareIcon } from "@/assets/icons/ShareIcon";
import { AppButton } from "@/components/ui/app-button";
import { SHARE_LINK } from "@/content/job-description";
import Link from "next/link";
import { Modal } from "../Modal/Modal";

export const JobSharemodal = () => {
  return (
    <div>
      {" "}
      <Modal
        triggerButton={
          <AppButton
            variant="primary-outline"
            className="ml-4 text-sm border border-primary-500 text-primary-500  hover:bg-primary-200 hover:text-primary-500 hover:border-transparent font-normal"
            size="sm"
          >
            <ShareIcon className="w-4 h-4 stroke-primary-500" />
            <span className="text-primary-500">Share Job</span>
          </AppButton>
        }
      >
        <div className="bg-neutral-50 p-4 flex flex-col gap-4 font-Poppins items-center">
          <h4 className="text-gray-600 text-2xl">Share this job via</h4>
          <ul className="flex items-center gap-4">
            {SHARE_LINK.map((share) => (
              <li key={share.id}>
                <Link
                  href={share.link}
                  className="p-2 border border-gray-200 block hover:bg-gray-200 transition-all duration-200"
                >
                  {share.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

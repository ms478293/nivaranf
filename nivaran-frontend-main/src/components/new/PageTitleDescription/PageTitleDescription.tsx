import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { PageTitle } from "../PageTitle/PageTitle";

const PageTitleDescription = ({
  titlePrefix,
  titleSuffix,
  buttonLabel,
  description,
}: {
  titlePrefix: string;
  titleSuffix: string;
  buttonLabel: string;
  description: string;
}) => {
  return (
    <div className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
      <PageTitle prefix={titlePrefix} suffix={titleSuffix} />

      <p className="text-sm text-gray-600">{description}</p>

      <Link href="#">
        <AppButton className="font-light" variant="primary-outline">
          {buttonLabel}
        </AppButton>
      </Link>
    </div>
  );
};

export default PageTitleDescription;

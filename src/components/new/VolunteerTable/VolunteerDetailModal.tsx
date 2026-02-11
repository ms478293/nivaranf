import FemaleIcon from "@/assets/icons/FemaleIcon";
import MaleIcon from "@/assets/icons/MaleIcon";
import { AppButton } from "@/components/ui/app-button";
import { useDisclosure } from "@/hooks/useDisclouse";
import { getProgramById } from "@/lib/api/programApi/api";
import { acceptApplication } from "@/lib/api/volunteerApi/api";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Modal } from "../Modal/Modal";
import { VoluteerTableType } from "./VolunteeerTable";

export const VolunteerDetailModal = ({
  volunteer,
  onClose,
  deleteAction,
  refetch,
}: {
  volunteer: VoluteerTableType;
  onClose?: () => void;
  deleteAction?: UseMutateFunction<any, any, void, unknown>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const deleteModal = useDisclosure(false);
  const { data: programData } = useQuery({
    queryKey: ["programById"],
    queryFn: async () => await getProgramById(volunteer.programId),
  });

  const { mutate: acceptAction } = useMutation({
    mutationFn: async (volunteer) => {
      await acceptApplication((volunteer as any)?.id);
    },
    onSuccess: () => {
      toast.success("Application approved successfully");
    },
    onError: () => {
      toast.success("Application rejected successfully");
    },
  });

  return (
    <>
      <div className="w-[42rem] mx-auto bg-white  rounded-2xl shadow-md  text-gray-800 font-Poppins">
        <h2 className="text-gray-800 text-lg font-medium  py-4 px-4">
          Volunteer Details
        </h2>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="font-medium  text-gray-950 px-4 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-2 px-4">
            <VolunteerDetailItem label="First Name" value={volunteer?.fname} />
            <VolunteerDetailItem
              label="Middle Name"
              value={!volunteer?.mname ? "---" : volunteer.mname}
            />
            <VolunteerDetailItem label="Last Name" value={volunteer?.lname} />
            <VolunteerDetailItem
              label="Nationality"
              value={volunteer?.nationality}
            />
            <p className="flex flex-col">
              <span className="text-gray-800 text-sm font-medium">Gender</span>
              <span className="text-sm px-3 py-0.5  flex gap-1 items-center rounded-sm border border-gray-200 w-fit ">
                {volunteer?.gender === "male" ? (
                  <MaleIcon className="fill-gray-400 w-4 h-4" />
                ) : (
                  <FemaleIcon className="fill-gray-400 w-4 h-4" />
                )}
                {volunteer?.gender}
              </span>
            </p>
          </div>
        </div>

        <div className=" pt-4  p-4">
          <h3 className="font-medium  text-gray-950 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-2 ">
            <VolunteerDetailItem
              label="Contact no."
              value={!volunteer?.phone ? "-" : volunteer?.phone}
            />
            <VolunteerDetailItem
              label="Email address"
              value={volunteer?.email}
            />
            <VolunteerDetailItem label="Address" value={volunteer?.address} />
          </div>
        </div>

        <div className="p-4 col-span-full">
          <VolunteerDetailItem
            label="Why do you want to join NIVARAN Foundation? (Optional)"
            value={volunteer?.why}
          />
        </div>

        <div className="  p-4">
          <VolunteerDetailItem
            label="Experience (Optional)"
            value={volunteer?.experience}
          />
        </div>

        <div className="   p-4">
          <h3 className="text-gray-950 font-medium mb-2">
            Affiliated Program Details
          </h3>

          <p className="flex flex-col w-fit justify-center text-center">
            <span className="text-gray-400 text-sm font-light">
              Program Name
            </span>
            <span className="text-primary-500 bg-primary-100 px-2 py-1 rounded-full text-sm">
              {/* {volunteer?} */}
              {programData?.name}
            </span>
          </p>
          {/* <p>
          <span className="font-semibold">Program Name:</span>
          <span className="ml-2 text-red-500 bg-red-100 px-2 py-1 rounded-md">
            {programData?.name}
          </span>
        </p> */}
        </div>

        <div className="flex justify-between gap-2 p-4">
          <button
            className="bg-gray-200 text-neutral-50 py-2 px-4 text-sm rounded-md w-full hover:bg-gray-400 "
            onClick={() => {
              deleteModal.open();
              // deleteAction?.();
              // onClose?.();
              // refetch?.();
            }}
          >
            Delete
          </button>
          <AppButton
            className="hover:bg-primary-100 hover:text-primary-500 w-full my-0"
            onClick={() => {
              acceptAction();
              onClose?.();
              refetch?.();
            }}
          >
            Approve Application
          </AppButton>
          {/* <button className="bg-red-500 text-white py-2 px-4 rounded-md">
          Approve Application
        </button> */}
        </div>
      </div>

      <Modal isOpen={deleteModal.state} onClose={deleteModal.close}>
        <DeleteConfirmationModal
          // id={(programData as any)?.id}
          onClose={() => {
            deleteModal.close();
            onClose?.();
          }}
          mutate={deleteAction}
          label="Do you want to delete this program?"
          refetch={refetch}
        />
      </Modal>
    </>
  );
};

export const VolunteerDetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <p className="flex flex-col text-wrap ">
      <span className="text-gray-800 text-sm font-medium">{label}</span>
      <span className="text-sm text-wrap">{value}</span>
    </p>
  );
};

import { Button } from "@/components/ui/button";
import {
  acceptApplication,
  rejectApplication,
} from "@/lib/api/volunteerApi/api";
import { queryClient } from "@/providers";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface ActionsCellProps {
  volunteerId: number;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ volunteerId }) => {
  // Accept Mutation
  const acceptMutation = useMutation({
    mutationFn: acceptApplication,
    mutationKey: ["accept"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["volunteers"] });
      toast.success(" Accepted Succesfully");
    },
  });

  // Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: rejectApplication,
    mutationKey: ["reject"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["volunteers"] });
      toast.success("Rejected Succesfully");
    },
  });

  const handleAccept = () => {
    acceptMutation.mutate(Number(volunteerId));
  };

  const handleReject = () => {
    rejectMutation.mutate(Number(volunteerId));
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleAccept}
        disabled={acceptMutation.isPending}
        className="bg-green-500 text-white"
      >
        {acceptMutation.isPending ? "Processing..." : "Accept"}
      </Button>
      <Button
        onClick={handleReject}
        disabled={rejectMutation.isPending}
        className="bg-red-500 text-white"
      >
        {rejectMutation.isPending ? "Processing..." : "Reject"}
      </Button>
    </div>
  );
};

export default ActionsCell;

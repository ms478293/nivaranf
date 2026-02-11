import { CreateJobSchemaType } from "@/components/dashboard/forms/JobForm/schema/createJob";
import { jobApplicationSchemaType } from "@/components/new/CareerForm/jobApplicationSchema";
import { api } from "../api";
import { getAccessToken } from "../programApi/api";

export const createJob = async (data: CreateJobSchemaType) => {
  console.log("CAREER JOB", data);
  const token = getAccessToken();
  try {
    const response = await api.post(
      "/api/carrer/job-openings",
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating program:", error);
    throw new Error("Failed to create program");
  }
};

export const jobApplication = async (data: jobApplicationSchemaType) => {
  console.log("CAREER JOB", data);

  try {
    const response = await api.post("/api/carrer/job-applications", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
};

export const getAlljobApplication = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/carrer/job-applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const acceptApplicationStatus = async (id: number) => {
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/carrer/job-application/accept",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const onHoldApplicationStatus = async (id: number) => {
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/carrer/job-application/on-hold",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const shortlistApplicationStatus = async (id: number) => {
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/carrer/job-application/shortlist",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const rejectApplicationStatus = async (id: number) => {
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.put(
      "/api/carrer/job-application/reject",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const deleteApplicant = async (id: number) => {
  console.log("ID", id);

  try {
    const token = getAccessToken();
    const response = await api.delete(
      `/api/carrer/job-applications/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const getJobById = async (id: number) => {
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.get(
      `/api/carrer/job-openings/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RESPONSE", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const updateJobOpening = async (
  data: CreateJobSchemaType,
  id: number
) => {
  console.log("DATA JOB", data);
  console.log("ID", id);
  try {
    const token = getAccessToken();
    const response = await api.put(
      `/api/carrer/job-openings/${id}`,
      {
        ...data,
        applyBefore:
          data.applyBefore instanceof Date
            ? data.applyBefore.toISOString()
            : data.applyBefore,
        benefits: data.benefits ? JSON.stringify(data.benefits) : undefined,
        additionalInfo: data.additionalInfo
          ? JSON.stringify(data.additionalInfo)
          : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating volunteers:", error);
    throw new Error("Failed to update volunteers");
  }
};

export const getAllJobs = async () => {
  try {
    const token = getAccessToken();
    const response = await api.get("/api/carrer/job-openings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

export const deletejob = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.delete(`/api/carrer/job-openings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }
};

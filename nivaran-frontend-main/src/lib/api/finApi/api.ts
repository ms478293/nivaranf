import {
  expenseEntrySchema,
  financialSchema,
  incomeEntrySchema,
} from "@/validations/validations";
import Cookies from "js-cookie";
import { z } from "zod";
import { api } from "../api";
import { getFoundationByName } from "../foundationApi/api";

const getAccessToken = () => {
  return Cookies.get("authToken");
};

// Create a new Fin
export const createFin = async (startDate: Date, endDate: Date) => {
  const token = getAccessToken();
  const foundationName = Cookies.get("currentFoundation");

  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  try {
    // Fetch foundation details using the foundation name
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    // Send the request to create the Fin entry with the date range and foundationId
    const response = await api.post(
      "/api/fin",
      {
        foundationId: foundation.id,
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating Fin:", error);
    throw new Error("Failed to create Fin");
  }
};

export const getFinsById = async (
  id: number
): Promise<z.infer<typeof financialSchema>> => {
  try {
    const token = getAccessToken();
    const response = await api.get(`/api/fin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Fin with ID ${id}:`, error);
    throw new Error("Failed to fetch Fin");
  }
};
export const getFinsByIdForWeb = async (
  id: number
): Promise<z.infer<typeof financialSchema>> => {
  try {
    const response = await api.get(`/api/web/fin/${id}`, {});
    return response.data;
  } catch (error) {
    console.error(`Error fetching Fin with ID ${id}:`, error);
    throw new Error("Failed to fetch Fin");
  }
};

// Get all Fin records
export const getAllFinsByFoundation = async () => {
  const foundationName = Cookies.get("currentFoundation");

  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  try {
    // Fetch foundation details using the foundation name
    const foundation = await getFoundationByName(foundationName);
    if (!foundation || !foundation.id) {
      throw new Error("Invalid foundation data");
    }

    const token = getAccessToken();
    const response = await api.get(`/api/fin?foundationId=${foundation.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching financial data:", error);
    throw new Error("Failed to fetch financial data");
  }
};

// Add an IncomeEntry
export const addIncomeEntry = async ({
  amount,
  description,
  type,
  foundationName,
}: z.infer<typeof incomeEntrySchema> & { foundationName: string }): Promise<
  z.infer<typeof incomeEntrySchema>
> => {
  const token = getAccessToken();

  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  // Fetch the foundation details by name
  const foundation = await getFoundationByName(foundationName);
  if (!foundation || !foundation.id) {
    throw new Error("Invalid foundation data");
  }
  const response = await api.post(
    "/api/fin/income",
    {
      amount: Number(amount), // Ensure numeric type
      type,
      description,
      foundationId: foundation.id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add an ExpenseEntry
export const addExpenseEntry = async ({
  amount,
  description,
  type,
  foundationName,
}: z.infer<typeof expenseEntrySchema> & { foundationName: string }): Promise<
  z.infer<typeof expenseEntrySchema>
> => {
  const token = getAccessToken();

  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  // Fetch the foundation details by name
  const foundation = await getFoundationByName(foundationName);
  if (!foundation || !foundation.id) {
    throw new Error("Invalid foundation data");
  }
  const response = await api.post(
    "/api/fin/expense",
    {
      amount: Number(amount), // Ensure numeric type
      type,
      description,
      foundationId: foundation.id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete a Fin by ID
export const deleteFin = async (id: number) => {
  const token = getAccessToken();
  const response = await api.delete(`/api/fin`, {
    data: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteIncomeEntry = async (id: number) => {
  try {
    const token = getAccessToken();
    const response = await api.delete("/api/fin/income", {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Deleting Income Entry:", error);
    throw new Error("Failed to Delete Income Entry");
  }
};
export const deleteExpenseEntry = async (id: number) => {
  try {
    const token = getAccessToken();
    console.log(id);
    const response = await api.delete("/api/fin/expense/", {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Deleting Expense Entry:", error);
    throw new Error("Failed to Delete Expense Entry");
  }
};

// Get IncomeEntry by ID
export const getIncomeEntryById = async (id: number) => {
  const token = getAccessToken();
  const response = await api.get(`/api/fin/income/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllIncomeEntries = async (): Promise<
  z.infer<typeof incomeEntrySchema>[]
> => {
  const token = getAccessToken();
  const foundationName = Cookies.get("currentFoundation");
  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  // Fetch the foundation details by name
  const foundation = await getFoundationByName(foundationName);
  // Ensure that the foundation data is valid
  if (!foundation || !foundation.id) {
    throw new Error("Invalid foundation data");
  }
  const response = await api.get(`/api/fin/income/all/${foundation.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Validate the response data against the schema
  const validatedData = z.array(incomeEntrySchema).parse(response.data);
  return validatedData;
};

// Get IncomeEntries by date range
export const getIncomeEntriesByDate = async (
  startDate: string,
  endDate: string,
  foundationId: number
) => {
  const token = getAccessToken();
  const response = await api.post(
    "/api/fin/income/date",
    { startDate, endDate, foundationId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get ExpenseEntry by ID
export const getExpenseEntryById = async (
  id: number
): Promise<z.infer<typeof expenseEntrySchema>[]> => {
  const token = getAccessToken();
  const response = await api.get(`/api/fin/expense/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all ExpenseEntries by foundation
export const getAllExpenseEntries = async (): Promise<
  z.infer<typeof expenseEntrySchema>[]
> => {
  const token = getAccessToken();
  const foundationName = Cookies.get("currentFoundation");
  if (!foundationName) {
    throw new Error("Foundation name is not available");
  }

  // Fetch the foundation details by name
  const foundation = await getFoundationByName(foundationName);
  // Ensure that the foundation data is valid
  if (!foundation || !foundation.id) {
    throw new Error("Invalid foundation data");
  }
  const response = await api.get(`/api/fin/expense/all/${foundation.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const validatedData = z.array(expenseEntrySchema).parse(response.data);
  return validatedData;
};

// Get ExpenseEntries by date range
export const getExpenseEntriesByDate = async (
  startDate: string,
  endDate: string,
  foundationId: number
) => {
  const token = getAccessToken();
  const response = await api.post(
    "/api/fin/expense/date",
    { startDate, endDate, foundationId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

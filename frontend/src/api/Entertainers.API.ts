import { Entertainer } from "../data/EntertainerType";

// Adjust this URL to match your ASP.NET endpoint
const BASE_URL =
  "https://finalexam-hcbqcwd8akbabmfc.eastus-01.azurewebsites.net/api/Ent";

export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Entertainer[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch entertainers:", error);
    throw error;
  }
};

export const fetchEntertainerById = async (
  id: number
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Entertainer = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch entertainer by ID:", error);
    throw error;
  }
};
export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete entertainer:", error);
    throw error;
  }
};

export const createEntertainer = async (
  entertainer: Omit<
    Entertainer,
    "entertainerID" | "timesBooked" | "lastBookedDate"
  >
): Promise<void> => {
  const response = await fetch(
    "https://finalexam-hcbqcwd8akbabmfc.eastus-01.azurewebsites.net/api/Ent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entertainer),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create entertainer. Status: ${response.status}`);
  }
};

export const updateEntertainer = async (
  id: number,
  entertainer: Omit<Entertainer, "entertainerID">
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entertainer),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to update entertainer:", error);
    throw error;
  }
};

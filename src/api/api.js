import { EVENTS_ENDPOINT } from "@/api/endpoints";
import { useAuth } from "@/contexts/authContext";
import { USER_ENDPOINT } from "@/api/endpoints";

export const fetchEvents = async () => {
  try {
    const url = `${EVENTS_ENDPOINT}`;
    console.log("url", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      return data;
    } else {
      console.error("Error fetching events", response.status);
      console.error("Error fetching events", response.body);
      console.error("Error fetching events", response);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const deleteEvent = async (eventID, userToken) => {
  try {
    const url = `${EVENTS_ENDPOINT}/${eventID}`;
    console.log("url", url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.text();
      console.log("response", response.status);
      console.log("data", data);
      return response.status;
    } else {
      console.error("Error deleting event", response.status);
      console.error("Error deleting event", response.body);
      console.error("Error deleting event", response);
    }
  } catch (error) {
    console.error("Error deleting event", error);
  }
};

export const fetchUserData = async (userID, userToken) => {
  try {
    if (userID && userToken) {
      const url = `${USER_ENDPOINT}/${userID}`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("userData:", userData);
        return userData;
      } else {
        console.error("Error fetching user data:", response.status);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};



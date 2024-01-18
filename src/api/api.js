import {
  USER_ENDPOINT,
  EVENTS_ENDPOINT,
  ATTENDANCE_ENDPOINT,
} from "@/api/endpoints";

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

export const removeUserFromEvent = async (eventId, userId, userToken) => {
  try {
    const url = `${ATTENDANCE_ENDPOINT}`;
    const userAttendance = JSON.stringify({
      eventId,
      userId,
    });
    console.log("userAttendance:", userAttendance);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: userAttendance,
    });

    if (response.ok) {
      const data = await response.text();
      console.log("response", response.status);
      console.log("data", data);
      return response.status;
    } else {
      console.error("Error deleting event", response.status);
      console.error("Error deleting event", response.body);
      console.error("Error deleting event", await response.text());
    }
  } catch (error) {
    console.error("Error deleting event", error);
  }
};

export const addUserToEvent = async (eventId, userId, userToken) => {
  try {
    const url = `${ATTENDANCE_ENDPOINT}`;

    const userAttendance = JSON.stringify({
      eventId,
      userId,
    });
    console.log("userAttendance:", userAttendance);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: userAttendance,
    });

    if (response.ok) {
      const data = await response.text();
      console.log("response", response.status);
      console.log("data", data);
      return response.status;
    } else {
      console.error("Error adding event", response.status);
      console.error("Error adding event", response.body);
      console.error("Error adding event", response);
    }
  } catch (error) {
    console.error("Error adding event", error);
  }
};

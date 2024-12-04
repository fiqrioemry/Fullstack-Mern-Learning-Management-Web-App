import axiosInstance from "@/api";
import { initialAuthNotification } from "@/config";

export async function signUpUser(formData, setAuthNotif) {
  try {
    // set loading process
    setAuthNotif.loading(true);

    const response = await axiosInstance.post("/api/auth/signup", formData);

    // set success message
    setAuthNotif.message(response.data.message);
  } catch (error) {
    // set error message
    setAuthNotif.message(error.response.data.message);
  } finally {
    // reset notification
    setAuthNotif(initialAuthNotification);
  }
}

export async function signInUser(formData, setAuthNotif) {
  try {
    // set loading process
    setAuthNotif.loading(true);

    const response = await axiosInstance.post("/api/auth/signin", formData);

    // set success message
    setAuthNotif.message(response.data.message);

    // set authorization token
    sessionStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.data.accessToken)
    );

    // return user response data
    return response.data.data.user;
  } catch (error) {
    // set error message
    setAuthNotif.message(error.response.data.message);
  } finally {
    // reset notification
    setAuthNotif(initialAuthNotification);
  }
}

export async function signOutUser(setAuthNotif) {
  try {
    // set loading process
    setAuthNotif.loading(true);

    const response = await axiosInstance.delete("/api/auth/signout");

    // set success message
    setAuthNotif.message(response.data.message);

    // remove authorization token
    sessionStorage.removeItem("accessToken");
  } finally {
    // reset notification
    setAuthNotif(initialAuthNotification);
  }
}

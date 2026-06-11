import settings from "./settings";
import { authHeader } from "./authHeader";

export const authService = {
  login,
  logout,
  profile,
  handleResponse,
  sendrecovery,
  isSessionValid,
  isAdmin,
  isStaff,
};
export function getUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  return user || false;
}

// Sessions live for 24 hours; after that the token is cleared and the user
// must log in again.
export const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

export function isSessionValid() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    return false;
  }
  if (!user.loginTime || Date.now() - user.loginTime > SESSION_TTL) {
    logout();
    return false;
  }
  return true;
}

// Roles are encoded in a single `admin` column:
//   1 = admin, 2 = staff, 0 = customer, null = referrer
export function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return !!user && user.admin == 1;
}

// Staff-level access — admins are implicitly staff so they keep access to the
// shared menus too.
export function isStaff() {
  const user = JSON.parse(localStorage.getItem("user"));
  return !!user && (user.admin == 1 || user.admin == 2);
}

export function login({ email, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${settings.API_URL}login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.user) {
        response.user.token = response.token;
        // Stamp the login time so the session can expire after 24 hours.
        response.user.loginTime = Date.now();
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
}

export function register({ firstname, lastname, email, password }) {
  console.log(email);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  };
  return fetch(`${settings.API_URL}vendor_register`, requestOptions).then(
    handleResponse
  );
}

export function sendrecovery({ email }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  return fetch(`${settings.API_URL}sendrecovery`, requestOptions).then(
    handleResponse
  );
}

export function profile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}profile`, requestOptions)
    .then(authService.handleResponse)
    .then((response) => {
      if (response.user) {
        return response.user;
      }
      return response;
    });
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("company");
  localStorage.removeItem("permissions");
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // Any expired/invalid session sends the user back to login. Skip the
        // redirect while already on the login page so a failed sign-in can
        // still surface its error message instead of reloading.
        if (!window.location.pathname.startsWith("/auth/login")) {
          window.location.href = "/auth/login";
        }
      } else if (response.status === 403) {
        window.location.href = "/";
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

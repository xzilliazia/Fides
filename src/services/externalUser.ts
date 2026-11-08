const EXTERNAL_USER_ENDPOINT = "https://jsonplaceholder.typicode.com/users/1";

export interface ExternalUser {
  id: number;
  name: string;
  email: string;
  website: string;
}

function isExternalUser(value: unknown): value is ExternalUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.website === "string"
  );
}

export async function fetchExternalUser(): Promise<ExternalUser> {
  const response = await fetch(EXTERNAL_USER_ENDPOINT);
  if (!response.ok) {
    return Promise.reject(
      new Error(`The user endpoint returned HTTP ${response.status}.`),
    );
  }

  const payload: unknown = await response.json();
  if (!isExternalUser(payload)) {
    return Promise.reject(new Error("The endpoint returned an invalid user."));
  }

  const user: ExternalUser = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    website: payload.website,
  };

  return Promise.resolve(user);
}

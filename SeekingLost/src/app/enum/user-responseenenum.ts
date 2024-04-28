export const UserResponseEnum = {
    ERROR: { message: "Error creating user!", code: 0 },
    CREATED: { message: "User created!", code: 1 },
    ALREADY_EXISTS: { message: "Users already exist!", code: 2 }
  } as const;
  
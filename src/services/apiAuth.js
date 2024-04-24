import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({ fullName, email, password }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: "",
        },
      },
    });

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to sign up");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to login");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to get user");
    }

    return data?.user;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to logout");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  try {
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to update user");
    }

    if (!avatar) return data;

    const avatarName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);

    if (uploadError) {
      if (uploadError.message) throw new Error(uploadError.message);
      else throw new Error("Failed to upload avatar");
    }

    const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
      },
    });

    if (error2) throw new Error(error2.message);

    return updateUser;
  } catch (error) {
    console.error(error);
  }
};

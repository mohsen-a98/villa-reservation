import supabase from "./supabase";

export const getSettings = async () => {
  try {
    const { data, error } = await supabase.from("settings").select("*");

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to fetch settings");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSettings = async (obj) => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(obj)
      .eq("id", 1)
      .select();

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to update settings");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

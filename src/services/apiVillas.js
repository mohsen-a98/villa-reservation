import supabase, { supabaseUrl } from "./supabase";

export const getVillas = async (filter, sortBy) => {
  try {
    let query = supabase.from("villas").select("*");

    // filter
    if (filter)
      filter.value === "yes"
        ? (query = query.gt(filter.field, 0))
        : (query = query.eq(filter.field, 0));

    // sortBy
    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    const { data, error } = await query;

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to fetch villas");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVilla = async (id) => {
  try {
    const { data, error } = await supabase.from("villas").delete().eq("id", id);
    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to delete villa");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createEditVilla = async (newVilla, id) => {
  try {
    const hasImagePath = newVilla.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newVilla?.image?.name}`.replaceAll(
      "/",
      "",
    );
    const imagePath = hasImagePath
      ? newVilla.image
      : `${supabaseUrl}/storage/v1/object/public/villas-images/${imageName}`;

    let query = supabase.from("villas");

    if (id) {
      query = query.update({ ...newVilla, image: imagePath }).eq("id", id);
    }
    if (!id) {
      query = query.insert([{ ...newVilla, image: imagePath }]);
    }

    const { data, error } = await query.select().single();

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("villa could not be created");
    }

    // upload image
    if (hasImagePath) return data;

    const { error: uploadError } = await supabase.storage
      .from("villas-images")
      .upload(imageName, newVilla.image);

    //delete the villa if image upload failed
    if (uploadError) {
      await supabase.from("villas").delete().eq("id", data?.id);
      console.error(uploadError);
      throw new Error(
        "villa image could not be uploaded and villa could not be created",
      );
    }
  } catch (error) {
    console.error(error);
  }
};

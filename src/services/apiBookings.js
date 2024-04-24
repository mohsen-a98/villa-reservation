import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
export const getBookings = async (filter, sortBy, page) => {
  try {
    let query = supabase
      .from("bookings")
      .select(
        "id, created_at, startDate, endDate, numNights, numGuests, status, villaPrice,villas(name),guests(fullName,email)",
        { count: "exact" },
      );
    // filter
    if (filter) query = query.eq(filter.field, filter.value);

    // sort
    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    // pagination
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to fetch bookings!");
      }
    }
    return { data, count };
  } catch (error) {
    console.error(error);
  }
};

export const getBooking = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, villas(*), guests(*)")
      .eq("id", id)
      .single();
    if (error) {
      if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to fetch booking!");
      }
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBooking = async (id, obj) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select();

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to update booking!");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBooking = async (id) => {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to delete booking!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getStaysTodayActivity = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName)")
      .or(
        `and(status.eq.unconfirmed, startDate.eq.${today}),and(status.eq.checked-in, endDate.eq.${today})`,
      )
      .order("created_at");
    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to fetch bookings!");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingsAfterDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at,villaPrice")
      .gte("created_at", date)
      .lte("created_at", `${new Date().toISOString().split("T")[0]}T23:59:59)`);

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to fetch bookings!");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getStaysAfterDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*,guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", `${new Date().toISOString().split("T")[0]}T00:00:00)`);

    if (error) {
      if (error.message) throw new Error(error.message);
      else throw new Error("Failed to fetch bookings!");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

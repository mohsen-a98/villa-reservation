import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yshcfwrschwapdmdgrdd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaGNmd3JzY2h3YXBkbWRncmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjE1MTcsImV4cCI6MjAyNTk5NzUxN30.DvLNqTenJMYaILAu5ufPaFACRg41g3hBE9Hlbf6_B_s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

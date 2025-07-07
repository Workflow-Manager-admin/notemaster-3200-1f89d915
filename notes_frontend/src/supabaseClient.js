import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
// Supabase configuration for frontend authentication and database access in Notes app.

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// PUBLIC_INTERFACE
// Returns an initialized Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

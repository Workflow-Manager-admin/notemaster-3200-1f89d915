import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
// Supabase configuration for frontend authentication and database access in Notes app.

// IMPORTANT: Do not hardcode keys in production. Here for demo/dev purpose.
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://qgmcdylmdodofjpuuklq.supabase.co";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbWNkeWxtZG9kb2ZqcHV1a2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjkzMzAsImV4cCI6MjA2Njc0NTMzMH0.Q3dbZtBZOZXwPL73kF1TR-asuum7vAcBMqbo-ihaN7k";

// PUBLIC_INTERFACE
// Returns an initialized Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

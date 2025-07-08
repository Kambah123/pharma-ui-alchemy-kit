import { createClient } from '@supabase/supabase-js';
// TODO: Import generated types from Supabase if available
// import type { Database } from './types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(/*<Database>*/ supabaseUrl, supabaseAnonKey); 
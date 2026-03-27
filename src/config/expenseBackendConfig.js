export const expenseBackendConfig = {
  supabaseUrl:
    process.env.REACT_APP_nice_SUPABASE_URL || process.env.NEXT_PUBLIC_nice_SUPABASE_URL || '',
  supabaseAnonKey:
    process.env.REACT_APP_nice_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_nice_SUPABASE_ANON_KEY || '',
  supabasePublishableKey:
    process.env.REACT_APP_nice_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_nice_SUPABASE_PUBLISHABLE_KEY ||
    '',
};

// Sensitive credentials are intentionally NOT read in browser code.
// Put server-only secrets in Vercel environment variables for backend functions only.

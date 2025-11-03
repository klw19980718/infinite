import { createBrowserClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * Get Supabase client for Client Components (Browser)
 * Uses @supabase/ssr to ensure cookies are synced with server
 */
export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    // Use createBrowserClient from @supabase/ssr to sync cookies with server
    // This ensures session is stored in cookies, not just localStorage
    client = createBrowserClient(url, anonKey)
  }
  return client
}

/**
 * Get Supabase client with SERVICE_ROLE_KEY (Server-side)
 * Use only for operations that require elevated privileges (e.g., webhooks)
 * ⚠️ Never use this in client-accessible code
 */
export function getServerSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !serviceKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
    },
  })
}



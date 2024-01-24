import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { Ride } from '~/interfaces/types'

type RefetchType = (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Ride | null, Error>>

class Supabase {
  client: SupabaseClient

  constructor() {
    this.client = createClient("https://hcljpchfhpqrmzuokvho.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbGpwY2hmaHBxcm16dW9rdmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMjk1NzgsImV4cCI6MjAyMTYwNTU3OH0.S6sZs2bAicgdadhDMNiXuDp7j1Nz-fWmDwkwQezQAoU")
  }

  watchRide(refetch: RefetchType) {
    return this.client
      .channel('Ride')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'Ride'
      }, () => {
        refetch()
      }).subscribe()
  }

  watchRideRequests(refetch: RefetchType) {
    this.client
      .channel('Driver')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'Driver'
      }, () => {
        refetch()
      }).subscribe()
  }
}

export default new Supabase();
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tjcywmfsvcfwnxzbifpj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY3l3bWZzdmNmd254emJpZnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNDY4NDcsImV4cCI6MjAxMTgyMjg0N30.i9qs-iligooEaIAOJNQ0qtkpIe14t7GRVTISzu64RpI"
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };
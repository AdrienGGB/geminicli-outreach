import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Check if a user's session exists
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return redirect('/login');
}

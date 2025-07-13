import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form action="/auth/sign-out" method="post">
        <button className="button block" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}

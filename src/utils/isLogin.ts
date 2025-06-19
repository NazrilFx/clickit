export default async function isLogin(): Promise<boolean> {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include', // agar cookie seperti JWT ikut terkirim
  });

  if (!res.ok) return false;

  const json = await res.json();
  return json.user? true : false;
}

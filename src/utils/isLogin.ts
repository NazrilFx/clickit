export default async function isLogin(): Promise<boolean> {
  const resUser = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include', // agar cookie seperti JWT ikut terkirim
  });

  if (!resUser.ok) {
    const resAffiliator = await fetch('/api/auth-affiliator/me', {
      method: 'GET',
      credentials: 'include',
    })

      const jsonAffiliator = await resAffiliator.json();
    return jsonAffiliator.affiliator? true : false;
  }

  const jsonUser = await resUser.json();
  return jsonUser.user? true : false;
}

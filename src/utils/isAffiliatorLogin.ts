export default async function isLogin(): Promise<boolean> {
    const resAffiliator = await fetch('/api/auth-affiliator/me', {
        method: 'GET',
        credentials: 'include',
    })

    const jsonAffiliator = await resAffiliator.json();
    return jsonAffiliator.affiliator ? true : false;
}

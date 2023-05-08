import Cookies from 'js-cookie';

/**
 * Unsing a signed cookie and return its content.
 * @param signedCookie The signed cookie string.
 * @returns The unsigned cookie content or null if the signature is invalid.
 */


function unsignCookie(signedCookie: string): { message: string } | null {
    const cookie = atob(signedCookie);
    if (cookie){
        return JSON.parse(cookie);
    }
    return null;
}

export function getCookie(cookieName: string): { message: string } | null {
    const signedCookie = Cookies.get(cookieName);
    if (signedCookie) {
        return unsignCookie(signedCookie);
    }
    return null;
}

export function deleteCookie(cookieName: string) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

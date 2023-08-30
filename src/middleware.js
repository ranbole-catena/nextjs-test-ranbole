import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

//export const config = { matcher: '/welcome' };

export async function middleware(request) {
    //console.log('request', request.headers.get('host'))
    let host = request.headers.get('host');

    if (host == 'localhost:3000') {
        host = 'localhost';
    }

    const consuldata = await get(host);

    //console.log('consuldata', consuldata)
    //response.cookies.set('consuldata', consuldata);
    // NextResponse.json requires at least Next v13.1 or
    // enabling experimental.allowMiddlewareResponseBody in next.config.js
    //return NextResponse.json(consuldata);

    return NextResponse.next();
}


// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/home', request.url))
//   }
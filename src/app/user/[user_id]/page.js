import Link from "next/link";

export default async function Page({ params }) {
    const data = await getData(params.user_id);
    return <>
        <p className="p-5">
            <h1 className="text-xl mb-5">User info</h1>
            Name: {data.user.name} <br />
            Email: {data.user.email} <br /><br />
            <Link className="text-orange-300" href={'/user'}>Back to user dir</Link>
        </p>

    </>
}

async function getData(userId) {
    const res = await fetch(`${process.env.API_EP}/api/user/${userId}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
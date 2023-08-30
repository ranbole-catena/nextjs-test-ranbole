import Link from "next/link";

export default async function Page({ params }) {
    //const data = await getData(params.blog_id);
    const data = {};
    console.log('data', data);
    return (
        <div className="p-5">
            <h1 className="font-bold text-xl">{data.title}</h1>

            <p>

                Body: {data.body} <br /><br />
                <Link className="text-orange-300" href={'/blog'}>Back to blog dir</Link>
            </p>
        </div>
    );

}

// SSR
async function getData(userId) {
    const res = await fetch(`${process.env.API_EP}/api/blogs/${userId}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
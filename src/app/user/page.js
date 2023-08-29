
import Link from "next/link";

export default async function Page() {
    //const users = await getData();
    const users = [];
    return (
        <div className="p-5">
            <h1 className="text-xl mb-5">This is a user directory page</h1>
            <table className="table-auto w-1/2">
                <thead>
                    <tr>
                        <th className="text-left">ID</th>
                        <th className="text-left">Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><Link className="text-orange-300" href={`/user/${user.id}`}>view</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

async function getData() {

    const res = await fetch(`${process.env.API_EP}/api/users`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
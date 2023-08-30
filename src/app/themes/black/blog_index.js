import Link from "next/link";

export default function BlogIndex({ blogs }) {
    return (
        <div className="p-5">
            <h1 className="text-xl mb-5">This is a user directory page</h1>
            <table className="table-auto w-1/2">
                <thead>
                    <tr>
                        <th className="text-left">Title</th>
                        <th className="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map((blog, i) => {
                            return (
                                <tr key={i}>
                                    <td>{blog.title}</td>
                                    {/* <td>{user.name}</td>
                                    <td>{user.email}</td> */}
                                    <td>
                                        <Link className="text-orange-300" href={`/blog/${blog.id}`}>
                                            view
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

import Link from "next/link";
import dynamic from 'next/dynamic'
import { useContext } from "react";

console.log('envlol', process.env.THEME);
const theme = process.env.THEME;
const path = `../themes/${theme}/blog_index`;
console.log('path', path);

const BlogIndex = dynamic(() => {
    if (theme == 'black') {
        return import(`../themes/black/blog_index`)
    } else if (theme == 'white') {
        return import(`../themes/white/blog_index`)
    } else {
        return import(`../themes/black/blog_index`)
    }

}, {
    loading: () => <p>Loading...</p>,
})

export default async function Page() {
    //console.log('env', process.env.API_EP);
    const blogs = await getData();
    console.log('blogs', blogs);
    return (
        <BlogIndex blogs={blogs} />
    )
    // console.log('blogs', blogs)
    // com
    //const blogs = [];
    // return (
    //     <div className="p-5">
    //         <h1 className="text-xl mb-5">This is a user directory page</h1>
    //         <table className="table-auto w-1/2">
    //             <thead>
    //                 <tr>
    //                     <th className="text-left">Title</th>
    //                     <th className="text-left"></th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {
    //                     blogs.map((blog, i) => {
    //                         return (
    //                             <tr key={i}>
    //                                 <td>{blog.title}</td>
    //                                 {/* <td>{user.name}</td>
    //                                 <td>{user.email}</td> */}
    //                                 <td><Link className="text-orange-300" href={`/blog/${blog.id}`}>view</Link></td>
    //                             </tr>
    //                         )
    //                     })
    //                 }
    //             </tbody>
    //         </table>
    //     </div>
    // )
}

async function getData() {

    const res = await fetch(`${process.env.API_EP}/api/blogs`);
    console.log('res', res);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    //console.log('res', res)
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
import dynamic from "next/dynamic";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

const BlogPage = dynamic(
  () => {
    const theme = process.env.THEME;
    console.log("path");
    if (theme == "black") {
      return import(`../../themes/black/blog_page`);
    } else if (theme == "white") {
      return import(`../../themes/white/blog_page`);
    } else {
      return import(`../../themes/black/blog_page`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

export default async function Page({ params }) {
  const data = await getDataFromCacheOrDB(params.blog_id);

  const news = [
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Exterior-View-of-New-York-New-York-hotel-casino-In-Las-Vegas-80x80.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Exterior-View-of-New-York-New-York-hotel-casino-In-Las-Vegas-300x180.jpg",
      title: "Las Vegas News, Rumors, And Shows In September 2023",
      date: "September 1, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Ohio-Casino-Sports-Gambling-Revenue-Increases-in-July-150x150.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Ohio-Casino-Sports-Gambling-Revenue-Increases-in-July-300x180.jpg",
      title: "Ohio Casino Revenue Led By Hollywood Columbus Casino In July",
      date: "September 1, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Broken-Record-With-Cash-Background-150x150.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Broken-Record-With-Cash-Background-300x180.jpg",
      title: "Virginia Lottery Sees Record Fiscal Year 2023 Sales And Profits",
      date: "September 1, 2023",
    },
  ];

  return <BlogPage data={data} news={news}></BlogPage>;
}

// SSR
async function getDataFromCacheOrDB(id) {
  const kv_key = `blog_${id}`;
  let resJson = await kv.get(kv_key);

  if (!resJson) {
    //const res = await fetch(`${process.env.API_EP}/api/blogs/${id}`);
    //resJson = await res.json();
    resJson = await fetchBlogDataFromDB(id);
    console.log(">>>resJson", resJson);
    await kv.set(kv_key, resJson, { ex: 3600, nx: false });
  }

  return resJson;
}

async function fetchBlogDataFromDB(id) {
  const config = {
    url: process.env["DATABASE_URL"],
  };

  const conn = await connect(config);

  const results = await conn.execute(
    "SELECT p.*, GROUP_CONCAT ( c.name ) as 'categories', GROUP_CONCAT ( c.slug ) as 'category_slugs', u.name as 'author_name', u.email as 'author_email' FROM posts p LEFT JOIN category_post cp on p.id = cp.post_id LEFT JOIN categories c ON cp.category_id = c.id LEFT JOIN users u on p.author_id = u.id where p.id = ? group by p.id",
    [id],
  );
  const data = results.rows[0] ?? {};

  let categories = [];
  let categories_arr = data.categories.split(",");
  let categoriy_slug_arr = data.category_slugs.split(",");

  categories_arr.forEach((c, i) => {
    categories.push({
      name: c,
      slug: categoriy_slug_arr[i],
    });
  });

  return {
    title: data.title,
    categories: categories,
    author: {
      name: data.author_name,
      img: "https://www.playusa.com/wp-content/uploads/2020/03/4eeb614417c557bad75cbc00fcfff3f9.jpeg",
      bio: "Derek Helling is the assistant managing editor of PlayUSA. Helling focuses on breaking news, including finance, regulation, and technology in the gaming industry. Helling completed his journalism degree at the University of Iowa and resides in Chicago",
    },
    date: data.published_on,
    banner_img:
      "https://www.playusa.com/wp-content/uploads/2023/08/racing-louisville-soccer-match-nwsl-1024x445.jpeg",
    content: data.body,
  };
}

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
  const data = await getData(params.blog_id);
  //const data = {};
  console.log("data", data);

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
async function getData(id) {
  console.log("getdatalol");

  //const res = await fetch(`${process.env.API_EP}/api/blogs/${userId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();

  const kv_key = `blog_${id}`;
  let data = await kv.get(kv_key);

  if (true) {
    const config = {
      url: process.env["DATABASE_URL"],
    };

    const conn = await connect(config);

    const results = await conn.execute(
      "SELECT p.*, GROUP_CONCAT ( c.name ) as 'categories', GROUP_CONCAT ( c.slug ) as 'category_slugs', u.name as 'author_name', u.email as 'author_email' FROM posts p LEFT JOIN category_post cp on p.id = cp.post_id LEFT JOIN categories c ON cp.category_id = c.id LEFT JOIN users u on p.author_id = u.id where p.id = ? group by p.id",
      [id],
    );
    data = results.rows[0] ?? {};
    await kv.set(kv_key, data, { ex: 3600, nx: true });
  }

  console.log("blog data", data);

  let categories = [];
  let categories_arr = data.categories.split(",");
  let categoriy_slug_arr = data.category_slugs.split(",");

  categories_arr.forEach((c, i) => {
    categories.push({
      name: c,
      slug: categoriy_slug_arr[i],
    });
  });

  // let content =
  //   "<p>If you planned on visiting a physical sportsbook in Kentucky on Sept. 7 and placing some legal wagers on Louisville City FC or Racing Louisville matches, you might be disappointed. A preliminary list of the events that licensed sportsbooks in the state can accept could exclude those fixtures.</p>";
  // content +=
  //   "<p>The catalog is still pending final approval from Kentucky regulators and even if approved as currently composed, it probably will see many additions in the future. In addition, the current omissions are somewhat open to interpretation and the catalog boasts a strong menu for bettors in one aspect.</p>";
  // content += "<h2>Kentucky council makes catalog recommendations</h2>";
  // content +=
  //   "<p>On Thursday morning, the newly created Kentucky Sports Wagering Advisory Council (KSWAC) held its first meeting online. Its only matter of business was to recommend an initial catalog of eligible events for the state’s physical sportsbooks.</p>";

  // content +=
  //   "<p>Those licensees should begin to take bets as soon as Sept. 7 across the state. For instance, <a href='/'>Churchill Downs has already confirmed its plans</a> to do so on that date at six locations across Kentucky. In order to facilitate that legal sports betting activity, a catalog of eligible events is necessary.</p>";

  // content +=
  //   "<p>The KSWAC is just as the name suggests, an advisory body only. The real power to regulate sports wagering and most other forms of gaming in Kentucky still lies with the Kentucky Horse Racing Commission (KHRC). Thus, the KHRC still needs to approve the KSWAC’s recommendations between now and Sept. 7.</p>";

  // content +=
  //   "<p>The initial event catalog is quite robust in some ways. In others, though, it seems to be lacking. To some extent that depends on the reading of the language, too.</p>";
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

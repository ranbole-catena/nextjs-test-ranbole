import dynamic from "next/dynamic";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

const CategoryPage = dynamic(
  () => {
    const theme = process.env.THEME;
    console.log("path");
    if (theme == "black") {
      return import(`../../themes/black/category_page`);
    } else if (theme == "white") {
      return import(`../../themes/white/category_page`);
    } else {
      return import(`../../themes/black/category_page`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

export default async function Page({ params }) {
  const data = await getDataFromDB(params.category_slug);
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

  return <CategoryPage data={data} news={news}></CategoryPage>;
}

// SSR
async function getDataFromDB(slug) {
  let data = [];
  // if (true) {
  const config = {
    url: process.env["DATABASE_URL"],
  };

  const conn = await connect(config);

  const results = await conn.execute(
    "select p.*, u.name as author_name from posts p JOIN category_post cp on p.id = cp.post_id JOIN categories c on cp.category_id = c.id JOIN users u on u.id = p.author_id WHERE c.slug = ?",
    [slug],
  );

  data = results.rows;

  console.log("category data", data);

  return data;
}

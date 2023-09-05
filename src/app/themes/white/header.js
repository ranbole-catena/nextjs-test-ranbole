import Image from "next/image";

export default function Header() {
  return (
    <nav className="fixed sticky top-0 z-50 z-50 w-full bg-white">
      <div className="container mx-auto grid grid-cols-6 items-center gap-4 py-3">
        <div>
          <Image
            src="https://www.playusa.com/wp-content/uploads/2016/11/playusa2x.png"
            width={150}
            height={50}
            alt="header_logo"
          />
        </div>
        <div className="col-span-5">
          <ul id="news-menu" className="flex items-center">
            <li id="menu-item-99131" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/news/">News Home</a>
            </li>
            <li id="menu-item-99124" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/commercial-gaming/">
                Commercial Gaming
              </a>
            </li>
            <li id="menu-item-99125" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/tribal-gaming/">
                Tribal Gaming
              </a>
            </li>
            <li id="menu-item-99132" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/industry/">Industry</a>
            </li>
            <li id="menu-item-99126" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/legislation/">
                Legislation and Regulation
              </a>
            </li>
            <li id="menu-item-99127" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/financial/">
                Financial
              </a>
            </li>
            <li id="menu-item-99130" className="mx-3 font-oswald">
              <a href="https://www.playusa.com/category/las-vegas/">
                Las Vegas
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

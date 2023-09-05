import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 bg-white pt-20">
      <div className="container mx-auto grid grid-cols-3 items-center gap-4 py-3 font-oswald">
        <div>
          <h2>US STATE GAMBLING GUIDES</h2>
        </div>
        <div></div>
        <div>
          <Image
            src="https://www.playusa.com/wp-content/uploads/2016/11/playusa2x.png"
            width={300}
            height={100}
            alt="footer_logo"
          />
        </div>
      </div>
    </footer>
  );
}

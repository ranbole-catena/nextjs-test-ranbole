import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { LinkStyle } from "./styles";
export default function Footer() {
  return (
    <footer className="w-full border-t-2 bg-white pt-10">
      <div className="text-gray-00 container mx-auto grid grid-cols-3 gap-4 py-3 font-oswald text-xl tracking-widest">
        <div className="uppercase">
          <h2 className="mb-3">State Casino Guide</h2>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              MICHIGAN ONLINE CASINOS
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              NJ ONLINE CASINOS
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              NY ONLINE CASINOS
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              PA ONLINE CASINOS
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              WV ONLINE CASINOS
            </Link>
          </div>
        </div>
        <div className="uppercase">
          <h2 className="mb-3">Casino Reviews</h2>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              BETMGM CASINO
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              BETRIVERS CASINO
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              CAESARS CASINO
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              DRAFTKINGS CASINO
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              FANDUEL CASINO
            </Link>
          </div>
          <div className="flex items-center text-gray-600">
            <ChevronRightIcon className="mr-2 h-4" />
            <Link className="hover:underline" href="/">
              GOLDEN NUGGET CASINO
            </Link>
          </div>
        </div>
        <div className="text-center">
          <Image
            src="https://www.playusa.com/wp-content/uploads/2016/11/playusa2x.png"
            width={300}
            height={100}
            className="mx-auto w-auto"
            alt="footer_logo"
          />
          {/* search */}
          <div className="relative mx-auto my-5 pt-2 text-gray-600">
            <input
              className="h-10 w-full border border-gray-300 bg-white px-5 pr-16 font-oswald text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mr-4 mt-5"
              aria-label="Search button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* search below text */}
          <div className="text-left text-sm italic">
            <p>
              Bet with your head, not over it. Call{" "}
              <Link href="/" className={LinkStyle}>
                1-800-GAMBLER{" "}
              </Link>
              if you have a gambling problem.
            </p>
            <p>
              21+:{" "}
              <Link href="/" className={LinkStyle}>
                PlayUSA.com
              </Link>{" "}
              and all content herein is intended for audiences 21 years and
              older.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { appVersion } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      id="footerPortfolio"
      className="mt-4 py-6 px-4 text-center text-sm text-gray-500 
                 border-t border-gray-300 dark:border-gray-800 dark:bg-black"
    >
      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-3 text-lg">
        <Link
          href="https://github.com/Farhanugraha"
          aria-label="GitHub"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaGithub />
        </Link>

        <Link
          href="https://www.linkedin.com/in/farhanugraha/"
          aria-label="LinkedIn"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaLinkedin />
        </Link>

        <Link
          href="https://www.instagram.com/farhanugrha/"
          aria-label="Instagram"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaInstagram />
        </Link>

        <Link
          href="mailto:farhanoegrahaa@gmail.com?subject=Hello Farhan"
          aria-label="Email"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaEnvelope />
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} Farhan Nugraha. All rights reserved.
      </p>

      {/* Version & Credits */}
      <p className="text-xs sm:text-sm mt-1">
        <Link
          href="https://github.com/Farhanugraha/portofolio-nextjs"
          rel="noopener noreferrer"
        >
          <span className="font-semibold hover:text-blue-500 transition-colors duration-200">
            v{appVersion}
          </span>
        </Link>
        &nbsp;built by&nbsp;
        <Link href="https://github.com/Farhanugraha" rel="noopener noreferrer">
          <span className="font-semibold hover:text-blue-500 transition-colors duration-200">
            @farhanugraha
          </span>
        </Link>
      </p>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 flex justify-center">
      <nav className="max-w-6xl flex justify-between items-center grow px-4 lg:px-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/casso-logo.png"
            width={64}
            height={64}
            alt="Casso Logo"
            className="w-[42px] h-[42px]"
          />
          <h2 className="font-extrabold text-primary text-xl">CASSO</h2>
        </Link>
        <h2 className="font-bold text-sm md:text-base">EBOOK ĐỘC QUYỀN</h2>
      </nav>
    </header>
  );
};

export default Header;

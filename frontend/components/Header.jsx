import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 flex justify-center">
            <nav className="max-w-6xl flex justify-between items-center grow">
                <Link href="/">
                    <Image
                        src="/images/casso-logo.png"
                        width={64}
                        height={64}
                        alt="Casso Logo"
                    />
                </Link>
                <h2>EBOOK ĐỘC QUYỀN</h2>
            </nav>
        </header>
    );
};

export default Header;

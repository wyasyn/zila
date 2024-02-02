import Link from "next/link";
import Logo from "./Logo";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const socialsdata = [
    {
        name: "github",
        icon: <FiGithub />,
        url: "https://github.com/wyasyn",
    },
    {
        name: "linkedin",
        icon: <FiLinkedin />,
        url: "https://www.linkedin.com/in/yasin-walum-01b18295/",
    },
];

export default function Footer() {
    return (
        <footer className=" bg-secondary py-[5rem] ">
            <div className="container flex flex-col lg:flex-row gap-8 items-center lg:justify-between">
                <p className="text-sm text-muted-foreground">
                    Copyright {new Date().getFullYear()}{" "}
                    <span className=" text-primary italic ">Zila</span>. All
                    rights reserved.
                </p>
                <Logo />
                <div className=" flex items-center gap-4 text-muted-foreground ">
                    {socialsdata.map((item) => (
                        <Link href={item.url} key={item.name}>
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}

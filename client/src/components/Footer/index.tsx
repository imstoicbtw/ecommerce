import { EnvelopeIcon } from "@heroicons/react/24/outline/index";
import { ClockIcon } from "@heroicons/react/24/solid/index";
import { Link } from "react-router-dom";


export default function Footer () {

    const footerMenu: Record<string, string> = {
        "About": "/about",
        "Contact": "/contact",
        "Privacy Policy": "/privacy-policy",
        "Terms of Service": "/terms-of-service",
    };

    return (
        <footer className={"bg-blue-50"}>
            <section className={"inner py-10"}>
                <div className={"grid grid-cols-4"}>
                    <nav className={"col-span-1"}>
                        <ul className={"flex flex-col gap-2"}>
                            {Object.entries(footerMenu).map(([ label, to ]) => (
                                <li key={"footer_nav_menu" + to}>
                                    <Link className={"link"} to={to}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={"col-span-3 flex flex-col justify-center items-end gap-2"}>
                        <h1 className={"flex gap-1 items-center text-2xl font-black justify-center leading-0 text-blue-500"}>
                            <ClockIcon className={"size-6 -mt-px"} />
                            <span>SHOPHOUR</span>
                        </h1>
                        <address className={"text-right text-slate-700"}>
                            <p>
                                Flat No. 302, Sunrise Apartments, Linking Road, Bandra West,
                                <br />
                                Mumbai, Maharashtra 400050, India.
                            </p>
                            <p className={"flex gap-1 items-center justify-end text-blue-600"}>
                                <EnvelopeIcon className={"size-4"} />
                                <a href={"mailto:contact@shophour.in"} className={"link"}>contact@shophour.in</a>
                            </p>
                        </address>
                    </div>
                </div>
            </section>
            <section className={"inner border-t-2 border-blue-100 py-4"}>
                <p className={"text-center text-slate-500"}>
                    &copy; {new Date().getFullYear()} Shophour. All rights reserved.
                </p>
            </section>
        </footer>
    );
}
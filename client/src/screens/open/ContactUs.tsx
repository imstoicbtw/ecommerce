import { PhoneArrowUpRightIcon, EnvelopeIcon } from "@heroicons/react/16/solid/index";


export function ContactUs () {
    return (
        <main>
            <section className={"inner my-12"}>
                <h1 className={"text-2xl font-bold"}>Contact Us</h1>
                <p>If you have any queries, feel free to reach out to us.</p>
                <div className={"mt-5"}>
                    <address className={"text-slate-700"}>
                        <p>
                            Flat No. 302, Sunrise Apartments, Linking Road, Bandra West,
                            <br />
                            Mumbai, Maharashtra 400050, India.
                        </p>
                        <p className={"flex gap-1 items-center text-blue-600 mt-2"}>
                            <PhoneArrowUpRightIcon className={"size-4"} />
                            <a href={"tel:919876543210"} className={"link"}>+91 98765 43210</a>
                        </p>
                        <p className={"flex gap-1 items-center text-blue-600"}>
                            <EnvelopeIcon className={"size-4"} />
                            <a href={"mailto:contact@shophour.in"} className={"link"}>contact@shophour.in</a>
                        </p>
                    </address>
                </div>
            </section>
        </main>
    );
}
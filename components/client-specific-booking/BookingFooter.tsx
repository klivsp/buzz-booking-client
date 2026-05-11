import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const solutionsLinks = ['Holisense.com', 'Become our partner', 'Manage your property'];
const knowLinks = ['Terms and conditions', 'Privacy policy', 'Cookies policy', 'Safely'];
const aboutLinks = ['About us', 'F.A.Q.', 'Contact us', 'Blog'];

type BookingFooterProps = {
    variant?: 'default' | 'manage';
};

const BookingFooter = ({ variant = 'default' }: BookingFooterProps) => {
    const isManage = variant === 'manage';

    return (
        <footer className={isManage ? 'mt-16 border-t border-blue-900 bg-[#0b3b8a] text-slate-100' : 'mt-16 border-t border-slate-200 bg-white text-slate-700'}>
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 text-center sm:px-6 md:grid-cols-[1fr_1fr_1fr_1.2fr] md:items-start md:text-left lg:px-8">
                <div>
                    <h4 className={isManage ? 'text-base font-semibold text-white' : 'text-base font-semibold text-slate-900'}>Our solutions</h4>
                    <ul className="mt-3 space-y-2.5">
                        {solutionsLinks.map((link) => (
                            <li key={link}>
                                <a className={isManage ? 'text-sm text-slate-200 transition hover:text-white' : 'text-sm text-slate-600 transition hover:text-slate-900'} href="#">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className={isManage ? 'text-base font-semibold text-white' : 'text-base font-semibold text-slate-900'}>To know</h4>
                    <ul className="mt-3 space-y-2.5">
                        {knowLinks.map((link) => (
                            <li key={link}>
                                <a className={isManage ? 'text-sm text-slate-200 transition hover:text-white' : 'text-sm text-slate-600 transition hover:text-slate-900'} href="#">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className={isManage ? 'text-base font-semibold text-white' : 'text-base font-semibold text-slate-900'}>All about us</h4>
                    <ul className="mt-3 space-y-2.5">
                        {aboutLinks.map((link) => (
                            <li key={link}>
                                <a className={isManage ? 'text-sm text-slate-200 transition hover:text-white' : 'text-sm text-slate-600 transition hover:text-slate-900'} href="#">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center md:justify-self-end md:items-end md:text-right">
                    <div className={isManage ? 'text-4xl font-semibold tracking-tight text-white sm:text-5xl' : 'text-4xl font-semibold tracking-tight text-teal-600 sm:text-5xl'}>PMP</div>
                    <div className="mt-4 flex items-center gap-5 md:justify-end md:gap-3">
                        <a href="#" aria-label="Facebook" className={isManage ? 'text-slate-200 transition hover:text-white' : 'text-slate-500 transition hover:text-slate-800'}>
                            <FaFacebookF className="h-4 w-4" />
                        </a>
                        <a href="#" aria-label="Twitter" className={isManage ? 'text-slate-200 transition hover:text-white' : 'text-slate-500 transition hover:text-slate-800'}>
                            <FaTwitter className="h-4 w-4" />
                        </a>
                        <a href="#" aria-label="Instagram" className={isManage ? 'text-slate-200 transition hover:text-white' : 'text-slate-500 transition hover:text-slate-800'}>
                            <FaInstagram className="h-4 w-4" />
                        </a>
                        <a href="#" aria-label="Email" className={isManage ? 'text-slate-200 transition hover:text-white' : 'text-slate-500 transition hover:text-slate-800'}>
                            <MdEmail className="h-4 w-4" />
                        </a>
                    </div>
                    <p className={isManage ? 'mt-4 text-xs text-slate-200' : 'mt-4 text-xs text-slate-600'}>
                        You can also find us on <span className={isManage ? 'font-semibold text-white' : 'font-semibold text-emerald-600'}>★ Trustpilot</span>
                    </p>
                </div>
            </div>

            <div className={isManage ? 'border-t border-blue-900' : 'border-t border-slate-200'}>
                <div className={isManage ? 'mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-5 text-center text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8' : 'mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8'}>
                    <p>Chroma Italy Hotels s.r.l © {new Date().getFullYear()}</p>
                    <div className="flex items-center gap-2">
                        <span className={isManage ? 'rounded border border-blue-700 px-2 py-1 font-semibold text-slate-100' : 'rounded border border-slate-300 px-2 py-1 font-semibold text-slate-600'}>PCI DSS</span>
                        <span className={isManage ? 'rounded border border-blue-700 px-2 py-1 font-semibold text-slate-100' : 'rounded border border-slate-300 px-2 py-1 font-semibold text-slate-600'}>SECURED BY SSL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BookingFooter;
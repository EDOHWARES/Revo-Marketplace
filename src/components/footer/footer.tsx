import Image from 'next/image';
import { RiFacebookLine, RiGithubLine, RiInstagramLine } from 'react-icons/ri';
import { RiLinkedinLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface FooterLink {
  title: string;
  items: string[] | { label: string; href: string }[];
}

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    {
      title: 'Support',
      items: ['San Jose, Costa Rica', 'Revolutionaryfarmer@gmail.com'],
    },
    {
      title: 'Account',
      items: [
        { label: 'My Account', href: '#' },
        { label: 'Login / Register', href: '#' },
        { label: 'Cart', href: '#' },
        { label: 'Wishlist', href: '#' },
        { label: 'Shop', href: '#' },
      ],
    },
    {
      title: 'Quick Links',
      items: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Contact', href: '#' },
        {
          label: 'Documentation',
          href: 'https://revolutionary-farmers.gitbook.io/revolutionary-farmers',
        },
      ],
    },
    {
      title: 'Download App',
      items: [
        {
          label: 'Barcode',
          img: '/qrcode.png',
        },
        {
          label: 'Play store',
          href: '#',
          img: '/googleplay.png',
        },
      ],

      social: [
        {
          label: 'Twitter',
          href: 'https://x.com/revofarmers',
          component: <RiTwitterLine size={20} />,
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/company/revofarmers/',
          className: 'fab fa-linkedin',
          component: <RiLinkedinLine size={20} />,
        },
        {
          label: 'Github',
          href: 'https://github.com/Crypto-Jaguars',
          component: <RiGithubLine size={20} />,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#375B42] text-[#ffffff] dark:bg-background-dark h-auto w-full font-[family-name:var(--font-geist-sans)] ">
      <div className="py-16 px-10 md:px-40">
        <div className="flex flex-col md:flex-row justify-between">
          {footerLinks.map(({ title, items, social }) => (
            <div key={title} className="flex text-base flex-col gap-4 w-full md:w-1/6">
              <h3 className="text-white font-bold">{t(title)}</h3>
              <ul
                className={`flex ${
                  title === 'Download App' ? 'flex-row ' : 'flex-col'
                } text-sm font-normal gap-5`}
              >
                {items.map((item, index) => (
                  <li key={index}>
                    {typeof item === 'string' && title === 'Support' ? (
                      <span className="text-white">{item}</span>
                    ) : (
                      <a href={item.href} target="_blank" className="text-white hover:text-primary">
                        {item.img && (
                          <Image
                            src={item.img}
                            alt={t(item.label)}
                            width={60}
                            height={60}
                            className="w-full h-full object-contain"
                          />
                        )}
                        {!item.img && t(item.label)} {/* Show label only if no image */}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {/* Render images and social links only for 'Download App' */}
              {title === 'Download App' && (
                <div className="flex flex-col">
                  {/* Display social icons in a row */}
                  <div className="flex flex-row gap-4">
                    {social.map(({ label, href, component }, index) => (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary"
                        aria-label={label}
                      >
                        {component}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-white border-opacity-5 py-5">
        <p className="text-white text-opacity-95 opacity-85 font-normal text-sm">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </div>
  );
};

export default Footer;

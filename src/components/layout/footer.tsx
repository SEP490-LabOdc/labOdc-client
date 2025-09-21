import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import logo from '@/assets/logo-white-text.png'

const footerLinks = {
    platform: [
        { name: "Home", href: "/" },
        { name: "Talent Pool", href: "/talent-pool" },
        { name: "Marketplace", href: "/marketplace" },
    ],
    enterprises: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "Case Studies", href: "/case-studies" },
    ],
    resources: [
        { name: "Blog", href: "/blog" },
        { name: "FAQs", href: "/faqs" },
        { name: "Support", href: "/support" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
}

const socialLinks = [
    { name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
    { name: "Twitter", href: "#", icon: IconBrandTwitter },
    { name: "GitHub", href: "#", icon: IconBrandGithub },
    { name: "Facebook", href: "#", icon: IconBrandFacebook },
]
export function Footer() {
    return (
        <footer className="bg-brand-dark-teal text-white border-t border-brand-green-teal/20">
            {/* Middle Section - Navigation Links */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Platform Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Platform</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="
                                        text-slate-200 hover:text-brand-green-teal transition-colors
                                          text-sm leading-relaxed
                                        "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Enterprises */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">For Enterprises</h4>
                        <ul className="space-y-3">
                            {footerLinks.enterprises.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="
                      text-slate-200 hover:text-brand-green-teal transition-colors
                      text-sm leading-relaxed
                    "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="
                      text-slate-200 hover:text-brand-green-teal transition-colors
                      text-sm leading-relaxed
                    "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="
                      text-slate-200 hover:text-brand-green-teal transition-colors
                      text-sm leading-relaxed
                    "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Connect</h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <Link
                                        key={social.name}
                                        to={social.href}
                                        className="
                                            w-10 h-10 bg-brand-green-teal/20 hover:bg-brand-green-teal
                                            rounded-lg flex items-center justify-center
                                            transition-colors group
                                        "
                                        aria-label={social.name}
                                    >
                                        <Icon className="h-5 w-5 text-slate-200 group-hover:text-white" />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="border-t border-brand-green-teal/20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="logo" className='w-20 h-20' />
                        </div>

                        <p className="text-slate-200 text-sm">© 2025 Lab-based ODC Platform. All rights reserved.</p>

                        <div className="flex items-center space-x-6 text-sm">
                            <Link to="/terms" className="text-slate-200 hover:text-brand-orange transition-colors">
                                Terms of Service
                            </Link>
                            <span className="text-slate-400">|</span>
                            <Link to="/privacy" className="text-slate-200 hover:text-brand-orange transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import logo from '@/assets/logo-white-text.png'

const footerLinks = {
    platform: [
        { name: "Trang chủ", href: "/" },
        { name: "Dự án", href: "/projects" },
    ],
    enterprises: [
        { name: "Đăng ký doanh nghiệp", href: "/company-register" },
        { name: "Đăng nhập", href: "/sign-in" },
        { name: "Danh sách công ty", href: "/companies" },
    ],
    resources: [
        { name: "Điều khoản & Chính sách", href: "/terms-and-privacy" },
    ],
}

const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: IconBrandLinkedin },
    { name: "Twitter", href: "https://www.twitter.com", icon: IconBrandTwitter },
    { name: "GitHub", href: "https://www.github.com", icon: IconBrandGithub },
    { name: "Facebook", href: "https://www.facebook.com", icon: IconBrandFacebook },
]
export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground border-t border-primary/20">
            {/* Middle Section - Navigation Links */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <img src={logo} alt="LabODC Logo" className="w-28 h-28 shrink-0" />
                            <div className="flex-1 pt-6">
                                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                                    Nền tảng Lab-based ODC kết nối doanh nghiệp với tài năng công nghệ thông tin.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-secondary/20 hover:bg-secondary rounded-md flex items-center justify-center transition-colors group"
                                        aria-label={social.name}
                                    >
                                        <Icon className="h-5 w-5 text-primary-foreground/80 group-hover:text-primary-foreground" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-primary-foreground text-lg">Hệ thống</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm leading-relaxed"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Enterprises */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-primary-foreground text-lg">Dành cho doanh nghiệp</h4>
                        <ul className="space-y-3">
                            {footerLinks.enterprises.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm leading-relaxed"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-primary-foreground text-lg">Tài nguyên</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm leading-relaxed"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="border-t border-primary/20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <p className="text-primary-foreground/80 text-sm text-center">
                            © 2025 Lab-based ODC Platform. Bảo lưu mọi quyền.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

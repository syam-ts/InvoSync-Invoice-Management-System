import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Github,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Youtube,
    Heart,
    Shield,
    FileText,
    HelpCircle,
    Users,
    Building2,
    CreditCard,
    Settings,
    ExternalLink,
} from "lucide-react";

const Footer = () => {
    const footerLinks = {
        product: [
            { name: "Dashboard", icon: Settings, href: "/dashboard" },
            { name: "Invoices", icon: FileText, href: "/invoices" },
            { name: "Companies", icon: Building2, href: "/companies" },
            { name: "Payments", icon: CreditCard, href: "/payments" },
        ],
        support: [
            { name: "Help Center", icon: HelpCircle, href: "/help" },
            { name: "Documentation", icon: FileText, href: "/docs" },
            { name: "Community", icon: Users, href: "/community" },
            { name: "Contact Us", icon: Mail, href: "/contact" },
        ],
        legal: [
            { name: "Privacy Policy", icon: Shield, href: "/privacy" },
            { name: "Terms of Service", icon: FileText, href: "/terms" },
            { name: "Cookie Policy", icon: Settings, href: "/cookies" },
            { name: "GDPR", icon: Shield, href: "/gdpr" },
        ],
    };

    const socialLinks = [
        {
            name: "GitHub",
            icon: Github,
            href: "https://github.com",
            color: "hover:text-gray-300",
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: "https://twitter.com",
            color: "hover:text-blue-400",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: "https://linkedin.com",
            color: "hover:text-blue-500",
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://facebook.com",
            color: "hover:text-blue-600",
        },
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://instagram.com",
            color: "hover:text-pink-500",
        },
        {
            name: "YouTube",
            icon: Youtube,
            href: "https://youtube.com",
            color: "hover:text-red-500",
        },
    ];

    return (
        <footer className="bg-gradient-to-br bottom-0 justify-end relative from-gray-900 via-slate-900 to-gray-900 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-12 hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">InvoiceApp</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Streamline your billing process with our powerful invoice
                                management platform. Built for modern businesses.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">support@invoiceapp.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                                        >
                                            <IconComponent className="w-4 h-4 group-hover:text-gray-300" />
                                            <span>{link.name}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                                        >
                                            <IconComponent className="w-4 h-4 group-hover:text-gray-300" />
                                            <span>{link.name}</span>
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                                        >
                                            <IconComponent className="w-4 h-4 group-hover:text-gray-300" />
                                            <span>{link.name}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-400 ${social.color} border border-white/10 hover:border-white/30 transform hover:-translate-y-1`}
                                        title={social.name}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>

                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>© 2024 InvoiceApp. Made with</span>
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>in San Francisco</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-2 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <span>Version 2.1.0</span>
                            <span>•</span>
                            <span>Last updated: Jan 2024</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                                <Globe className="w-3 h-3" />
                                <span>Available worldwide</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Shield className="w-3 h-3" />
                            <span>SOC 2 Type II Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { Link, useLocation } from '@tanstack/react-router'
import { SignOutButton } from '@clerk/tanstack-react-start'
import { Home, ArrowRightLeft, LogOut, LucideIcon } from 'lucide-react'
import logo from "@/assets/logo.png"

interface NavItem {
    path: string
    label: string
    icon: LucideIcon
}

const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Start', icon: Home },
    { path: '/dashboard/tradepile', label: 'Tradepile', icon: ArrowRightLeft },
]

interface DashboardSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const location = useLocation()

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <nav
                className={`fixed left-0 top-0 h-full w-64 bg-neutral-800/50 border-r border-neutral-700/50 backdrop-blur-sm flex flex-col z-40 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <div className="p-6 border-b border-neutral-700/50 flex items-center gap-2">
                    <img src={logo} alt="AvionTrade Hub" className="w-10 h-10" />
                    <h2 className="text-xl font-bold bg-linear-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        AvionTrade Hub
                    </h2>
                </div>

                <nav className="flex-1 px-2 py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onClose()
                                    }
                                }}
                                className={`flex items-center gap-2 px-2 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-700/50">
                    <SignOutButton>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                         text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200 transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </SignOutButton>
                </div>
            </nav>
        </>
    )
}

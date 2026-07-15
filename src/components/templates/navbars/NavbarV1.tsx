"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Menu,
  LayoutDashboard,
  LogOut,
  Settings,
  Package,
  Truck,
  ChevronDown
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { AIChatbot } from '@/components/layout/AIChatbot';
import { Logo } from '@/components/ui/logo';
import { useSettings } from '@/components/SettingsProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { href: '/', label: 'Home' },
  {
    label: 'Our Services',
    dropdown: [
      {
        category: 'Business Consultations',
        items: [
          { href: '/export-consulting', label: 'Export' },
          { href: '/import-consulting', label: 'Import' }
        ]
      },
      {
        category: 'Medical Consultations',
        items: [
          { href: '/medical-tourism', label: 'Medical Tourism' },
          { href: '/medical-products', label: 'Medical Products' }
        ]
      }
    ]
  },
  { href: '/duty-calculator', label: 'Duty Calculator' },
  { href: '/hospital', label: 'Hospitals' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const settings = useSettings();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (status === 'authenticated') {
      fetch('/api/user/profile', { signal: controller.signal })
        .then(res => {
          if (!res.ok) return null;
          return res.json();
        })
        .then(data => {
          if (isMounted && data) setProfile(data);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.warn('Could not load user profile data');
          }
        });
    } else {
      setProfile(null);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [status]);



  return (
    <>
      {/* ── Main Header Bar ────────────────────────────────────────────── */}
      {/* Sticky on mobile, static on desktop — scrolls away on desktop so the  */}
      {/* bottom nav can then stick to the top of the viewport.                 */}
      <header className="sticky top-0 z-50 md:relative w-full bg-background border-b md:border-b-0">
        <div className="container mx-auto px-2 md:px-4">
          {/* Middle Main Row: Search | Logo | Icons */}
          <div className="flex h-14 md:h-20 items-center justify-between px-1 md:px-6 border-b border-muted/30">

            {/* Desktop Search Placeholder Spacer */}
            <div className="hidden md:flex flex-1 max-w-[280px]"></div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle mobile menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <nav className="flex flex-col gap-6 mt-12 px-2">
                    <Logo onClick={() => setOpen(false)} />
                    <div className="space-y-4 pt-6 border-t font-medium tracking-tight">
                      {navItems.map((item, index) => {
                        if (item.dropdown) {
                          return (
                            <Accordion key={index} type="single" collapsible>
                              <AccordionItem value="services" className="border-none">
                                <AccordionTrigger className="py-2 hover:no-underline text-sm font-medium text-left">
                                  {item.label}
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pl-4 flex flex-col gap-4">
                                  {item.dropdown.map((sub, sIdx) => (
                                    <div key={sIdx} className="space-y-2">
                                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{sub.category}</p>
                                      <div className="flex flex-col gap-2 pl-2 border-l border-border">
                                        {sub.items.map((subLink, lIdx) => (
                                          <Link
                                            key={lIdx}
                                            href={subLink.href}
                                            onClick={() => setOpen(false)}
                                            className="hover:text-primary text-xs font-semibold"
                                          >
                                            {subLink.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        }

                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={index}
                            href={item.href || '/'}
                            className={`block px-4 py-2 rounded-xl transition-all ${isActive
                              ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20'
                              : 'hover:text-primary font-medium'
                              }`}
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo (Centered in desktop, Left-ish in mobile) */}
            <div className="flex items-center justify-center flex-1 md:flex-initial">
              <Logo textClassName="text-lg md:text-2xl whitespace-nowrap" />
            </div>

            {/* Icons/Action Row (Right) */}
            <div className="flex items-center justify-end gap-1 flex-1 max-w-[320px]">

              {/* Theme Toggle (Left of group) */}
              <div className="hidden sm:block">
                <ModeToggle />
              </div>





              {/* User Account (Right end) */}
              <div className="hidden md:flex items-center">
                {status === 'authenticated' && session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all cursor-pointer outline-none group hover:scale-110"
                        aria-label="Account menu"
                      >
                        <div className="h-8 w-8 rounded-full border-2 border-primary/20 overflow-hidden group-hover:border-primary transition-all">
                          <Image
                            src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}`}
                            alt={session.user?.name || 'User'}
                            width={32}
                            height={32}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="hidden sm:block text-xs font-bold text-gray-700 group-hover:text-primary transition-colors">
                          {session.user?.name?.split(' ')[0]}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-serif">
                          <div className="flex flex-col">
                            <span>{session.user?.name}</span>
                            <span className="text-xs font-normal text-muted-foreground truncate">{session.user?.email}</span>
                            {profile && (
                              <div className="mt-1.5 flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full w-fit border border-primary/20">
                                <Package className="h-3 w-3 text-primary" />
                                <span className="text-[10px] font-bold text-primary">৳{profile.walletBalance || 0} Tokens</span>
                              </div>
                            )}
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Role Based Navigation */}
                        {(session.user as any)?.role === 'super_admin' && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href="/admin/dashboard" className="cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/admin/system-design" className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" /> Infrastructure & Marketing
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}

                        {(session.user as any)?.role === 'admin' && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href="/admin/dashboard" className="cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}

                        {(session.user as any)?.role === 'user' && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href="/dashboard" className="cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut({ callbackUrl: window.location.origin })} className="text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/login"
                    className="h-10 w-10 flex items-center justify-center rounded-xl transition-all cursor-pointer hover:text-primary"
                    aria-label="Log in"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ΓöÇΓöÇ Bottom Navigation Row ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
      {/* Siblings with <header> so sticky works relative to the viewport,      */}
      {/* not the parent's bounding box. Only visible on desktop (md+).         */}
      <nav className="hidden md:flex sticky top-0 z-40 w-full h-12 items-center justify-center border-b bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 flex justify-center">
          <ul className="flex items-center gap-10">
            {navItems.map((item, index) => {
              if (item.dropdown) {
                return (
                  <li key={index} className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-[12px] font-bold uppercase tracking-[0.25em] text-foreground/70 hover:text-primary outline-none cursor-pointer flex items-center gap-1">
                        {item.label} <ChevronDown className="w-3 h-3 text-primary" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-4 w-64 bg-card border border-border rounded-xl shadow-xl flex flex-col gap-4">
                        {item.dropdown.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <DropdownMenuLabel className="text-xs font-bold text-primary p-0 uppercase tracking-widest">
                              {sub.category}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />
                            <div className="flex flex-col gap-1">
                              {sub.items.map((subLink, lIdx) => (
                                <DropdownMenuItem key={lIdx} asChild>
                                  <Link
                                    href={subLink.href}
                                    className="w-full text-left text-xs font-bold hover:bg-muted/50 p-2 rounded-lg block"
                                  >
                                    {subLink.label}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              }

              const isActive = pathname === item.href;
              return (
                <li key={index} className="flex items-center">
                  <Link
                    href={item.href || '/'}
                    className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-all px-4 py-1.5 rounded-full ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-foreground/70 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

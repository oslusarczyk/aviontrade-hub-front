import { checkAuth } from '@/lib/router-auth'
import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    await checkAuth()
  },
});

function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden flex flex-col">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none backgroundGradient">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-lime-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Full Width Navigation */}
      <nav className="relative flex justify-between items-center py-4 px-8 z-10 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            AvionTrade Hub
          </span>
        </div>

        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="px-10 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-colors text-sm whitespace-nowrap inline-block">
              Sign in
            </button>
          </SignInButton>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col justify-center px-12 py-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-emerald-400 mb-4">
              Welcome to AvionTrade Hub
            </h1>
            <p className="text-lg text-neutral-400 mb-6">
              AvionTrade Hub is a platform Ultimate Team traders.
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 flex items-center justify-center px-12 py-8 ">
          <div className="relative w-full max-w-md">
          </div>
        </div>
      </div>
    </div>
  );
}
import { checkAuth } from '@/lib/router-auth'
import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    await checkAuth()
  },
});

function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none backgroundGradient">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-lime-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[200px]" />
      </div>

      <nav className="relative flex justify-between items-center py-4 px-8 z-10 ">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AvionTrade Hub" className="w-10 h-10" />
          <span className="text-xl font-bold bg-linear-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            AvionTrade Hub
          </span>
        </div>

      </nav>

      <div className="flex-1 flex overflow-hidden justify-center items-center">
        <div className="flex flex-col justify-center px-12 py-8">
          <div className="max-w-xl text-center">
            <h1 className="text-4xl font-bold text-emerald-400 mb-4">
              Welcome to AvionTrade Hub
            </h1>
            <p className="text-lg text-neutral-400 mb-6">
              AvionTrade Hub is a platform built for Ultimate Team traders to track their profits.
            </p>

            <SignInButton mode="modal">
              <button className="px-10 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-colors text-sm whitespace-nowrap inline-block">
                Sign in
              </button>
            </SignInButton>
          </div>
        </div>

      </div>
    </div>
  );
}
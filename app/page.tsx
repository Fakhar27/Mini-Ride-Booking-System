import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is logged in, redirect to their dashboard
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "DRIVER") {
      redirect("/driver/dashboard");
    } else {
      redirect("/passenger/dashboard");
    }
  }

  // Landing page for non-authenticated users
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Ride Booking
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Book rides as a passenger or earn money as a driver
          </p>
        </div>
        
        <div className="flex flex-col gap-4 mt-8">
          <Link href="/auth/sign-up">
            <Button className="w-full" size="lg">
              Get Started
            </Button>
          </Link>
          
          <Link href="/auth/login">
            <Button variant="outline" className="w-full" size="lg">
              Already have an account? Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
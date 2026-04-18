import Link from "next/link";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="container text-center py-20">
        <h1 className="font-heading text-6xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl font-semibold text-text mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back
          on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-pill font-semibold hover:bg-primary-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-7 py-3.5 rounded-pill font-semibold hover:bg-stripe transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

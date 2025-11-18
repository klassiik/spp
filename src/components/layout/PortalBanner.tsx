"use client";

import Link from "next/link";

export function PortalBanner() {
  return (
    <div className="w-full bg-[#2D2D2D] text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <Link
            href="https://account.appfolio.com/realms/foliospace/protocol/openid-connect/auth?activation_state&client_id=client-d7f4e2a4-78ee-41a8-b2f3-db82083a5d41&portfolio_uuid&redirect_uri=https%3A%2F%2Fsierraproppartners.appfolio.com%2Fconnect%2Fusers%2Foauth%2Fcallback&response_type=code&scope=openid+offline_access&session_timed_out=false&state"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium transition-colors text-white hover:text-white/80"
          >
            Tenant Login
          </Link>
          <span className="text-white/60">|</span>
          <Link
            href="https://sierraproppartners.appfolio.com/oportal/users/log_in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium transition-colors text-white hover:text-white/80"
          >
            Owner Login
          </Link>
        </div>
      </div>
    </div>
  );
}
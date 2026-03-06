"use client";

import { useEffect } from "react";

type AdBannerProps = {
  className?: string;
  format?: string;
  slot?: string;
  style?: React.CSSProperties;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Ads are temporarily hidden. To restore, uncomment the original implementation below.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdBanner(_props: AdBannerProps) {
  return null;
}

/*
export default function AdBanner({
  className,
  format = "auto",
  slot = "0000000000",
  style,
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!clientId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore
    }
  }, [clientId]);

  if (!clientId) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block"
        style={style ?? { display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
*/


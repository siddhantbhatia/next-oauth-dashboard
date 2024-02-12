"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function MapLayout({ children }: React.PropsWithChildren) {
  return (
    <AntdRegistry>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
        {children}
      </APIProvider>
    </AntdRegistry>
  );
}

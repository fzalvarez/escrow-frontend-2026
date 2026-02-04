"use client";

import dynamic from "next/dynamic";

// Componente de carga mientras se importa el mapa
function MapSkeleton() {
  return (
    <div
      style={{
        height: "250px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid oklch(1 0 0 / 10%)",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "#999" }}>Cargando mapa...</p>
    </div>
  );
}

// Importar el componente del mapa solo en el cliente (sin SSR)
const LeafletMap = dynamic(() => import("./PropertyMapClient"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function PropertyMap() {
  return <LeafletMap />;
}

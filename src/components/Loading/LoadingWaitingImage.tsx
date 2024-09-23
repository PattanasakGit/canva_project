import React from "react";
import { Skeleton, CircularProgress } from "@nextui-org/react";

const LoadingWaitingImage = () => {
  const WaitingDisplay = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "2rem",
        }}
      >
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={`top-${index}`}
            style={{
              borderRadius: "0.5rem",
              background: "var(--nextui-colors-background)",
              border: "1px solid #ffffff20",
            }}
          >
            <div
              style={{
                width: "26rem",
                height: "16rem",
                background: "var(--nextui-colors-background)",
              }}
            ></div>
          </Skeleton>
        ))}
      </div>
    );
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <WaitingDisplay />

      <div style={{ margin: "0" }}>
        <CircularProgress size="lg" aria-label="Loading..." />
      </div>

      <WaitingDisplay />
    </div>
  );
};

export default LoadingWaitingImage;

import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      style={{
        padding: "10px 15px",
        fontSize: "14px",
        color: ready ? "#fff" : "#aaa",
        backgroundColor: ready ? "#007bff" : "#ccc",
        border: "none",
        borderRadius: "4px",
        cursor: ready ? "pointer" : "not-allowed",
        transition: "background-color 0.3s ease",
      }}
    >
      {connector.name}
    </button>
  );
}

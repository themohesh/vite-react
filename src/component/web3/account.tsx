import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "600px",
      }}
    >
      {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
      )}
      {address && (
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "white" }}>
          {ensName ? `${ensName} (${address})` : address}
        </div>
      )}
      <button
        onClick={() => disconnect()}
        style={{
          padding: "10px 15px",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

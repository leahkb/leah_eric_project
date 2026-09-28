interface CuteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CuteButton({ children, onClick }: CuteButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "20px",
        backgroundColor: "#f8caca",
        border: "none",
        borderRadius: "10px",
        fontFamily: "Georgia, serif",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

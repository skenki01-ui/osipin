type MessageBubbleProps = {
  role: "user" | "assistant";
  text: string;
};

export default function MessageBubble({ role, text }: MessageBubbleProps) {
  return (
    <div className={`message-row ${role === "user" ? "message-row-user" : "message-row-ai"}`}>
      <div className={`message-bubble ${role === "user" ? "message-bubble-user" : "message-bubble-ai"}`}>
        {text}
      </div>
    </div>
  );
}
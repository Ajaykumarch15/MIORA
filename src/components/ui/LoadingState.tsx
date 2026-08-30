interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-8 h-8 border-2 border-miora-snow border-t-miora-muted rounded-full animate-spin mb-4" />
      {message && (
        <p className="text-sm text-miora-muted">{message}</p>
      )}
    </div>
  );
}

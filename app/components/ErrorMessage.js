export default function ErrorMessage({ message }) {
  return (
    <div className="text-center text-red-500 p-4">
      <p>{message}</p>
    </div>
  );
}
"use client"

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ reset, error }: ErrorProps) => {
  return (
    <div>
      <h2>There was an error: {error.message}, please try again...</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
};
export default Error;

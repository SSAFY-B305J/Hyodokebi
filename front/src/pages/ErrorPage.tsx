import { useRouteError } from "react-router-dom";

interface Error {
  status: number;
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError();

  const formattedError = error as Error;
  console.error(formattedError);


  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an error has occurred.</p>
      <div>
        {formattedError.status} : {formattedError.statusText}
      </div>
    </div>
  );
}

import { browser } from "globals";

function PageNotFound () {
  return <div>
    <h1>Something went wrong!</h1>
    <p>Please, try to reload the page.</p>
    <button onClick={(e)=>window.location.reload()}>Reload</button>
  </div>
}

export default PageNotFound;
import './PageNotFound.scss';
import errorPNG from '../../assets/error.png';
import $outlinedSVG from '../../assets/outlined.svg';

function PageNotFound () {
  return <div className="page-not-found">
    <img src={errorPNG} width="80" height="80" alt=""/>
    <h1 className="page-not-found__title">Something went wrong!</h1>
    <p className="page-not-found__text">Please, try to reload the page.</p>
    <button className="page-not-found__button" onClick={()=>window.location.reload()}>
      <svg width="24" height="24" className="page-not-found__button-icon">
        <use href={`${$outlinedSVG}#reload`}/>
      </svg>
      Reload
    </button>
  </div>
}

export default PageNotFound;
// import { SiteFooter } from './footer.jsx';
import { SiteFooter } from './footer.jsx';
import { SiteHeader } from './header.jsx';
// import "./layout.css"
// import "./layout.css"


export const Layout = (props) => {
    const { showFooter = true } = props;
    return (
      <>
        <div className="js-navigation-content-wrapper sticky-footer">
            <SiteHeader />
            {props.children}
            {showFooter && <SiteFooter />}
        </div>
      </>
    );
}

import Link from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'
import 'bootstrap-css-only/css/bootstrap.min.css'

function Header ({ router }) {
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <Link href='/'>
            <a className='navbar-brand'>Next.JS Playground Project</a>
          </Link>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <ul className='navbar-nav mr-auto'>
              <Link href='/'>
                <a className={classnames('nav-link', { active: router.pathname === '/' })}>Home</a>
              </Link>
              <Link href='/batman'>
                <a className={classnames('nav-link', { active: router.pathname.startsWith('/batman') })}>
                  Batman shows
                </a>
              </Link>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default withRouter(Header)

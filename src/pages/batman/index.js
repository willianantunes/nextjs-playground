import StandardLayout from '../../components/StandardLayout'
import Link from 'next/link'
import * as tvmazeService from '../../services/TVMazeService'
import { useItIfDefinedOtherwise, stripHtmlFromText, truncateText } from '../../infra/Utils'

const Index = props => (
  <StandardLayout>
    <main className='container'>
      <div className='row justify-content-center'>
        <h1>Batman TV Shows</h1>
      </div>
      <div className='list-group'>
        {props.shows.map(show => (
          <Link key={show.id} href='/batman/details/[id]' as={`/batman/details/${show.id}`}>
            <a className='list-group-item list-group-item-action flex-column align-items-start'>
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>{show.name}</h5>
                <small>Genres: {show.genres.join(' | ')}</small>
              </div>
              <p className='mb-1'>{truncateText(stripHtmlFromText(show.summary))}</p>
              <small>Average rating: {useItIfDefinedOtherwise(show.rating.average, 'Not available')}</small>
            </a>
          </Link>
        ))}
      </div>
    </main>
  </StandardLayout>
)

Index.getInitialProps = async () => {
  const data = await tvmazeService.showSearch('batman')

  return {
    shows: data.map(entry => entry.show)
  }
}

export default Index

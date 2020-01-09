import Router from 'next/router'
import React from 'react'
import StandardLayout from '../../../components/StandardLayout'
import { stripHtmlFromText } from '../../../infra/Utils'
import * as tvmazeService from '../../../services/TVMazeService'

const Post = props => (
  <StandardLayout>
    <div className='row justify-content-center'>
      <h1>{props.show.name}</h1>
    </div>
    <div className='row justify-content-center'>
      <div className='card text-center w-25 align-content-center'>
        <img className='card-img-top' src={props.show.image.medium} />
        <div className='card-body'>
          <p className='card-text'>{stripHtmlFromText(props.show.summary)}</p>
          <button onClick={() => Router.back()} className='btn btn-primary'>
            Go back
          </button>
        </div>
        <div className='card-footer text-muted'>{props.show.genres.join(' | ')}</div>
      </div>
    </div>
  </StandardLayout>
)

Post.getInitialProps = async context => {
  const { id } = context.query
  const show = await tvmazeService.showMainInformation(id)
  return { show }
}

export default Post

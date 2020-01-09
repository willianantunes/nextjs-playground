import Header from './Header'

export default function StandardLayout (props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

import React from 'react'
import IconSearch from '../../../public/static/icon/searchIcon.png'

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
}

const SearchBar: React.FunctionComponent<IProps> = props => {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(window.innerWidth > 1350)

  const checkScreen = () => {
    setIsDesktop(window.innerWidth > 1350)
  }

  React.useEffect(() => {
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <div className="relative w-full">
      <input className="font-sans form-control h-8 p-2 w-80" type="text" value={props.value} placeholder=" ค้นหา" aria-label="Search" onChange={props.onChange} />
      <img className="h-5 w-5 bg-white absolute bottom-1 right-2" src={IconSearch } alt='icon-search'></img>
    </div>
  )
}

export default SearchBar

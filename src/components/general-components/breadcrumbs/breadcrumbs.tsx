import * as React from 'react'
import BreadCrumbsModel from '../../../model/general-model/breadCrumbsModel'

interface IProps {
  data: Array<BreadCrumbsModel>
  showModal?: boolean
  title?: string
  detail?: string
  isShowModal?: boolean
}

interface IState {
  isShowConfirmationCloseModal: boolean
  path: string
  isShowModal: boolean
}

class Breadcrumbs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isShowConfirmationCloseModal: false,
      path: '',
      isShowModal: true
    }
  }

  public goToLink(path: string, active: boolean): void {
    if (active) {
      if (this.props.showModal) {
        this.setState({ isShowConfirmationCloseModal: true, path: path})
      } else {
        window.location.href = path
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className="h-4 not-italic font-semibold text-xs leading-4">
        {this.props.data.map((value, index) => {
          return <span key={value.name}>
            <span className={`text-red-500 ${value.active ? 'cursor-pointer hover:underline' : 'text-gray-600'}`} onClick={() => this.goToLink(value.path, value.active)}>{value.name}</span>
            {(index + 1) !== this.props.data.length
            && <span className="text-black"> {' > '} </span>}
          </span>
        })}
      </div>
    )
  }
}

export default Breadcrumbs

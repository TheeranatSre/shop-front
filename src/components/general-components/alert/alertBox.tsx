import React from 'react'
import AlertBoxModel from '../../../model/general-model/alertBoxModel'
import ShowAlertModel from '../../../model/general-model/showAlertModel'
import IconError from '../../../public/static/icon/iconerror.png'
import IconSusess from '../../../public/static/icon/easy.png'

interface IProps { }

interface IState {
  alertDataList: Array<AlertBoxModel>;
}

class AlertBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      alertDataList: new Array<AlertBoxModel>()
    }
    this.showBox = this.showBox.bind(this)
  }

  public showBox(data: ShowAlertModel): void {
    const self = this
    if (self.state.alertDataList.length < 7) {
      self.pushAlertData(data)
    } else {
      self.state.alertDataList.splice(0, 1)
      self.pushAlertData(data)
    }
  }

  private pushAlertData(showAlertModel: ShowAlertModel): void {
    const self = this
    const uid: number = Math.floor(Date.now() + Math.random())
    const alertDataList: Array<AlertBoxModel> = new Array<AlertBoxModel>()
    if (showAlertModel.show) {
      alertDataList.push({
        uid: uid,
        mainTitle: showAlertModel.mainTitle,
        subTitle: showAlertModel.subTitle,
        type: showAlertModel.type
      })
      if (showAlertModel.time > 0 && showAlertModel.autoClose) {
        const delay: number = showAlertModel.time * alertDataList.length * 1000
        setTimeout(() => {
          const index: number = alertDataList.findIndex((item) => item.uid === uid)
          if (index > -1) {
            alertDataList.splice(index, 1)
            self.setState({ alertDataList: alertDataList })
          }
        }, delay)
      }
      self.setState({ alertDataList: alertDataList })
    }
  }

  private closeBox(uid: number): void {
    const self = this
    const alertDataList: Array<AlertBoxModel> = self.state.alertDataList
    const index: number = alertDataList.findIndex((item) => item.uid === uid)
    if (index > -1) {
      alertDataList.splice(index, 1)
      self.setState({ alertDataList: alertDataList })
    }
  }

  public render(): JSX.Element {
    const alertDataList: Array<AlertBoxModel> = this.state.alertDataList
    return (
      <div className="text-sm">
        {alertDataList.map((alert: AlertBoxModel) => (
          <div className="alert-box" key={alert.uid}>
            {alert.type === 'success' && (
              <div className="bg-green-300 border-transparent rounded-lg h-36 w-2/12 p-2 absolute top-2 right-2">
                <div className="bg-white opacity-75 border-transparent rounded-lg h-full p-2">
                  <div className="ml-20">
                    <img className="h-7 w-7" src={IconSusess} alt='icon-error'></img>
                  </div>
                  <div className="content-group">
                    <div className="text-black mb-1 mt-2 font-bold"> {alert.mainTitle} </div>
                    <div className="sub-title"> {alert.subTitle} </div>
                  </div>
                  <div className="command-box">
                    <span className="close-btn" onClick={this.closeBox.bind(this, alert.uid)}>
                      {/* <i className="material-icons">close</i> */}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {alert.type === 'error' && (
              <div className="bg-red-400 border-transparent rounded-lg h-36 w-2/12 p-2 absolute top-2 right-2">
                <div className="bg-white opacity-75 border-transparent rounded-lg h-full p-2">
                  <div className="content-group">
                    <div className="ml-20">
                      <img className="h-7 w-7" src={IconError} alt='icon-error'></img>
                    </div>
                    <div className="text-black mb-1 mt-2 font-bold"> {alert.mainTitle} </div>
                    <div className="sub-title"> {alert.subTitle} </div>
                  </div>
                  <div className="command-box">
                    <span className="close-btn" onClick={this.closeBox.bind(this, alert.uid)}>
                      {/* <i className="material-icons">close</i> */}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {alert.type === 'warning' && (
              <div className="warning-box">
                <div className="main-box">
                  <div className="icon">
                    <i className="material-icons">info</i>
                  </div>
                  <div className="content-group">
                    <div className="main-title"> {alert.mainTitle} </div>
                    <div className="sub-title"> {alert.subTitle} </div>
                  </div>
                  <div className="command-box">
                    <span className="close-btn" onClick={this.closeBox.bind(this, alert.uid)}>
                      <i className="material-icons">close</i>
                    </span>
                  </div>
                </div>
              </div>
            )}
            {alert.type === 'session' && (
              <div className="warning-box session">
                <div className="main-box">
                  <div className="icon-material">
                    <i className="material-icons">alarm_off</i>
                  </div>
                  <div className="content-group">
                    <div className="main-title"> {alert.mainTitle} </div>
                    <div className="sub-title"> {alert.subTitle} </div>
                  </div>
                  <div className="command-box">
                    <span className="close-btn" onClick={this.closeBox.bind(this, alert.uid)}>
                      <i className="material-icons">close</i>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default AlertBox

import Button from "components/util/Button";
import React from "react"
import ImageUploading, { ImageListType } from "react-images-uploading"

interface IProps {
  sendUrl: (urlPath: string) => void
}

interface IState {
  images: ImageListType | null
}

class UploadingImages extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      images: null
    }
  }

  public render(): JSX.Element {

    const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
    ) => {
      this.setState({ images: imageList })
      this.props.sendUrl(imageList[0].dataURL!)
    };

    return (
      <div>
        <div className="App">
          <ImageUploading
            multiple
            value={this.state.images!}
            onChange={onChange}
            maxNumber={1}
          >
            {({
              onImageUpdate
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {/* <button onClick={() => onImageUpdate(0)}>Update</button> */}
                <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mr-10 mt-4" color="warning" onClick={() => onImageUpdate(0)}>
                  อัพโหลดรูป
                </Button>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    )
  }
}

export default UploadingImages

import Header from './components/header/index';
import SearchForm from './components/searchForm/searchForm';
//import logo from './images/giphy-logo.svg';
import './App.css';

//import ImageCard from './components/imageCard/imageCard';
import React, {lazy, Suspense} from 'react';
import Loading from './components/loading/Loading';
import LazyLoad from './components/lazyload/lazyload';
const ImageCard = lazy(() => import('./components/imageCard/imageCard'));

class App extends React.Component {
  constructor(props) {
    //console.log('constructor');
    super(props);
    this.state = {
      label: "Let's search!!!",
      isLoading: false,
      images: []
    }
  }
  changeImage = (newImage, offset) => {
    if (offset === 0) {
      this.setState({
        images: newImage,
        isLoading: false
      })
    } else {
      this.setState(preState => {
        return {
          images: [...preState.images, ...newImage],
          isLoading: false
        }
      })
    }
  }

  changeLoading = (newLoading) => {
    this.setState({
      isLoading: newLoading
    })
  }

  componentDidUpdate() {
    // console.log("didupdate");
  }
  renderImage = () => {

    return this.state.images.map((image, index) => {
      return (
        <Suspense fallback={<LazyLoad />}>
          <ImageCard key={index}
            imageUrl={image.imageUrl}
            description={image.description} />
        </Suspense >
      )
    })
  }

  //JSX
  render() {
    // console.log('render');
    return (
      <div className="App">
        {/* <div className="header d-flex flex-column align-items-center">
        <img src={logo} alt="logo" />
        <h1>Let's search</h1>
      </div> */}
        <Header label={this.state.label}></Header>
        <div className="container">
          <SearchForm changeImage={this.changeImage} changeLoading={this.changeLoading} />
          <div className="content pt-4">
            {
              this.renderImage()
            }
            {this.state.isLoading && <Loading />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

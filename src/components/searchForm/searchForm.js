import React from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            offset : 0
        }
        this.debounce = null;
        //this.handleChaneText = this.handleChaneText.bind(this);
    }
    handleSearchImage = async (keyword, offset) => {
        let newImages = [];
        if (keyword.length > 0) {
            const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=5&offset=${offset}&rating=g&lang=vi`;
            this.props.changeLoading(true);
            const res = await axios.get(urlAPI);
            newImages = res.data.data
                .map(image => ({
                    imageUrl: image.images.downsized_medium.url,
                    description: image.title
                }));

        }
        this.props.changeImage(newImages, offset);
    }
    debounceSearchImage = debounce(this.handleSearchImage, 1000);
    handleChangeForm = async (event) => {
        //this.setState({ keyword: event.target.value });
        event.preventDefault();
        const keyword  = event.target.value;
        this.setState({ keyword });
        //const { keyword } = this.state;
        // if(this.debounce){
        //     clearTimeout(this.debounce);
        // }
        // this.debounce = setTimeout(() => {
        //     this.handleSearchImage(keyword);
        // }, 1000)
        this.debounceSearchImage(keyword, 0);
        

    }
    handleScroll = () => {
        //check con lan chuot
        // goi func => get cac du lieu
        if((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100){
          this.setState(preState => {
              return {
                  offset : preState.offset + 5
              }
          }, () => {
              this.handleSearchImage(
                  this.state.keyword,
                  this.state.offset
              )
          })

        }
      }
      debounceScroll = debounce(this.handleScroll, 1000);
      componentDidMount() {
          console.log('didmount');
        window.addEventListener('scroll', this.debounceScroll);
      }
      componentWillUnmount() {
          console.log('unmount');
        window.removeEventListener('scroll', this.debounceScroll);
      }
    render() {
        return (
            <form className="form d-flex">
                <input
                    type="text" className="form-control"
                    //value={this.state.keyword}
                    onChange={this.handleChangeForm}
                    style={{ marginRight: 10 }}
                ></input>
                {this.state.keyword.length > 0 &&
                    <button className="btn btn-primary">Search</button>}
            </form>


        )
    }
}

export default SearchForm;
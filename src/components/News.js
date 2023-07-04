import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps={
    country:"in",
    pagesize:15,
    category:"general",
  }
  static propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string,
  }
  articles = []
  constructor() {
    super();
    // console.log("constructor is called");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    }
  }
  async componentDidMount() {
    // console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=afceabb4ff8747a2b731e1541202ae9b&page=1&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading:false,
    });
  }
  updateNews =async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=afceabb4ff8747a2b731e1541202ae9b&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults:data.totalResults,
        loading: false,
      });
  }
  moveNext = async () => {
    this.setState({page:this.state.page+1});
    this.updateNews();
    // console.log("moveNext is clicked");
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {
    // }
    // else {
    //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=afceabb4ff8747a2b731e1541202ae9b&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
    //   this.setState({ loading: true });
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   this.setState({
    //     articles: data.articles,
    //     page: this.state.page + 1,
    //     loading: false,
    //   });
    // }
  }
  movePrev = async () => {
    this.setState({page:this.state.page-1});
    this.updateNews();
    // console.log("moveprev is clicked");

    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=afceabb4ff8747a2b731e1541202ae9b&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    // this.setState({ loading: true });
    // const response = await fetch(url);
    // const data = await response.json();
    // this.setState({
    //   articles: data.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
  }
  render() {
    return (
      <div className='container my-5 bottom-10 top-17'>
        <div className='text-center my-6'>
          <h1>MonkeyNews - Top headLines</h1>
          <hr />
          {this.state.loading && <Spinner />}
        </div>
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (<div className="col-md-4">
              <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_407,w_690/541837"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name} />
            </div>)
          })}
        </div>
        <div className='d-flex justify-content-between'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-success" onClick={this.movePrev}>&larr; Previous</button>
          <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-outline-success" onClick={this.moveNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

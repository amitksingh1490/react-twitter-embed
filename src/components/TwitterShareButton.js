import React, { Component } from 'react'
import PropTypes from 'prop-types'
import script from 'scriptjs'

export default class TwitterShareButton extends Component {
  static propTypes = {
    /**
    * Url for sharing
    */
    url: PropTypes.string.isRequired,
    /**
    * Additional options for overriding config. Details at : https://dev.twitter.com/web/tweet-button/parameters
    */
    options: PropTypes.object
  };

  componentDidMount() {
    script('https://platform.twitter.com/widgets.js', 'twitter-embed', () => {
      if (!window.twttr) {
        console.error('Failure to load window.twttr in TwitterShareButton, aborting load.')
        return
      }

      if (!this.isMountCanceled) {
        window.twttr.widgets.createShareButton(
          this.props.url,
          this.refs.embedContainer,
          this.props.options
        )
      }
    })
  }

  componentWillUnmount() {
    this.isMountCanceled = true
  }

  render() {
    return (
      <div ref='embedContainer' />
    )
  }
}
